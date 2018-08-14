import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Route } from 'react-router-dom';

class GoogleAnalytics extends Component {
  componentDidMount() {
    this.logView(this.props.location.pathname);
  }

  componentDidUpdate({ location: prevLocation }) {
    const { location: { pathname } } = this.props;
    if (pathname !== prevLocation.pathname) {
      this.logView(pathname);
    }
  }

  logView(pathname) {
    const page = pathname;
    const { location } = window;
    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
    });
    ReactGA.pageview(page);
  }

  render() {
    return null;
  }
}

const RouteTracker = () => (<Route component={GoogleAnalytics} />);

const init = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_ID, {
    debug: false,
  });
  return true;
};

export default {
  GoogleAnalytics,
  RouteTracker,
  init,
};
