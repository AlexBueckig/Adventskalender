import { PubSub } from 'apollo-server';

import * as CALENDAR_EVENTS from './calendar';

export const EVENTS = {
  CALENDAR: CALENDAR_EVENTS
};

export default new PubSub();
