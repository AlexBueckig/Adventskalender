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
    uuid: {
      type: DataTypes.UUID
    },
    image_url: {
      type: DataTypes.STRING
    }
  });

  Calendar.associate = models => {
    Calendar.hasMany(models.Door, { onDelete: 'cascade' });
  };

  return Calendar;
};
