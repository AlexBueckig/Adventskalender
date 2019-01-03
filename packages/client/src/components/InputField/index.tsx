import classnames from 'classnames';
import { ErrorMessage, Field, FormikProps } from 'formik';
import React from 'react';

import './InputField.scss';

interface IProps extends FormikProps<{}> {
  name: string;
  placeholder?: string;
}

const InputField = ({ values, errors, name, placeholder }: IProps) => {
  const nameSplit = name.split('.');
  let inputText = '';
  if (nameSplit.length === 1) {
    inputText = values[name];
  } else {
    inputText = values[nameSplit[0]][nameSplit[1]][nameSplit[2]];
  }
  return (
    <div className={classnames('input-field', { error: errors[name] })}>
      {placeholder && inputText !== '' && <label htmlFor={name}>{placeholder}</label>}
      <Field id={name} name={name} placeholder={placeholder} />
      <ErrorMessage name={name} component="span" className="error-message" />
    </div>
  );
};

export default InputField;
