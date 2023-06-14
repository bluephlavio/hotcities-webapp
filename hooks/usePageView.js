import React from 'react';
import ReactGA from 'react-ga4';

const usePageView = (path = '/') => {
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: path });
  });
};

export default usePageView;
