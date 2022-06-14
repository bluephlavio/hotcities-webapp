import React from 'react';
import { DataContext } from '@/contexts/data';

const useData = () => {
  const data = React.useContext(DataContext);

  return data;
};

export default useData;
