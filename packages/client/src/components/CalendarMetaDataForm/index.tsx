import { Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { PureComponent } from 'react';
import * as yup from 'yup';

import { ChildMutateProps } from 'react-apollo';
import {
  SaveCalendarMetaDataHOC,
  SaveCalendarMetaDataMutation,
  SaveCalendarMetaDataVariables
} from '../../generated/components';
import DropDown from '../DropDown';
import InputField from '../InputField';
import URLField from '../URLField';

// import './CalendarMetaDataForm.scss';

interface IComponentProps {
  calendar: SaveCalendarMetaDataVariables;
}

type IProps = ChildMutateProps<IComponentProps, SaveCalendarMetaDataMutation, SaveCalendarMetaDataVariables>;

const validationSchema = yup.object().shape({
  name: yup.string().required()
});

class CalendarMetaDataForm extends PureComponent<IProps> {
  public render() {
    const { calendar } = this.props;

    return (
      <div className="card-panel">
        <Formik
          initialValues={{
            id: calendar.id,
            name: calendar.name,
            uuid: calendar.uuid ? `http://localhost:3000/calendar/${calendar.uuid}` : '',
            year: calendar.year
          }}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, setFieldTouched, errors, touched }) => {
            const year = new Date().getFullYear();
            return (
              <Form>
                <span>Kalendar für</span>
                <InputField
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />
                <span>für das Jahr</span>
                <DropDown
                  options={[
                    { label: year, value: year },
                    { label: year + 1, value: year + 1 },
                    { label: year + 2, value: year + 2 }
                  ]}
                  name="year"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  value={values.year}
                />
                <span>!</span>
                <URLField name="uuid" url={values.uuid || ''} setFieldValue={setFieldValue} />
                <div className="right-align">
                  <button className="waves-effect waves-light btn" type="submit">
                    Speichern
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
  private handleSubmit = (
    values: SaveCalendarMetaDataVariables,
    { setSubmitting }: FormikActions<SaveCalendarMetaDataVariables>
  ) => {
    setSubmitting(false);
    try {
      this.props.mutate({
        variables: {
          id: values.id,
          name: values.name,
          year: parseInt(`${values.year}`, 10),
          uuid: values.uuid === '' || !values.uuid ? null : values.uuid.replace('http://localhost:3000/calendar/', '')
        }
      });
    } catch (err) {
      M.toast({ html: err.message.replace('GraphQL Error', '') });
    }
  };
}

export const SAVE_CALENDAR_META_DATA = gql`
  mutation SaveCalendarMetaData($id: ID!, $name: String!, $year: Int!, $uuid: String) {
    saveCalendarMetaData(id: $id, name: $name, year: $year, uuid: $uuid)
  }
`;

export default SaveCalendarMetaDataHOC<IComponentProps>({})(CalendarMetaDataForm);
