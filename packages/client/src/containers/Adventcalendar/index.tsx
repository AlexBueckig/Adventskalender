import React, { PureComponent } from 'react';
import './Adventcalendar.scss';

import gql from 'graphql-tag';
import { ChildDataProps } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import Door from '../../components/Door';
import { GetCalendarByUuidHOC, GetCalendarByUuidQuery, GetCalendarByUuidVariables } from '../../generated/components';

type IProps = ChildDataProps<RouteComponentProps, GetCalendarByUuidQuery, GetCalendarByUuidVariables>;

interface IState {
  left: number;
  top: number;
  width: number;
  height: number;
}

class Adventcalendar extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { left: 0, top: 0, width: 0, height: 0 };
  }

  public handleRef = (section: HTMLElement) => {
    const { left, top, width, height } = section.getBoundingClientRect();
    this.setState({
      left,
      top,
      width,
      height
    });
  };

  public render() {
    const offset = this.state;

    if (!this.props.data.getCalendarByUuid || !this.props.data.getCalendarByUuid.doors) {
      return null;
    }
    const doors = this.props.data.getCalendarByUuid.doors;
    return (
      <section className="section" id="calendar" ref={this.handleRef}>
        {doors.map(door => (
          <Door key={door.id} id={door.id} day={door.day} message={door.message} isOpen={door.open} offset={offset} />
        ))}
      </section>
    );
  }
}

export const GET_CALENDAR_BY_UUID = gql`
  query GetCalendarByUuid($uuid: String!) {
    getCalendarByUuid(uuid: $uuid) {
      name
      doors {
        id
        day
        message
        open
      }
    }
  }
`;

export default GetCalendarByUuidHOC({
  options: (props: RouteComponentProps<GetCalendarByUuidVariables>) => {
    return { variables: { uuid: props.match.params.uuid } };
  }
})(Adventcalendar);
