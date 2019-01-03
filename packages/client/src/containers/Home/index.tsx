import { Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { Fragment, PureComponent } from 'react';
import { ChildMutateProps } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as yup from 'yup';

import Error from '../../components/Error';
import { SignInHOC, SignInMutation, SignInVariables } from '../../generated/components';
import { IError } from '../../types.d';

import InputField from '../../components/InputField';
import './Home.scss';

type IProps = ChildMutateProps<RouteComponentProps, SignInMutation, SignInVariables>;

interface IState {
  error: IError;
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
      <Fragment>
        <div style={{ textAlign: 'center' }}>
          {this.state.error && <Error error={this.state.error} />}
          <Formik
            initialValues={{ login: 'test', password: 'test' }}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
          >
            {props => (
              <Form className="form">
                <div className="row">
                  <InputField name="login" placeholder="Login" {...props} />
                </div>
                <div className="row">
                  <InputField name="password" placeholder="Passwort" {...props} />
                </div>
                <div className="row">
                  <button type="submit" className="button">
                    LOGIN
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="link">
          <Link to="/register/">Account erstellen</Link>
        </div>
      </Fragment>
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
      const error = err
        .toString()
        .replace('Error: ', '')
        .split(': ');
      this.setState({ error: { type: error[0], message: error[1] } });
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
