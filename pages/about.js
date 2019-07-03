import React, { Component } from 'react';
import ReactGA from 'react-ga';
import About from '../components/About';

class AboutPage extends Component {
  componentDidMount() {
    ReactGA.pageview('/about');
  }

  render() {
    return <About />;
  }
}

export default AboutPage;
