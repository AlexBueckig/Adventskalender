import { Sequelize } from 'sequelize';
import { User } from './generated/graphql';

export interface IContext {
  models: IModels;
  me: User;
  secret: string;
}

export interface IModels {
  [key: string]: Sequelize['Model'];
}

export interface IDoor {
  day: number;
  message: string;
  calendarId: number;
}
