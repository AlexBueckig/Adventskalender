import gql from 'graphql-tag';
import React, { Fragment, PureComponent } from 'react';
import { ChildDataProps } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import { Link } from 'react-router-dom';
import CreateCalendarForm from '../../components/CreateCalendarForm';
import {
  CalendarCreatedSubscription,
  CalendarDeletedSubscription,
  DeleteCalendarComponent,
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
              <div className="list__header">
                <h4>Meine Kalender</h4>
              </div>
              <div className="list__content">
                {calendars.map(calendar => {
                  return (
                    <DeleteCalendarComponent
                      key={calendar.id}
                      mutation={DELETE_CALENDAR}
                      variables={{ id: calendar.id }}
                    >
                      {(deleteCalendar, res) => {
                        return (
                          <div className="col s12 m6 l4">
                            <div className="card" key={JSON.stringify(calendar)}>
                              <div className="card-image">
                                <img src={calendar.image_url || 'https://unsplash.it/1350/820'} />
                              </div>
                              <div className="card-content">
                                <span className="card-title">Kalendar für {calendar.name}</span>
                              </div>
                              <div className="card-action">
                                <Link to={`/calendar/edit/${calendar.id}`}>
                                  <span>Bearbeiten</span>
                                </Link>
                                <Link to={`#`}>
                                  <span onClick={deleteCalendar as any}>Löschen</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </DeleteCalendarComponent>
                  );
                })}
              </div>
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

export const DELETE_CALENDAR = gql`
  mutation DeleteCalendar($id: ID!) {
    deleteCalendar(id: $id)
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
