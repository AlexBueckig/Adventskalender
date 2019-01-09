import { Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { PureComponent } from 'react';
import { ChildMutateProps } from 'react-apollo';
import * as yup from 'yup';

import { CreateCalendarHOC, CreateCalendarMutation, CreateCalendarVariables } from '../../generated/components';

import InputField from '../InputField';
import './CreateCalendarForm.scss';

type IProps = ChildMutateProps<{}, CreateCalendarMutation, CreateCalendarVariables>;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(255)
});

class CreateCalendarForm extends PureComponent<IProps> {
  public render() {
    return (
      <div className="card-panel">
        <Formik initialValues={{ name: '' }} onSubmit={this.handleSubmit} validationSchema={validationSchema}>
          {({ values, errors, touched }) => {
            return (
              <Form>
                <InputField
                  value={values.name}
                  name="name"
                  placeholder="Name"
                  touched={touched.name}
                  error={errors.name}
                />
                <div className="right-align">
                  <button className="waves-effect waves-light btn" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }

  private handleSubmit = async (
    values: CreateCalendarVariables,
    { setSubmitting }: FormikActions<CreateCalendarVariables>
  ) => {
    setSubmitting(false);
    try {
      await this.props.mutate({
        variables: values
      });
    } catch (err) {
      M.toast({ html: err.message.replace('GraphQL Error', '') });
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
