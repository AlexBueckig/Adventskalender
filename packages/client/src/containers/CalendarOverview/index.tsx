import gql from 'graphql-tag';
import React, { Fragment, PureComponent } from 'react';
import { ChildDataProps } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import CalendarList from '../../components/CalendarList';
import CreateCalendarForm from '../../components/CreateCalendarForm';
import {
  CalendarCreatedSubscription,
  CalendarDeletedSubscription,
  GetCalendarsCalendars,
  GetCalendarsHOC,
  GetCalendarsQuery,
  GetCalendarsVariables
} from '../../generated/components';
// import './CalendarOverview.scss';

type IProps = ChildDataProps<RouteComponentProps, GetCalendarsQuery, GetCalendarsVariables>;

class CalendarOverview extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount = () => {
    this.props.data.subscribeToMore({ document: CALENDAR_CREATED, updateQuery: this.onCalendarCreated });
    this.props.data.subscribeToMore({ document: CALENDAR_DELETED, updateQuery: this.onCalendarDeleted });
  };

  public render() {
    if (!this.props.data || !this.props.data.calendars) {
      return null;
    }
    const { calendars } = this.props.data;
    return (
      <Fragment>
        <section className="section">
          <div className="row">
            <div className="col s12 m6 l4">
              <h4>Kalender anlegen</h4>
              <CreateCalendarForm />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="row">
            <div className="col s12">
              <h4>Meine Kalender</h4>
              <CalendarList calendars={calendars} />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

  private onCalendarCreated = (
    prev: GetCalendarsCalendars[],
    options: { subscriptionData: { data: CalendarCreatedSubscription } }
  ) => {
    const {
      subscriptionData: {
        data: {
          calendarCreated: { calendar }
        }
      }
    } = options;

    let calendars: GetCalendarsCalendars[] = [];

    if (this.props.data && this.props.data.calendars) {
      calendars = [...this.props.data.calendars, calendar];
    }
    return { calendars };
  };

  private onCalendarDeleted = (
    prev: GetCalendarsCalendars[],
    options: { subscriptionData: { data: CalendarDeletedSubscription } }
  ) => {
    const {
      subscriptionData: {
        data: {
          calendarDeleted: { id }
        }
      }
    } = options;

    let calendars: GetCalendarsCalendars[] = [];

    if (this.props.data && this.props.data.calendars) {
      calendars = this.props.data.calendars.filter(value => {
        return value.id !== id;
      });
    }

    return { calendars };
  };
}

export const GET_CALENDARS = gql`
  query getCalendars {
    calendars {
      id
      name
      image_url
    }
  }
`;

export const CALENDAR_CREATED = gql`
  subscription CalendarCreated {
    calendarCreated {
      calendar {
        id
        name
        image_url
      }
    }
  }
`;

export const CALENDAR_DELETED = gql`
  subscription CalendarDeleted {
    calendarDeleted {
      id
    }
  }
`;

export default GetCalendarsHOC(GET_CALENDARS)(CalendarOverview);
