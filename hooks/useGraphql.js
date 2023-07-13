import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const useGraphql = ({ query, variables }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await client.query({
          query: gql(query),
          variables,
        });
        setData(res?.data);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        setData(null);
        setError(err);
        setIsLoading(false);
      }
    })();
  }, [query, variables]);

  return { isLoading, data, error };
};

export default useGraphql;
