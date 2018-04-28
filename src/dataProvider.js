import buildGraphqlDataProvider from './ra-data-graphql-gorm';
import buildApolloClient from 'ra-data-graphql/lib/buildApolloClient'

export const apolloClient = buildApolloClient({ uri: '/graphql' });

export default () =>
  buildGraphqlDataProvider({
    client: apolloClient
  });