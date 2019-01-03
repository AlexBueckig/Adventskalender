import * as bcrypt from 'bcrypt';
import { DataTypes as IDataTypes, Sequelize } from 'sequelize';
import { User as IUser } from '../generated/graphql';

type IUserWithPassword = IUser & { password: string };

const generateHash = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export default (sequelize: Sequelize, DataTypes: IDataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Calendar);
  };

  User.beforeCreate(async (user: IUserWithPassword) => {
    user.password = await generateHash(user.password);
  });

  return User;
};
