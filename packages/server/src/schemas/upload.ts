import { gql } from 'apollo-server-express';

export default gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  extend type Mutation {
    uploadImage(calendarId: ID!, file: Upload!): String!
    deleteImage(publicId: String!, calendarId: String!): Boolean!
  }
`;
