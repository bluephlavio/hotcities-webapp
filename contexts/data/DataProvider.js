import React from 'react';
import useApi from '@/hooks/useApi';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const liveRequest = useApi({ method: 'get', path: 'web/live' });
  const statsRequest = useApi({ method: 'get', path: 'web/stats' });

  const isLoading = !!(liveRequest?.isLoading || statsRequest?.isLoading);

  const data = { ...liveRequest?.data, ...statsRequest?.data };

  const error = liveRequest?.error || statsRequest?.error;

  return (
    <DataContext.Provider value={{ isLoading, data, error }}>
      {children}
    </DataContext.Provider>
  );
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
