import M from 'materialize-css';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Adventcalendar from '../Adventcalendar';
import CalendarEdit from '../CalendarEdit';
import CalendarOverview from '../CalendarOverview';
import Home from '../Home';
import SignUp from '../SignUp';
// import './App.scss';

import 'materialize-css/dist/css/materialize.min.css';

class App extends React.Component {
  private sidenav: HTMLElement | null = null;

  public componentDidMount = () => {
    if (this.sidenav) {
      // M.Sidenav.init(this.sidenav);
      M.AutoInit();
    }
  };

  public render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                Adventskalender
              </a>
              <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="/calendars">Meine Kalender</Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </nav>

          <ul ref={sidenav => (this.sidenav = sidenav)} className="sidenav" id="mobile-nav">
            <li>
              <Link to="/calendars">Meine Kalender</Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </header>
        <main>
          <div className="container">
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/register" component={SignUp} />
              <Route exact={true} path="/calendar/edit/:id" component={CalendarEdit} />
              <Route exact={true} path="/calendar/:uuid" component={Adventcalendar} />
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
