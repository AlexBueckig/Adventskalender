import { FieldArray, Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { Fragment, PureComponent } from 'react';
import { ChildMutateProps, compose } from 'react-apollo';
import { RouteChildrenProps } from 'react-router';
import * as yup from 'yup';

import DoorItems from '../../components/DoorItems';
import DropDown from '../../components/DropDown';
import InputField from '../../components/InputField';
import URLField from '../../components/URLField';
import {
  GetCalendarByIdComponent,
  GetCalendarByIdDoors,
  SaveCalendarMetaDataHOC,
  SaveCalendarMetaDataMutation,
  SaveCalendarMetaDataVariables,
  UpdateDoorsHOC,
  UpdateDoorsMutation,
  UpdateDoorsVariables
} from '../../generated/components';

import './CalendarEdit.scss';

const validationSchema = yup.object().shape({
  name: yup.string().required()
});

interface IDoorsProps {
  doors: GetCalendarByIdDoors[];
}

// TODO: Typing korrigieren
type IProps = ChildMutateProps<
  RouteChildrenProps<{ id: string }>,
  SaveCalendarMetaDataMutation | UpdateDoorsMutation,
  SaveCalendarMetaDataVariables | UpdateDoorsVariables
>;

class CalendarEdit extends PureComponent<IProps> {
  public render() {
    if (!this.props.match) {
      return null;
    }

    const { id } = this.props.match.params;

    return (
      <GetCalendarByIdComponent query={GET_CALENDAR_BY_ID} variables={{ id }}>
        {({ loading, data, error }) => {
          if (loading) {
            return <span>Loading...</span>;
          }
          if (error) {
            console.log(error);
            return `Error!: ${error}`;
          }
          if (!data) {
            return null;
          }

          const { calendar } = data;

          return (
            <Fragment>
              <section>
                <h2>Kalender</h2>
                <Formik
                  initialValues={{
                    id: calendar.id,
                    name: calendar.name,
                    url: calendar.url,
                    year: calendar.year
                  }}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}
                >
                  {formikProps => {
                    const year = new Date().getFullYear();
                    return (
                      <Form className="form calendarMetaForm">
                        <div className="row calendarMetaFormRow">
                          <span>Kalendar für</span>
                          <InputField name="name" {...formikProps} />
                          <span>für das Jahr</span>
                          <DropDown
                            options={[
                              { label: year, value: year },
                              { label: year + 1, value: year + 1 },
                              { label: year + 2, value: year + 2 }
                            ]}
                            name="year"
                            onChange={formikProps.setFieldValue}
                            onBlur={formikProps.setFieldTouched}
                            value={formikProps.values.year}
                          />
                          <span>!</span>
                        </div>
                        <URLField name="url" {...formikProps} />
                        <button type="submit">Speichern</button>
                      </Form>
                    );
                  }}
                </Formik>
              </section>
              <section>
                <h2>Kalendertage</h2>
                <Formik initialValues={{ doors: calendar.doors || [] }} onSubmit={this.handleDoorsSubmit}>
                  {formikProps => {
                    return (
                      <Form className="form doorsForm">
                        <FieldArray name="doors">{() => <DoorItems {...formikProps} />}</FieldArray>
                        <button type="submit">Speichern</button>
                      </Form>
                    );
                  }}
                </Formik>
              </section>
            </Fragment>
          );
        }}
      </GetCalendarByIdComponent>
    );
  }

  private handleSubmit = (
    values: SaveCalendarMetaDataVariables,
    { setSubmitting }: FormikActions<SaveCalendarMetaDataVariables>
  ) => {
    setSubmitting(false);
    alert(JSON.stringify(values, null, 2));
    // @ts-ignore
    this.props.saveCalendarMetaData({
      variables: { id: values.id, name: values.name, year: parseInt(`${values.year}`, 10), url: values.url }
    });
  };

  private handleDoorsSubmit = (values: IDoorsProps, { setSubmitting }: FormikActions<IDoorsProps>) => {
    setSubmitting(false);
    const doors: Array<{ id: string; message: string }> = [];
    values.doors.map((door, index) => {
      // TODO: QueryComponent durch HOC ersetzen
      // if(door.message !== this.props.data.doors[index])
      doors.push({ id: door.id, message: door.message });
    });

    // @ts-ignore
    this.props.updateDoors({
      variables: { doors }
    });
  };
}

export const GET_CALENDAR_BY_ID = gql`
  query getCalendarById($id: ID!) {
    calendar(id: $id) {
      id
      name
      year
      url
      doors {
        id
        day
        message
      }
    }
  }
`;

export const SAVE_CALENDAR_META_DATA = gql`
  mutation SaveCalendarMetaData($id: ID!, $name: String!, $year: Int!, $url: String!) {
    saveCalendarMetaData(id: $id, name: $name, year: $year, url: $url)
  }
`;

export const UPDATE_DOORS = gql`
  mutation UpdateDoors($doors: [DoorInput!]) {
    updateDoors(doors: $doors)
  }
`;

export default compose(
  UpdateDoorsHOC({ name: 'updateDoors' }),
  SaveCalendarMetaDataHOC({ name: 'saveCalendarMetaData' })
)(CalendarEdit);
