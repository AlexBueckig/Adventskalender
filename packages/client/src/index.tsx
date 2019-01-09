import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { createBrowserHistory } from 'history';
import M from 'materialize-css';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Cookies from 'universal-cookie';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

const history = createBrowserHistory();

const cookies = new Cookies();

const url = 'http://localhost:4000/graphql';

const httpLink = createUploadLink({
  uri: url
});

const wsLink = new WebSocketLink({
  uri: url.replace('http', 'ws'),
  options: {
    reconnect: true,
    timeout: 30000
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = cookies.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definiton = getMainDefinition(query);
    return definiton.kind === 'OperationDefinition' && definiton.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          M.toast({ html: message });
          if (extensions && (extensions.code === 'FORBIDDEN' || extensions.code === 'UNAUTHENTICATED')) {
            cookies.remove('token');
            history.replace('/');
          }
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        M.toast({ html: 'Server nicht erreichbar, bitte versuchen Sie es später erneut' });
      }
    }),
    link
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
