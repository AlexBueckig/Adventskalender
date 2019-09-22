import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { DeleteCalendarComponent, GetCalendarsCalendars } from '../../generated/components';
import CalendarCard from '../CalendarCard';

interface IProps {
  calendars: GetCalendarsCalendars[];
}

const CalendarList = (props: IProps) => {
  const { calendars } = props;

  return (
    <Fragment>
      {calendars.map(calendar => {
        return (
          <DeleteCalendarComponent
            key={JSON.stringify(calendar)}
            mutation={DELETE_CALENDAR}
            variables={{ id: calendar.id }}
          >
            {(deleteCalendar, res) => {
              return (
                <div className="col s12 m6 l4">
                  <CalendarCard calendar={calendar} deleteCalendar={deleteCalendar} />
                </div>
              );
            }}
          </DeleteCalendarComponent>
        );
      })}
    </Fragment>
  );
};

export const DELETE_CALENDAR = gql`
  mutation DeleteCalendar($id: ID!) {
    deleteCalendar(id: $id)
  }
`;

export default CalendarList;
