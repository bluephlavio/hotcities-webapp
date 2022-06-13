import React from 'react';
import ReactGA from 'react-ga';

const usePageView = (path = '/') => {
  React.useEffect(() => {
    ReactGA.pageview(path);
  });
};

export default usePageView;
