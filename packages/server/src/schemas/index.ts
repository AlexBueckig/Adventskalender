import { gql } from 'apollo-server-express';

import calendarSchema from './calendar';
import doorSchema from './door';
import userSchema from './user';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, calendarSchema, doorSchema];
