import React from 'react';
import Adventcalendar from '../Adventcalendar';
import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header>
          <h1>Adventskalender</h1>
        </header>
        <main>
          <Adventcalendar />
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default App;
