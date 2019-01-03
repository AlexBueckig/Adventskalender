import { FormikProps } from 'formik';
import React, { PureComponent } from 'react';

import { GetCalendarByIdDoors } from '../../generated/components';
import InputField from '../InputField';

import './DoorItems.scss';

export default class DoorItems extends PureComponent<FormikProps<{ doors: GetCalendarByIdDoors[] }>> {
  public render() {
    const { doors } = this.props.values;
    if (!doors) {
      return null;
    }

    return (
      <div className="doors">
        {doors
          .sort((a, b) => parseInt(a.day, 10) - parseInt(b.day, 10))
          .map((door, index) => {
            return (
              <div key={door.id} className="doors__item">
                <InputField
                  name={`doors.${index}.message`}
                  values={door}
                  placeholder={`Tür ${index + 1}`}
                  {...this.props}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
