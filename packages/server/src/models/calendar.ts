import { DataTypes as IDataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: IDataTypes) => {
  const Calendar = sequelize.define('calendar', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: new Date().getFullYear()
    },
    url: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  });

  Calendar.associate = models => {
    Calendar.hasMany(models.Door, { onDelete: 'cascade' });
  };

  return Calendar;
};
