import { Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { PureComponent } from 'react';
import { ChildMutateProps } from 'react-apollo';
import * as yup from 'yup';

import { CreateCalendarHOC, CreateCalendarMutation, CreateCalendarVariables } from '../../generated/components';
import { IError } from '../../types.d';
import InputField from '../InputField';

import './CreateCalendarForm.scss';

type IProps = ChildMutateProps<{}, CreateCalendarMutation, CreateCalendarVariables>;

interface IState {
  error: IError;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(255)
});

class CreateCalendarForm extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: undefined };
  }

  public render() {
    return (
      <Formik initialValues={{ name: '' }} onSubmit={this.handleSubmit} validationSchema={validationSchema}>
        {props => {
          return (
            <Form className="create-form">
              <InputField name="name" placeholder="Name für Kalendar" {...props} />
              <button type="submit">Save</button>
            </Form>
          );
        }}
      </Formik>
    );
  }

  private handleSubmit = async (
    values: CreateCalendarVariables,
    { setSubmitting }: FormikActions<CreateCalendarVariables>
  ) => {
    setSubmitting(false);
    // alert(JSON.stringify(values, null, 2));
    try {
      await this.props.mutate({
        variables: values
      });
    } catch (err) {
      const error = err
        .toString()
        .replace('Error: ', '')
        .split(': ');
      this.setState({ error: { type: error[0], message: error[1] } });
    }
  };
}

export const CREATE_CALENDAR = gql`
  mutation CreateCalendar($name: String!) {
    createCalendar(name: $name) {
      id
      name
    }
  }
`;

export default CreateCalendarHOC<{}>(CREATE_CALENDAR)(CreateCalendarForm);
