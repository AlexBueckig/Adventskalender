import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { User as IUser } from '../generated/graphql';
import { MutationResolvers, QueryResolvers, UserResolvers } from '../generated/graphql-resolvers';

const createToken = async (user: IUser, secret: string, expiresIn: string) => {
  const { id, email, username } = user;
  try {
    const token: string = await jwt.sign({ id, email, username }, Buffer.from(secret, 'base64'), { expiresIn });
    return token;
  } catch (err) {
    console.error(err);
  }
};

export const userQueryResolver: QueryResolvers.Resolvers = {
  users: async (parent, args, { models }) => {
    return await models.User.findAll();
  },
  user: async (parent, args, { models }) => {
    return await models.User.findByPk(args.id);
  }
};

export const userMutationResolver: MutationResolvers.Resolvers = {
  signUp: async (parent, args, { models, secret }) => {
    try {
      const user = await models.User.create(args);
      return { token: createToken(user, secret, '30m') };
    } catch (error) {
      throw new ApolloError('Saving failed... Please try again...', 'SAVING_FAILED');
    }
  },
  signIn: async (parent, { login, password }, { models, secret }) => {
    let user = await models.User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await models.User.findOne({
        where: { email: login }
      });
    }

    if (!user) {
      throw new AuthenticationError('Invalid login credentials.');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AuthenticationError('Invalid login credentials.');
    }

    return { token: createToken(user, secret, '24h') };
  }
};

export const userResolver: UserResolvers.Resolvers = {
  calendars: async (parent, args, { models }) => {
    try {
      return await parent.getCalendars();
    } catch (err) {
      throw err;
    }
  }
};
