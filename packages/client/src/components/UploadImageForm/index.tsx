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

interface IState {
  loading: boolean;
}

class UploadImageForm extends PureComponent<IProps, IState> {
  public state: IState = { loading: false };

  public componentDidMount = () => {
    M.AutoInit();
  };

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
                  {!this.state.loading && <FilePicker name="file" setFieldValue={setFieldValue} />}
                  {this.state.loading && (
                    <div className="center">
                      <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                          <div className="circle-clipper left">
                            <div className="circle" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
            <button data-target="modal1" className="waves-effect waves-light btn modal-trigger">
              Löschen
            </button>
          </div>
        </Fragment>
      );
    }
    return (
      <div className="card-panel">
        {content}
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Bild löschen?</h4>
            <p>Willst du das Bild wirklich löschen?</p>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-teal btn-flat blue-text">Abbrechen</a>
            <button
              type="button"
              className="modal-close waves-effect waves-teal btn-flat blue-text"
              onClick={this.deleteImage}
            >
              Löschen
            </button>
          </div>
        </div>
      </div>
    );
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
    this.setState({ loading: true });
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
    this.setState({ loading: false });
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
