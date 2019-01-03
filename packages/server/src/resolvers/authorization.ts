import { ForbiddenError } from 'apollo-server';
import { User as IUser } from '../generated/graphql';
import { IContext } from '../types';

export const isAuthenticated = (me: IUser) => {
  if (!me) {
    throw new ForbiddenError('Not authenticated as user.');
  }
};
