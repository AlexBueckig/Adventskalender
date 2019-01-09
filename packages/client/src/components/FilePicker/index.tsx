import React, { ChangeEvent, PureComponent } from 'react';

import './FilePicker.scss';

interface IProps {
  setFieldValue: (name: string, value: any) => void;
  name: string;
}

interface IState {
  label: string;
}

export default class FilePicker extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { label: 'Wähle ein Bild aus...' };
  }

  public render() {
    return (
      <div className="center">
        <input
          type="file"
          name={this.props.name}
          id={this.props.name}
          className="filepicker"
          multiple={false}
          accept={'.png,.jpg'}
          onChange={this.handleChange}
        />
        <label className="waves-effect waves-light btn" htmlFor={this.props.name}>
          {this.state.label}
        </label>
      </div>
    );
  }

  private handleChange = async (event: ChangeEvent<HTMLInputElement & { files: FileList }>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      this.setState({ label: file.name });
      this.props.setFieldValue(this.props.name, file);
    }
  };
}
