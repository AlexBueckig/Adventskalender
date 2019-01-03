import { Field, FieldProps, FormikProps } from 'formik';
import React from 'react';
import uuid from 'uuid/v4';

import './URLField.scss';

interface IProps {
  name: string;
}

const URLField = (props: IProps & FormikProps<IProps>) => {
  const onClick = () => {
    props.setFieldValue(props.name, `http://localhost:3000/calendar/${uuid()}`);
  };

  return (
    <div className="row urlFieldRow">
      <Field name={props.name}>
        {({ field }: FieldProps) => {
          return (
            <div className="input-field url-field">
              {props.values[props.name] !== '' && <label htmlFor={props.name}>öffentliche URL (optional)</label>}
              <input
                id={props.name}
                {...field}
                type="text"
                disabled={true}
                placeholder={'öffentliche URL (optional)'}
              />
            </div>
          );
        }}
      </Field>
      <button type="button" onClick={onClick}>
        URL erzeugen
      </button>
    </div>
  );
};

export default URLField;
