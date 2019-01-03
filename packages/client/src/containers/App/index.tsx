import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Adventcalendar from '../Adventcalendar';
import CalendarEdit from '../CalendarEdit';
import CalendarOverview from '../CalendarOverview';
import Home from '../Home';

import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header>
          <h1>Adventskalender</h1>
        </header>
        <main>
          <div className="content">
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/calendar/edit/:id" component={CalendarEdit} />
              <Route exact={true} path="/calendar/:id" component={Adventcalendar} />
              <Route path="/calendars" component={CalendarOverview} />
            </Switch>
          </div>
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default App;
