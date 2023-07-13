import React from 'react';
import useGraphql from '@/hooks/useGraphql';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const { isLoading, data, error } = useGraphql({
    query: `
      query {
        current {
          temp
          city {
            name
            localname
            lng
            lat
            population
            countryname
            countrycode
          }
        }
        ranking {
          recordtemp
          recordfrac
          score
          rank
          city {
            name
            localname
            lng
            lat
            countrycode
          }
        }
        temprange
      }
    `,
    variables: {},
  });

  const [focus, setFocus] = React.useState('live');

  const contextValue = React.useMemo(
    () => ({ isLoading, data, error, focus, setFocus }),
    [isLoading, data, error, focus, setFocus]
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const providerDataContext =
  (Component) =>
  ({ ...props }) =>
    (
      <DataProvider>
        <Component {...props} />
      </DataProvider>
    );

export default DataProvider;
