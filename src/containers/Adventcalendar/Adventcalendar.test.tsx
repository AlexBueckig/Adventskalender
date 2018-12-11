import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Adventcalendar from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Adventcalendar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
