import classNames from 'classnames';
import { Field, Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { PureComponent } from 'react';
import { ChildMutateProps } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as yup from 'yup';

import { SignInHOC, SignInMutation, SignInVariables } from '../../generated/components';

// import './Home.scss';

type IProps = ChildMutateProps<RouteComponentProps, SignInMutation, SignInVariables>;

interface IState {
  error: string | undefined;
}

const validationSchema = yup.object().shape({
  login: yup
    .string()
    .required()
    .min(3)
    .max(255),
  password: yup.string().required()
});

class Home extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: undefined };
  }

  public render() {
    return (
      <section className="section">
        <div className="row">
          <div className="col s12 m6 offset-m3 l4 offset-l4 center">
            <div className="card-panel">
              <Formik
                initialValues={{ login: 'test', password: 'test' }}
                onSubmit={this.handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors }) => (
                  <Form className="form">
                    <div className="input-field">
                      <Field
                        id="login"
                        name="login"
                        type="text"
                        className={classNames({ validate: true, invalid: errors.login })}
                      />
                      <label className={classNames({ active: values.login !== '' })} htmlFor="login">
                        Benutzername
                      </label>
                      {errors.login && <span className="helper-text" data-error={errors.login} data-success="right" />}
                    </div>
                    <div className="input-field">
                      <Field id="password" name="password" type="password" />
                      <label className={classNames({ active: values.password !== '' })} htmlFor="password">
                        Passwort
                      </label>
                    </div>
                    <button className="waves-effect waves-light btn" type="submit">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="center">
            <Link to="/register/">Account erstellen</Link>
          </div>
        </div>
      </section>
    );
  }

  private handleSubmit = async (values: SignInVariables, { setSubmitting }: FormikActions<SignInVariables>) => {
    setSubmitting(false);
    try {
      const result = await this.props.mutate({
        variables: values
      });

      if (result && result.data) {
        const {
          data: {
            signIn: { token }
          }
        } = result;
        const cookies = new Cookies();
        cookies.set('token', token);
        this.props.history.push('/calendars');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export const SIGN_IN = gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

export default SignInHOC(SIGN_IN)(withRouter(Home));
