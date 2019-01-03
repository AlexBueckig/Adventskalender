import Sequelize from 'sequelize';
import { IModels } from '../types';

const sequelize = new Sequelize(
  'postgres://' +
    (process.env.DATABASE_USER || 'postgres') +
    ':' +
    (process.env.DATABASE_PASSWORD || 'postgres') +
    '@' +
    (process.env.DATABASE_URL || 'localhost') +
    ':' +
    (process.env.DATABASE_PORT || 5432) +
    '/' +
    (process.env.DATABASE || 'postgres'),
  {
    dialect: 'postgres'
  }
);

const models: IModels = {
  User: sequelize.import('./user'),
  Calendar: sequelize.import('./calendar'),
  Door: sequelize.import('./door')
};

Object.keys(models).forEach(model => {
  if ('associate' in models[model]) {
    models[model].associate(models);
  }
});

export { sequelize };

export default models;
