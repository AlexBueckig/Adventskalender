import React, { Fragment, PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IError } from '../../types.d';

interface IProps extends RouteComponentProps {
  error: IError;
}

class Error extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return <Fragment>{this.props.error && <span style={{ color: 'red' }}>{this.props.error.message}</span>}</Fragment>;
  }
}

export default withRouter(Error);
