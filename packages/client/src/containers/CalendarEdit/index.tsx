import { FieldArray, Form, Formik, FormikActions } from 'formik';
import { ExecutionResult } from 'graphql';
import gql from 'graphql-tag';
import React, { Fragment, PureComponent } from 'react';
import { ChildDataProps, compose, MutationOptions } from 'react-apollo';
import { RouteChildrenProps } from 'react-router';

import CalendarMetaDataForm from '../../components/CalendarMetaDataForm';
import DoorItems from '../../components/DoorItems';
import {
  GetCalendarByIdDoors,
  GetCalendarByIdHOC,
  GetCalendarByIdQuery,
  GetCalendarByIdVariables,
  UpdateDoorsHOC,
  UpdateDoorsMutation,
  UpdateDoorsVariables
} from '../../generated/components';

import UploadImageForm from '../../components/UploadImageForm';
// import './CalendarEdit.scss';

interface IDoorsProps {
  doors: GetCalendarByIdDoors[];
}

interface IMutationFns {
  updateDoors: (options: MutationOptions<UpdateDoorsVariables>) => Promise<ExecutionResult<UpdateDoorsMutation>>;
}

type IProps = ChildDataProps<
  RouteChildrenProps<GetCalendarByIdVariables>,
  GetCalendarByIdQuery,
  GetCalendarByIdVariables
> &
  IMutationFns;

class CalendarEdit extends PureComponent<IProps> {
  public render() {
    if (!this.props.match || !this.props.data || !this.props.data.calendar) {
      return null;
    }

    const { calendar } = this.props.data;

    return (
      <Fragment>
        <section className="section">
          <div className="row">
            <div className="col s12 l7">
              <h5>Kalender</h5>
              <CalendarMetaDataForm calendar={calendar} />
            </div>
            <div className="col s12 l5">
              <h5>Hintergrundbild</h5>
              <UploadImageForm
                calendarId={calendar.id}
                image_url={calendar.image_url}
                refetch={this.props.data.refetch}
              />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="row">
            <div className="col s12">
              <h5>Kalendertage</h5>
              <div className="card-panel">
                <Formik initialValues={{ doors: calendar.doors || [] }} onSubmit={this.handleDoorsSubmit}>
                  {formikProps => {
                    return (
                      <Form>
                        <FieldArray name="doors">{() => <DoorItems {...formikProps} />}</FieldArray>
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
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

  private handleDoorsSubmit = (values: IDoorsProps, { setSubmitting }: FormikActions<IDoorsProps>) => {
    setSubmitting(false);
    const doors: Array<{ id: string; message: string }> = [];
    values.doors.map((door, index) => {
      if (
        this.props.data.calendar &&
        this.props.data.calendar.doors &&
        door.message !== this.props.data.calendar.doors[index].message
      ) {
        doors.push({ id: door.id, message: door.message });
      }
    });
    try {
      this.props.updateDoors({
        variables: { doors }
      });
    } catch (err) {
      M.toast({ html: err.message.replace('GraphQL Error', '') });
    }
  };
}

export const GET_CALENDAR_BY_ID = gql`
  query getCalendarById($id: ID!) {
    calendar(id: $id) {
      id
      name
      year
      uuid
      image_url
      doors {
        id
        day
        message
      }
    }
  }
`;

export const UPDATE_DOORS = gql`
  mutation UpdateDoors($doors: [DoorInput!]) {
    updateDoors(doors: $doors)
  }
`;

export default compose(
  UpdateDoorsHOC({ name: 'updateDoors' }),
  GetCalendarByIdHOC({
    options: (props: RouteChildrenProps<GetCalendarByIdVariables>) => {
      if (props.match) {
        return { variables: { id: props.match.params.id } };
      } else {
        return {};
      }
    }
  })
)(CalendarEdit);
