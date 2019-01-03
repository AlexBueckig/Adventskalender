import {
  calendarMutationResolver,
  calendarQueryResolver,
  calendarResolver,
  calendarSubscriptionResolver
} from './calendar';
import { doorMutationResolver, doorQueryResolver } from './door';
import { userMutationResolver, userQueryResolver, userResolver } from './user';

export default {
  Query: { ...userQueryResolver, ...calendarQueryResolver, ...doorQueryResolver },
  Mutation: { ...userMutationResolver, ...calendarMutationResolver, ...doorMutationResolver },
  Subscription: { ...calendarSubscriptionResolver },
  Calendar: { ...calendarResolver },
  User: { ...userResolver }
};
