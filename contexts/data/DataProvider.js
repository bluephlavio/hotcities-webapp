import React from 'react';
import useApi from '@/hooks/useApi';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const { isLoading, data, error } = useApi({ method: 'get', path: 'web' });

  const [focus, setFocus] = React.useState('live');

  return <DataContext.Provider value={{ isLoading, data, error, focus, setFocus }}>{children}</DataContext.Provider>;
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
