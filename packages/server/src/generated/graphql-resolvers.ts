/* tslint:disable */
// Generated in 2019-01-02T17:13:36+01:00
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
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { IContext } from "../types";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, Context>;

    users?: UsersResolver<Maybe<User[]>, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;

    calendars?: CalendarsResolver<Maybe<Calendar[]>, TypeParent, Context>;

    calendar?: CalendarResolver<Calendar, TypeParent, Context>;

    getCalendarByUuid?: GetCalendarByUuidResolver<
      Calendar,
      TypeParent,
      Context
    >;

    doors?: DoorsResolver<Maybe<Door[]>, TypeParent, Context>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type UsersResolver<
    R = Maybe<User[]>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type CalendarsResolver<
    R = Maybe<Calendar[]>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type CalendarResolver<
    R = Calendar,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, CalendarArgs>;
  export interface CalendarArgs {
    id: string;
  }

  export type GetCalendarByUuidResolver<
    R = Calendar,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, GetCalendarByUuidArgs>;
  export interface GetCalendarByUuidArgs {
    uuid: string;
  }

  export type DoorsResolver<
    R = Maybe<Door[]>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, DoorsArgs>;
  export interface DoorsArgs {
    id: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = IContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    username?: UsernameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    calendars?: CalendarsResolver<Maybe<Calendar[]>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type UsernameResolver<
    R = string,
    Parent = User,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string,
    Parent = User,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type CalendarsResolver<
    R = Maybe<Calendar[]>,
    Parent = User,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace CalendarResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Calendar> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    year?: YearResolver<number, TypeParent, Context>;

    url?: UrlResolver<string, TypeParent, Context>;

    doors?: DoorsResolver<Maybe<Door[]>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = Calendar,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = Calendar,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type YearResolver<
    R = number,
    Parent = Calendar,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type UrlResolver<
    R = string,
    Parent = Calendar,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type DoorsResolver<
    R = Maybe<Door[]>,
    Parent = Calendar,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace DoorResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Door> {
    id?: IdResolver<string, TypeParent, Context>;

    day?: DayResolver<string, TypeParent, Context>;

    message?: MessageResolver<string, TypeParent, Context>;

    open?: OpenResolver<boolean, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = Door,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type DayResolver<
    R = string,
    Parent = Door,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = string,
    Parent = Door,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type OpenResolver<
    R = boolean,
    Parent = Door,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, Context>;

    signUp?: SignUpResolver<Token, TypeParent, Context>;

    signIn?: SignInResolver<Token, TypeParent, Context>;

    createCalendar?: CreateCalendarResolver<Calendar, TypeParent, Context>;

    deleteCalendar?: DeleteCalendarResolver<boolean, TypeParent, Context>;

    saveCalendarMetaData?: SaveCalendarMetaDataResolver<
      boolean,
      TypeParent,
      Context
    >;

    createDoor?: CreateDoorResolver<Maybe<Door>, TypeParent, Context>;

    updateDoors?: UpdateDoorsResolver<boolean, TypeParent, Context>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type SignUpResolver<
    R = Token,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, SignUpArgs>;
  export interface SignUpArgs {
    username: string;

    email: string;

    password: string;
  }

  export type SignInResolver<
    R = Token,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, SignInArgs>;
  export interface SignInArgs {
    login: string;

    password: string;
  }

  export type CreateCalendarResolver<
    R = Calendar,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, CreateCalendarArgs>;
  export interface CreateCalendarArgs {
    name: string;
  }

  export type DeleteCalendarResolver<
    R = boolean,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, DeleteCalendarArgs>;
  export interface DeleteCalendarArgs {
    id: string;
  }

  export type SaveCalendarMetaDataResolver<
    R = boolean,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, SaveCalendarMetaDataArgs>;
  export interface SaveCalendarMetaDataArgs {
    id: string;

    name: string;

    year: number;

    url: string;
  }

  export type CreateDoorResolver<
    R = Maybe<Door>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, CreateDoorArgs>;
  export interface CreateDoorArgs {
    day: string;

    message: string;

    calendarId: string;
  }

  export type UpdateDoorsResolver<
    R = boolean,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, UpdateDoorsArgs>;
  export interface UpdateDoorsArgs {
    doors?: Maybe<DoorInput[]>;
  }
}

export namespace TokenResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Token> {
    token?: TokenResolver<string, TypeParent, Context>;
  }

  export type TokenResolver<
    R = string,
    Parent = Token,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, Context>;

    calendarCreated?: CalendarCreatedResolver<
      CalendarCreated,
      TypeParent,
      Context
    >;

    calendarDeleted?: CalendarDeletedResolver<
      CalendarDeleted,
      TypeParent,
      Context
    >;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = IContext
  > = SubscriptionResolver<R, Parent, Context>;
  export type CalendarCreatedResolver<
    R = CalendarCreated,
    Parent = {},
    Context = IContext
  > = SubscriptionResolver<R, Parent, Context>;
  export type CalendarDeletedResolver<
    R = CalendarDeleted,
    Parent = {},
    Context = IContext
  > = SubscriptionResolver<R, Parent, Context>;
}

export namespace CalendarCreatedResolvers {
  export interface Resolvers<Context = IContext, TypeParent = CalendarCreated> {
    calendar?: CalendarResolver<Calendar, TypeParent, Context>;
  }

  export type CalendarResolver<
    R = Calendar,
    Parent = CalendarCreated,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace CalendarDeletedResolvers {
  export interface Resolvers<Context = IContext, TypeParent = CalendarDeleted> {
    id?: IdResolver<string, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = CalendarDeleted,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export type CacheControlDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  CacheControlDirectiveArgs,
  IContext
>;
export interface CacheControlDirectiveArgs {
  maxAge?: Maybe<number>;

  scope?: Maybe<CacheControlScope>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  IContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  IContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  IContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: Maybe<string>;
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<Upload, any> {
  name: "Upload";
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  User?: UserResolvers.Resolvers;
  Calendar?: CalendarResolvers.Resolvers;
  Door?: DoorResolvers.Resolvers;
  Mutation?: MutationResolvers.Resolvers;
  Token?: TokenResolvers.Resolvers;
  Subscription?: SubscriptionResolvers.Resolvers;
  CalendarCreated?: CalendarCreatedResolvers.Resolvers;
  CalendarDeleted?: CalendarDeletedResolvers.Resolvers;
  Upload?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  cacheControl?: CacheControlDirectiveResolver<Result>;
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} /* tslint:enable */
