import classNames from 'classnames';
import { Field } from 'formik';
import React from 'react';
import uuid from 'uuid/v4';

// import './URLField.scss';

interface IProps {
  name: string;
  url: string;
  setFieldValue: (name: string, value: string) => void;
}

const URLField = (props: IProps) => {
  const onClick = () => {
    props.setFieldValue(props.name, `http://localhost:3000/calendar/${uuid()}`);
  };
  return (
    <div className="row">
      <div className="input-field">
        <Field id={props.name} name={props.name} disabled={true} />
        <label className={classNames({ active: props.url !== '' })} htmlFor={props.name}>
          öffentlicher Link (optional)
        </label>
      </div>
      <button type="button" onClick={onClick} className="waves-effect waves-light btn">
        URL erzeugen
      </button>
    </div>
  );
};

export default URLField;
