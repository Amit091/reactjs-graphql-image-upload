// src/apollo-client.ts
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';

import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const fileLink = createUploadLink({
  uri: `http://127.0.0.1:3000/graphql`,
  headers: {
    'Content-Type': 'application/json',
    'x-apollo-operation-name': 'YourOperationName',
    'apollo-require-preflight': 'true',
  },
}) as unknown as ApolloLink;

const client = new ApolloClient({
  link: ApolloLink.from([fileLink]),
  cache: new InMemoryCache(),
});

export default client;
