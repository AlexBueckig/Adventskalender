import M from 'materialize-css';
// import './App.scss';
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Adventcalendar from '../Adventcalendar';
import CalendarEdit from '../CalendarEdit';
import CalendarOverview from '../CalendarOverview';
import Home from '../Home';
import SignUp from '../SignUp';

interface IProps {}

interface IState {
  token: string | undefined;
}

class App extends React.Component<IProps, IState> {
  public state = { token: undefined };
  private sidenav: HTMLElement | null = null;

  public componentDidMount = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    this.setState({ token });
    if (this.sidenav) {
      M.AutoInit();
    }
  };

  public logout = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    this.setState({ token: undefined });
  };

  public render() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    return (
      <div className="App">
        <header>
          <nav>
            <div className="nav-wrapper blue lighten-2" style={{ paddingLeft: 16 }}>
              <Link to="/" className="brand-logo">
                Adventskalender
              </Link>
              <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                {token && (
                  <li>
                    <Link to="/calendars">Meine Kalender</Link>
                  </li>
                )}
                {token && (
                  <li>
                    <a onClick={this.logout}>Logout</a>
                  </li>
                )}
                {!token && <Redirect to="/" />}
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
        <footer className="page-footer blue lighten-2">
          <div className="footer-copyright">
            <div className="container">
              © 2019 Copyright by AB
              <a className="grey-text text-lighten-4 right" href="#!">
                Impressum
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
