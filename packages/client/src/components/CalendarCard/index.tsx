import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { GetCalendarsCalendars } from '../../generated/components';

interface IProps {
  calendar: GetCalendarsCalendars;
  deleteCalendar: () => void;
}

export default class CalendarCard extends PureComponent<IProps> {
  public componentDidMount = () => {
    M.AutoInit();
  };

  public render() {
    const { calendar, deleteCalendar } = this.props;
    return (
      <div className="card hoverable" key={JSON.stringify(calendar)}>
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
          <a className="btn-flat modal-trigger" data-target={`#modal${calendar.id}`}>
            Löschen
          </a>
        </div>
        <div id={`#modal${calendar.id}`} className="modal">
          <div className="modal-content">
            <h4>Kalender löschen?</h4>
            <p>Soll der Kalender wirklich gelöscht werden?</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-teal btn-flat blue-text">
              Abbrechen
            </a>
            <button className="modal-close waves-effect waves-teal btn-flat blue-text" onClick={deleteCalendar}>
              Löschen
            </button>
          </div>
        </div>
      </div>
    );
  }
}
