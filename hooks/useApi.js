import React from 'react';
import axios from 'axios';
import { api } from '@/config';

const useApi = ({ path, ...rest }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          url: `${api}/${path}`,
          ...rest
        });
        setData(res?.data?.data);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        setData(null);
        setError(err);
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, data, error };
};

export default useApi;
