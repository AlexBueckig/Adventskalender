/* tslint:disable */
// Generated in 2019-01-03T11:32:47+01:00
export type Maybe<T> = T | null;

export interface DoorInput {
  id: string;

  message: string;
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  _?: Maybe<boolean>;

  users?: Maybe<User[]>;

  user: User;

  calendars?: Maybe<Calendar[]>;

  calendar: Calendar;

  getCalendarByUuid: Calendar;

  doors?: Maybe<Door[]>;
}

export interface User {
  id: string;

  username: string;

  email: string;

  calendars?: Maybe<Calendar[]>;
}

export interface Calendar {
  id: string;

  name: string;

  year: number;

  uuid: string;

  doors?: Maybe<Door[]>;
}

export interface Door {
  id: string;

  day: string;

  message: string;

  open: boolean;
}

export interface Mutation {
  _?: Maybe<boolean>;

  signUp: Token;

  signIn: Token;

  createCalendar: Calendar;

  deleteCalendar: boolean;

  saveCalendarMetaData: boolean;

  createDoor?: Maybe<Door>;

  updateDoors: boolean;
}

export interface Token {
  token: string;
}

export interface Subscription {
  _?: Maybe<boolean>;

  calendarCreated: CalendarCreated;

  calendarDeleted: CalendarDeleted;
}

export interface CalendarCreated {
  calendar: Calendar;
}

export interface CalendarDeleted {
  id: string;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: string;
}
export interface CalendarQueryArgs {
  id: string;
}
export interface GetCalendarByUuidQueryArgs {
  uuid: string;
}
export interface DoorsQueryArgs {
  id: string;
}
export interface SignUpMutationArgs {
  username: string;

  email: string;

  password: string;
}
export interface SignInMutationArgs {
  login: string;

  password: string;
}
export interface CreateCalendarMutationArgs {
  name: string;
}
export interface DeleteCalendarMutationArgs {
  id: string;
}
export interface SaveCalendarMetaDataMutationArgs {
  id: string;

  name: string;

  year: number;

  uuid: string;
}
export interface CreateDoorMutationArgs {
  day: string;

  message: string;

  calendarId: string;
}
export interface UpdateDoorsMutationArgs {
  doors?: Maybe<DoorInput[]>;
}

/* tslint:enable */
