import { ApolloError } from 'apollo-server';
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
    try {
      isAuthenticated(me);
      return await models.Calendar.findAll({ where: { userId: me.id } });
    } catch (err) {
      throw err;
    }
  },
  calendar: async (parent, args, { me, models }) => {
    try {
      isAuthenticated(me);
      const calendar = await models.Calendar.findByPk(args.id);
      if (calendar) {
        return calendar;
      } else {
        throw new ApolloError('Calendar not found', 'NOT_FOUND');
      }
    } catch (err) {
      throw err;
    }
  },
  getCalendarByUuid: async (parent, args, { me, models }) => {
    try {
      const calendar = await models.Calendar.findOne({ where: { uuid: args.uuid } });
      if (calendar) {
        return calendar;
      }
      throw new ApolloError('Calendar not found...', 'NOT_FOUND');
    } catch (err) {
      throw err;
    }
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
    try {
      const calendar = await models.Calendar.create({ name: args.name, userId: me.id });
      await models.Door.bulkCreate(createInitialDoors(calendar.id));

      pubsub.publish(EVENTS.CALENDAR.CREATED, {
        calendarCreated: { calendar }
      });
      if (calendar) {
        return calendar;
      }
      throw new ApolloError('Saving failed... Please try again...', 'SAVING_FAILED');
    } catch (error) {
      throw error;
    }
  },
  deleteCalendar: async (parent, args, { models, me }) => {
    try {
      const status = (await models.Calendar.destroy({ where: { id: args.id, userId: me.id } })) === 1;

      if (status) {
        pubsub.publish(EVENTS.CALENDAR.DELETED, {
          calendarDeleted: { id: args.id }
        });
        return status;
      }
      throw new ApolloError('Deleting failed... Please try again...', 'DELETING_FAILED');
    } catch (error) {
      throw error;
    }
  },
  saveCalendarMetaData: async (parent, args, { models, me }) => {
    try {
      const updated =
        (await models.Calendar.update(
          { name: args.name, uuid: args.uuid, year: args.year },
          { where: { userId: 1, id: args.id } }
        ))[0] === 1;
      return updated;
    } catch (error) {
      throw new ApolloError('Saving failed... Please try again...', 'SAVING_FAILED');
    }
  }
};

export const calendarResolver: CalendarResolvers.Resolvers = {
  doors: async (parent, args, { models }) => {
    try {
      const doors = await parent.getDoors();
      if (doors) {
        return doors;
      }
      throw new ApolloError('Doors not found...', 'NOT_FOUND');
    } catch (error) {
      throw error;
    }
  }
};

export const calendarSubscriptionResolver: SubscriptionResolvers.Resolvers = {
  calendarCreated: {
    subscribe: () => {
      try {
        return pubsub.asyncIterator(EVENTS.CALENDAR.CREATED);
      } catch (error) {
        throw new ApolloError("Couldn't subscribe to websocket...", 'SUBSCRIPTION_FAILED');
      }
    }
  },
  calendarDeleted: {
    subscribe: () => {
      try {
        return pubsub.asyncIterator(EVENTS.CALENDAR.DELETED);
      } catch (error) {
        throw new ApolloError("Couldn't subscribe to websocket...", 'SUBSCRIPTION_FAILED');
      }
    }
  }
};
