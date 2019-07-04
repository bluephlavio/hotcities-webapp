import React from 'react';
import App, { Container } from 'next/app';
import ReactGA from 'react-ga';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faAngleUp,
  faAngleDown,
  faThermometerFull,
  faUsers,
  faGlobe,
  faMapMarker,
  faCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import Layout from '../components/Layout';
import '../style/global.scss';

library.add(
  faBars,
  faAngleUp,
  faAngleDown,
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
  faThermometerFull,
  faUsers,
  faGlobe,
  faMapMarker,
  faCircle,
  faSpinner
);

class HotCitiesApp extends App {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-55404180-2');
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default HotCitiesApp;
