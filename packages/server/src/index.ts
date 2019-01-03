import 'dotenv/config';

import { Context } from 'apollo-server-core';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import * as express from 'express';
import { IncomingMessage } from 'http';
import * as http from 'http';
import * as jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';

import models, { sequelize } from './models';
import resolvers from './resolvers';
import schema from './schemas';

const PORT = process.env.PORT || 4000;
const app = express();

const getMe = async (req: IncomingMessage) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      return jwt.verify(token.replace('Bearer ', ''), Buffer.from(process.env.SECRET, 'base64')); // process.env.SECRET);
    } catch (e) {
      console.error(e);
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (error: Sequelize['Error']) => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');

    return {
      ...error,
      message
    };
  },
  context: async ({ req, connection }: Context) => {
    if (connection) {
      return { models };
    }
    if (req) {
      const me = await getMe(req);
      return { models, me, secret: process.env.SECRET };
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize
  .sync({ force: true })
  .then(async () => {
    httpServer.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));
  })
  .catch(err => console.error(err));
