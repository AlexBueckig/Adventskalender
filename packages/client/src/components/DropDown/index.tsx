import React, { PureComponent } from 'react';
import Select from 'react-select';

import './DropDown.scss';

interface IProps {
  name: string;
  value: number;
  options: Array<{ value: number; label: number }>;
  onChange: (field: string, value: number) => void;
  onBlur: (field: string, status: boolean) => void;
}

export default class DropDown extends PureComponent<IProps> {
  public render() {
    return (
      <Select
        className="dropdown"
        name="year"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={{ label: this.props.value, value: this.props.value }}
        options={this.props.options}
      />
    );
  }

  private handleChange = (option: any) => {
    if (option) {
      this.props.onChange(this.props.name, option.value);
    }
  };

  private handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };
}
