import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    doors(id: ID!): [Door!]
  }

  extend type Mutation {
    createDoor(day: String!, message: String!, calendarId: ID!): Door
    updateDoors(doors: [DoorInput!]): Boolean!
  }

  input DoorInput {
    id: ID!
    message: String!
  }

  type Door {
    id: ID!
    day: String!
    message: String!
    open: Boolean!
  }
`;
