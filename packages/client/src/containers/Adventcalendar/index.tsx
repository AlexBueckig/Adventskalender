import React, { PureComponent } from 'react';
import './Adventcalendar.scss';

import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import Door from '../../components/Door';

const doors = [
  { label: 1, open: false, message: '' },
  { label: 2, open: false, message: '' },
  { label: 3, open: false, message: '' },
  { label: 4, open: false, message: '' },
  { label: 5, open: false, message: '' },
  { label: 6, open: false, message: '' },
  { label: 7, open: false, message: '' },
  { label: 8, open: false, message: '' },
  { label: 9, open: false, message: '' },
  { label: 10, open: false, message: '' },
  { label: 11, open: false, message: '' },
  { label: 12, open: false, message: '' },
  { label: 13, open: false, message: '' },
  { label: 14, open: false, message: '' },
  { label: 15, open: false, message: '' },
  { label: 16, open: false, message: '' },
  { label: 17, open: false, message: '' },
  { label: 18, open: false, message: '' },
  { label: 19, open: false, message: '' },
  { label: 20, open: false, message: '' },
  { label: 21, open: false, message: '' },
  { label: 22, open: false, message: '' },
  { label: 23, open: false, message: '' },
  { label: 24, open: false, message: '' }
];

interface IState {
  left: number;
  top: number;
  width: number;
  height: number;
}

class Adventcalendar extends PureComponent<RouteComponentProps, IState> {
  private section: HTMLElement | null;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { left: 0, top: 0, width: 0, height: 0 };
    this.section = null;
  }

  public componentDidMount() {
    if (this.section !== null) {
      const { left, top, width, height } = this.section.getBoundingClientRect();
      this.setState({
        left,
        top,
        width,
        height
      });
    }
  }

  public render() {
    const offset = { left: this.state.left, top: this.state.top, width: this.state.width, height: this.state.height };
    return (
      <section id="calendar" ref={section => (this.section = section)}>
        {doors.map(door => (
          <Door key={door.label} label={door.label.toString()} isOpen={door.open} offset={offset} />
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
      }
    }
  }
`;

export default Adventcalendar;
