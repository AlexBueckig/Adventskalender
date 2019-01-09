import classNames from 'classnames';
import { Field } from 'formik';
import React from 'react';

// import './InputField.scss';

interface IProps {
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  error?: string;
  touched?: boolean;
}

const InputField = ({ value, error, name, placeholder, touched, type }: IProps) => {
  return (
    <div className="input-field">
      <Field
        id={name}
        name={name}
        type={type || 'text'}
        className={classNames({ validate: true, invalid: touched && error })}
      />
      <label className={classNames({ active: value !== '' })} htmlFor={name}>
        {placeholder}
      </label>
      {touched && error && <span className="helper-text" data-error={error} data-success="right" />}
    </div>
  );
};

export default InputField;
