import { DataTypes as IDataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: IDataTypes) => {
  const Door = sequelize.define('door', {
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Door;
};
