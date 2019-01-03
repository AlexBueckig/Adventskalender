import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    calendars: [Calendar!]
    calendar(id: ID!): Calendar!
    getCalendarByUuid(uuid: String!): Calendar!
  }

  extend type Mutation {
    createCalendar(name: String!): Calendar!
    deleteCalendar(id: ID!): Boolean!
    saveCalendarMetaData(id: ID!, name: String!, year: Int!, uuid: String!): Boolean!
  }

  type Calendar {
    id: ID!
    name: String!
    year: Int!
    uuid: String!
    doors: [Door!]
  }

  extend type Subscription {
    calendarCreated: CalendarCreated!
    calendarDeleted: CalendarDeleted!
  }

  type CalendarCreated {
    calendar: Calendar!
  }

  type CalendarDeleted {
    id: ID!
  }
`;
