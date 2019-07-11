import React from 'react';
import App, { Container } from 'next/app';
import ReactGA from 'react-ga';
import { library as faLib } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faBars,
  faAngleUp,
  faAngleDown,
  faThermometerFull,
  faUsers,
  faGlobe,
  faMapMarker,
  faCircle as fasCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-quicksand';
import Layout from '../components/Layout';

faLib.add(
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
  fasCircle,
  farCircle,
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
