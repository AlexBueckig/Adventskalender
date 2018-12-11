import React, { PureComponent } from 'react';
import './Adventcalendar.scss';

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
  { label: 24, open: true, message: '' }
];

/*
import ReactDOM from 'react-dom';

componentDidMount() {
    var rect = ReactDOM.findDOMNode(this)
      .getBoundingClientRect()
  }
*/

interface IState {
  left: number;
  top: number;
  width: number;
  height: number;
}

class Adventcalendar extends PureComponent<{}, IState> {
  section: HTMLElement | null;

  constructor() {
    super({});
    this.state = { left: 0, top: 0, width: 0, height: 0 };
    this.section = null;
  }

  componentDidMount() {
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

  render() {
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

export default Adventcalendar;
