import { MutationResolvers, QueryResolvers } from '../generated/graphql-resolvers';

export const doorQueryResolver: QueryResolvers.Resolvers = {
  doors: async (parent, { id }, { models }) => {
    return await models.Door.findAll({ where: { calendarId: id } });
  }
};

export const doorMutationResolver: MutationResolvers.Resolvers = {
  createDoor: async (parent, { day, message, calendarId }, { models }) => {
    return await models.Door.create({ day, message, calendarId });
  },
  updateDoors: async (parent, { doors }, { models }) => {
    let rowsUpdated = 0;
    await Promise.all(
      doors.map(async door => {
        await models.Door.update({ message: door.message }, { where: { id: door.id } });
        rowsUpdated++;
      })
    );
    return rowsUpdated === doors.length;
  }
};
