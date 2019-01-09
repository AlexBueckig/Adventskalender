import { Form, Formik, FormikActions } from 'formik';
import React, { PureComponent } from 'react';
import * as yup from 'yup';

import InputField from '../../components/InputField';

interface IValues {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required(),
  password2: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
});

export default class SignUp extends PureComponent {
  public render() {
    return (
      <section className="section">
        <div className="row">
          <div className="col s10 offset-s1 m6 offset-m3 l4 offset-l4 center">
            <div className="card-panel">
              <Formik
                initialValues={{ name: '', email: '', password: '', password2: '' }}
                onSubmit={this.handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched }) => {
                  return (
                    <Form>
                      <InputField
                        name="name"
                        placeholder="Benutzername"
                        value={values.name}
                        error={errors.name}
                        touched={touched.name}
                        type="text"
                      />
                      <InputField
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        type="email"
                      />
                      <InputField
                        name="password"
                        placeholder="Passwort"
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                        type="password"
                      />
                      <InputField
                        name="password2"
                        placeholder="Passwort wiederholen"
                        value={values.password2}
                        error={errors.password2}
                        touched={touched.password2}
                        type="password"
                      />
                      <button className="waves-effect waves-light btn" type="submit">
                        Submit
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    );
  }

  private handleSubmit = (values: IValues, { setSubmitting }: FormikActions<IValues>) => {
    setSubmitting(false);
    console.log('Submit');
  };
}
