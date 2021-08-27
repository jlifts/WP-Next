import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WPGRAPH_QL,
  credentials: 'include',
});

export const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
