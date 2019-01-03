/* tslint:disable */
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

export type CreateCalendarVariables = {
  name: string;
};

export type CreateCalendarMutation = {
  __typename?: "Mutation";

  createCalendar: CreateCalendarCreateCalendar;
};

export type CreateCalendarCreateCalendar = {
  __typename?: "Calendar";

  id: string;

  name: string;
};

export type GetCalendarByUuidVariables = {
  uuid: string;
};

export type GetCalendarByUuidQuery = {
  __typename?: "Query";

  getCalendarByUuid: GetCalendarByUuidGetCalendarByUuid;
};

export type GetCalendarByUuidGetCalendarByUuid = {
  __typename?: "Calendar";

  name: string;

  doors: Maybe<GetCalendarByUuidDoors[]>;
};

export type GetCalendarByUuidDoors = {
  __typename?: "Door";

  id: string;

  day: string;

  message: string;
};

export type GetCalendarByIdVariables = {
  id: string;
};

export type GetCalendarByIdQuery = {
  __typename?: "Query";

  calendar: GetCalendarByIdCalendar;
};

export type GetCalendarByIdCalendar = {
  __typename?: "Calendar";

  id: string;

  name: string;

  year: number;

  uuid: string;

  doors: Maybe<GetCalendarByIdDoors[]>;
};

export type GetCalendarByIdDoors = {
  __typename?: "Door";

  id: string;

  day: string;

  message: string;
};

export type SaveCalendarMetaDataVariables = {
  id: string;
  name: string;
  year: number;
  uuid: string;
};

export type SaveCalendarMetaDataMutation = {
  __typename?: "Mutation";

  saveCalendarMetaData: boolean;
};

export type UpdateDoorsVariables = {
  doors?: Maybe<DoorInput[]>;
};

export type UpdateDoorsMutation = {
  __typename?: "Mutation";

  updateDoors: boolean;
};

export type GetCalendarsVariables = {};

export type GetCalendarsQuery = {
  __typename?: "Query";

  calendars: Maybe<GetCalendarsCalendars[]>;
};

export type GetCalendarsCalendars = {
  __typename?: "Calendar";

  id: string;

  name: string;
};

export type DeleteCalendarVariables = {
  id: string;
};

export type DeleteCalendarMutation = {
  __typename?: "Mutation";

  deleteCalendar: boolean;
};

export type CalendarCreatedVariables = {};

export type CalendarCreatedSubscription = {
  __typename?: "Subscription";

  calendarCreated: CalendarCreatedCalendarCreated;
};

export type CalendarCreatedCalendarCreated = {
  __typename?: "CalendarCreated";

  calendar: CalendarCreatedCalendar;
};

export type CalendarCreatedCalendar = {
  __typename?: "Calendar";

  id: string;

  name: string;
};

export type CalendarDeletedVariables = {};

export type CalendarDeletedSubscription = {
  __typename?: "Subscription";

  calendarDeleted: CalendarDeletedCalendarDeleted;
};

export type CalendarDeletedCalendarDeleted = {
  __typename?: "CalendarDeleted";

  id: string;
};

export type SignInVariables = {
  login: string;
  password: string;
};

export type SignInMutation = {
  __typename?: "Mutation";

  signIn: SignInSignIn;
};

export type SignInSignIn = {
  __typename?: "Token";

  token: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const CreateCalendarDocument = gql`
  mutation CreateCalendar($name: String!) {
    createCalendar(name: $name) {
      id
      name
    }
  }
`;
export class CreateCalendarComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateCalendarMutation, CreateCalendarVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateCalendarMutation, CreateCalendarVariables>
        mutation={CreateCalendarDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCalendarProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateCalendarMutation, CreateCalendarVariables>
> &
  TChildProps;
export type CreateCalendarMutationFn = ReactApollo.MutationFn<
  CreateCalendarMutation,
  CreateCalendarVariables
>;
export function CreateCalendarHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCalendarMutation,
        CreateCalendarVariables,
        CreateCalendarProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCalendarMutation,
    CreateCalendarVariables,
    CreateCalendarProps<TChildProps>
  >(CreateCalendarDocument, operationOptions);
}
export const GetCalendarByUuidDocument = gql`
  query GetCalendarByUuid($uuid: String!) {
    getCalendarByUuid(uuid: $uuid) {
      name
      doors {
        id
        day
        message
      }
    }
  }
`;
export class GetCalendarByUuidComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetCalendarByUuidQuery, GetCalendarByUuidVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetCalendarByUuidQuery, GetCalendarByUuidVariables>
        query={GetCalendarByUuidDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCalendarByUuidProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCalendarByUuidQuery, GetCalendarByUuidVariables>
> &
  TChildProps;
export function GetCalendarByUuidHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCalendarByUuidQuery,
        GetCalendarByUuidVariables,
        GetCalendarByUuidProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCalendarByUuidQuery,
    GetCalendarByUuidVariables,
    GetCalendarByUuidProps<TChildProps>
  >(GetCalendarByUuidDocument, operationOptions);
}
export const GetCalendarByIdDocument = gql`
  query getCalendarById($id: ID!) {
    calendar(id: $id) {
      id
      name
      year
      uuid
      doors {
        id
        day
        message
      }
    }
  }
`;
export class GetCalendarByIdComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetCalendarByIdQuery, GetCalendarByIdVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetCalendarByIdQuery, GetCalendarByIdVariables>
        query={GetCalendarByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCalendarByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCalendarByIdQuery, GetCalendarByIdVariables>
> &
  TChildProps;
export function GetCalendarByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCalendarByIdQuery,
        GetCalendarByIdVariables,
        GetCalendarByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCalendarByIdQuery,
    GetCalendarByIdVariables,
    GetCalendarByIdProps<TChildProps>
  >(GetCalendarByIdDocument, operationOptions);
}
export const SaveCalendarMetaDataDocument = gql`
  mutation SaveCalendarMetaData(
    $id: ID!
    $name: String!
    $year: Int!
    $uuid: String!
  ) {
    saveCalendarMetaData(id: $id, name: $name, year: $year, uuid: $uuid)
  }
`;
export class SaveCalendarMetaDataComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SaveCalendarMetaDataMutation,
      SaveCalendarMetaDataVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SaveCalendarMetaDataMutation,
        SaveCalendarMetaDataVariables
      >
        mutation={SaveCalendarMetaDataDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SaveCalendarMetaDataProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    SaveCalendarMetaDataMutation,
    SaveCalendarMetaDataVariables
  >
> &
  TChildProps;
export type SaveCalendarMetaDataMutationFn = ReactApollo.MutationFn<
  SaveCalendarMetaDataMutation,
  SaveCalendarMetaDataVariables
>;
export function SaveCalendarMetaDataHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SaveCalendarMetaDataMutation,
        SaveCalendarMetaDataVariables,
        SaveCalendarMetaDataProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SaveCalendarMetaDataMutation,
    SaveCalendarMetaDataVariables,
    SaveCalendarMetaDataProps<TChildProps>
  >(SaveCalendarMetaDataDocument, operationOptions);
}
export const UpdateDoorsDocument = gql`
  mutation UpdateDoors($doors: [DoorInput!]) {
    updateDoors(doors: $doors)
  }
`;
export class UpdateDoorsComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateDoorsMutation, UpdateDoorsVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateDoorsMutation, UpdateDoorsVariables>
        mutation={UpdateDoorsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateDoorsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateDoorsMutation, UpdateDoorsVariables>
> &
  TChildProps;
export type UpdateDoorsMutationFn = ReactApollo.MutationFn<
  UpdateDoorsMutation,
  UpdateDoorsVariables
>;
export function UpdateDoorsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateDoorsMutation,
        UpdateDoorsVariables,
        UpdateDoorsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateDoorsMutation,
    UpdateDoorsVariables,
    UpdateDoorsProps<TChildProps>
  >(UpdateDoorsDocument, operationOptions);
}
export const GetCalendarsDocument = gql`
  query getCalendars {
    calendars {
      id
      name
    }
  }
`;
export class GetCalendarsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetCalendarsQuery, GetCalendarsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetCalendarsQuery, GetCalendarsVariables>
        query={GetCalendarsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCalendarsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCalendarsQuery, GetCalendarsVariables>
> &
  TChildProps;
export function GetCalendarsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCalendarsQuery,
        GetCalendarsVariables,
        GetCalendarsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCalendarsQuery,
    GetCalendarsVariables,
    GetCalendarsProps<TChildProps>
  >(GetCalendarsDocument, operationOptions);
}
export const DeleteCalendarDocument = gql`
  mutation DeleteCalendar($id: ID!) {
    deleteCalendar(id: $id)
  }
`;
export class DeleteCalendarComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteCalendarMutation, DeleteCalendarVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteCalendarMutation, DeleteCalendarVariables>
        mutation={DeleteCalendarDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteCalendarProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteCalendarMutation, DeleteCalendarVariables>
> &
  TChildProps;
export type DeleteCalendarMutationFn = ReactApollo.MutationFn<
  DeleteCalendarMutation,
  DeleteCalendarVariables
>;
export function DeleteCalendarHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteCalendarMutation,
        DeleteCalendarVariables,
        DeleteCalendarProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteCalendarMutation,
    DeleteCalendarVariables,
    DeleteCalendarProps<TChildProps>
  >(DeleteCalendarDocument, operationOptions);
}
export const CalendarCreatedDocument = gql`
  subscription CalendarCreated {
    calendarCreated {
      calendar {
        id
        name
      }
    }
  }
`;
export class CalendarCreatedComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      CalendarCreatedSubscription,
      CalendarCreatedVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        CalendarCreatedSubscription,
        CalendarCreatedVariables
      >
        subscription={CalendarCreatedDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CalendarCreatedProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CalendarCreatedSubscription, CalendarCreatedVariables>
> &
  TChildProps;
export function CalendarCreatedHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CalendarCreatedSubscription,
        CalendarCreatedVariables,
        CalendarCreatedProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CalendarCreatedSubscription,
    CalendarCreatedVariables,
    CalendarCreatedProps<TChildProps>
  >(CalendarCreatedDocument, operationOptions);
}
export const CalendarDeletedDocument = gql`
  subscription CalendarDeleted {
    calendarDeleted {
      id
    }
  }
`;
export class CalendarDeletedComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      CalendarDeletedSubscription,
      CalendarDeletedVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        CalendarDeletedSubscription,
        CalendarDeletedVariables
      >
        subscription={CalendarDeletedDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CalendarDeletedProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CalendarDeletedSubscription, CalendarDeletedVariables>
> &
  TChildProps;
export function CalendarDeletedHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CalendarDeletedSubscription,
        CalendarDeletedVariables,
        CalendarDeletedProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CalendarDeletedSubscription,
    CalendarDeletedVariables,
    CalendarDeletedProps<TChildProps>
  >(CalendarDeletedDocument, operationOptions);
}
export const SignInDocument = gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;
export class SignInComponent extends React.Component<
  Partial<ReactApollo.MutationProps<SignInMutation, SignInVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<SignInMutation, SignInVariables>
        mutation={SignInDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SignInProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<SignInMutation, SignInVariables>
> &
  TChildProps;
export type SignInMutationFn = ReactApollo.MutationFn<
  SignInMutation,
  SignInVariables
>;
export function SignInHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SignInMutation,
        SignInVariables,
        SignInProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SignInMutation,
    SignInVariables,
    SignInProps<TChildProps>
  >(SignInDocument, operationOptions);
}
/* tslint:enable */
