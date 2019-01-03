import {
  CalendarResolvers,
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers
} from '../generated/graphql-resolvers';
import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated } from './authorization';

export const calendarQueryResolver: QueryResolvers.Resolvers = {
  calendars: async (parent, args, { models, me }) => {
    isAuthenticated(me);
    return await models.Calendar.findAll({ where: { userId: me.id } });
  },
  calendar: async (parent, args, { me, models }) => {
    isAuthenticated(me);
    return await models.Calendar.findById(args.id);
  },
  getCalendarByUuid: async (parent, args, { me, models }) => {
    return await models.Calendar.findOne({ where: { uuid: args.uuid } });
  }
};

const createInitialDoors = (calendarId: number) => {
  const doors: Array<{ day: number; message: string; calendarId: number }> = [];
  for (let day = 1; day <= 24; day++) {
    doors.push({ calendarId, message: '', day });
  }
  return doors;
};

export const calendarMutationResolver: MutationResolvers.Resolvers = {
  createCalendar: async (parent, args, { models, me }) => {
    // return await models.Calendar.create({ name: args.name, userId: 1 });
    const calendar = await models.Calendar.create({ name: args.name, userId: me.id });
    await models.Door.bulkCreate(createInitialDoors(calendar.id));

    pubsub.publish(EVENTS.CALENDAR.CREATED, {
      calendarCreated: { calendar }
    });

    return calendar;
  },
  deleteCalendar: async (parent, args, { models, me }) => {
    const status = (await models.Calendar.destroy({ where: { id: args.id, userId: me.id } })) === 1;

    if (status) {
      pubsub.publish(EVENTS.CALENDAR.DELETED, {
        calendarDeleted: { id: args.id }
      });
    }

    return status;
  },
  saveCalendarMetaData: async (parent, args, { models, me }) => {
    const updated = (await models.Calendar.update({ ...args }, { where: { userId: 1 } }))[0] === 1;
    return updated;
  }
};

export const calendarResolver: CalendarResolvers.Resolvers = {
  doors: async (parent, args, { models }) => {
    return await parent.getDoors();
  }
};

export const calendarSubscriptionResolver: SubscriptionResolvers.Resolvers = {
  calendarCreated: {
    subscribe: () => {
      console.log('calendarCreated');
      return pubsub.asyncIterator(EVENTS.CALENDAR.CREATED);
    }
  },
  calendarDeleted: {
    subscribe: () => {
      console.log('calendarDeleted');
      return pubsub.asyncIterator(EVENTS.CALENDAR.DELETED);
    }
  }
};
