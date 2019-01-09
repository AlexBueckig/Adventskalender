import { Form, Formik, FormikActions } from 'formik';
import gql from 'graphql-tag';
import React, { Fragment, PureComponent } from 'react';
import { compose, MutationOptions } from 'react-apollo';
import {
  DeleteImageHOC,
  DeleteImageMutation,
  DeleteImageVariables,
  UploadImageHOC,
  UploadImageMutation,
  UploadImageVariables
} from '../../generated/components';

import { ExecutionResult } from 'graphql';
import FilePicker from '../FilePicker';
import './UploadImageForm.scss';

interface IComponentProps {
  image_url: string | null;
  calendarId: string;
  refetch: () => void;
}

interface IMutationFns {
  uploadImage: (options: MutationOptions<UploadImageVariables>) => Promise<ExecutionResult<UploadImageMutation>>;
  deleteImage: (options: MutationOptions<DeleteImageVariables>) => Promise<ExecutionResult<DeleteImageMutation>>;
}

type IProps = IMutationFns & IComponentProps;

class UploadImageForm extends PureComponent<IProps> {
  public render() {
    const { image_url, calendarId } = this.props;

    let content;

    if (!image_url) {
      content = (
        <Formik initialValues={{ calendarId, file: '' }} onSubmit={this.handleSubmit}>
          {({ setFieldValue, values }) => {
            return (
              <Form>
                <br />
                <div className="row">
                  <FilePicker name="file" setFieldValue={setFieldValue} />
                </div>
                {values.file !== '' && (
                  <div className="right-align">
                    <button className="waves-effect waves-light btn" type="submit">
                      Bild speichern
                    </button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      );
    } else {
      content = (
        <Fragment>
          <img src={image_url} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          <div className="right-align">
            <button className="btn" type="button" onClick={this.deleteImage}>
              Löschen
            </button>
          </div>
        </Fragment>
      );
    }
    return <div className="card-panel">{content}</div>;
  }

  private deleteImage = async () => {
    const { calendarId } = this.props;
    if (this.props.image_url) {
      const publicId = this.props.image_url.substr(this.props.image_url.lastIndexOf('/') + 1).split('.')[0];
      try {
        const result = await this.props.deleteImage({ variables: { calendarId, publicId } });
        if (result) {
          this.props.refetch();
        }
      } catch (err) {
        M.toast({ html: err.message.replace('GraphQL Error', '') });
      }
    }
  };

  private handleSubmit = async (
    values: UploadImageVariables,
    { setSubmitting }: FormikActions<UploadImageVariables>
  ) => {
    setSubmitting(false);
    try {
      const data = await this.props.uploadImage({
        variables: { calendarId: this.props.calendarId, file: values.file }
      });
      if (data) {
        this.props.refetch();
      }
    } catch (err) {
      M.toast({ html: err.message.replace('GraphQL Error', '') });
    }
  };
}

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($calendarId: ID!, $file: Upload!) {
    uploadImage(calendarId: $calendarId, file: $file)
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($publicId: String!, $calendarId: String!) {
    deleteImage(publicId: $publicId, calendarId: $calendarId)
  }
`;

export default compose(
  UploadImageHOC<IComponentProps>({ name: 'uploadImage' }),
  DeleteImageHOC<IComponentProps>({ name: 'deleteImage' })
)(UploadImageForm);
