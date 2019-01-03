/* tslint:disable */
// Generated in 2019-01-03T11:54:52+01:00
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
// Documents
// ====================================================

export namespace CreateCalendar {
  export type Variables = {
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createCalendar: CreateCalendar;
  };

  export type CreateCalendar = {
    __typename?: "Calendar";

    id: string;

    name: string;
  };
}

export namespace GetCalendarByUuid {
  export type Variables = {
    uuid: string;
  };

  export type Query = {
    __typename?: "Query";

    getCalendarByUuid: GetCalendarByUuid;
  };

  export type GetCalendarByUuid = {
    __typename?: "Calendar";

    name: string;

    doors: Maybe<Doors[]>;
  };

  export type Doors = {
    __typename?: "Door";

    id: string;

    day: string;

    message: string;

    open: boolean;
  };
}

export namespace GetCalendarById {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    calendar: Calendar;
  };

  export type Calendar = {
    __typename?: "Calendar";

    id: string;

    name: string;

    year: number;

    uuid: string;

    doors: Maybe<Doors[]>;
  };

  export type Doors = {
    __typename?: "Door";

    id: string;

    day: string;

    message: string;
  };
}

export namespace SaveCalendarMetaData {
  export type Variables = {
    id: string;
    name: string;
    year: number;
    uuid: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    saveCalendarMetaData: boolean;
  };
}

export namespace UpdateDoors {
  export type Variables = {
    doors?: Maybe<DoorInput[]>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateDoors: boolean;
  };
}

export namespace GetCalendars {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    calendars: Maybe<Calendars[]>;
  };

  export type Calendars = {
    __typename?: "Calendar";

    id: string;

    name: string;
  };
}

export namespace DeleteCalendar {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteCalendar: boolean;
  };
}

export namespace CalendarCreated {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";

    calendarCreated: CalendarCreated;
  };

  export type CalendarCreated = {
    __typename?: "CalendarCreated";

    calendar: Calendar;
  };

  export type Calendar = {
    __typename?: "Calendar";

    id: string;

    name: string;
  };
}

export namespace CalendarDeleted {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";

    calendarDeleted: CalendarDeleted;
  };

  export type CalendarDeleted = {
    __typename?: "CalendarDeleted";

    id: string;
  };
}

export namespace SignIn {
  export type Variables = {
    login: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    signIn: SignIn;
  };

  export type SignIn = {
    __typename?: "Token";

    token: string;
  };
}

/* tslint:enable */
