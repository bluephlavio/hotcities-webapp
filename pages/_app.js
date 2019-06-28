import React from 'react';
import App, { Container } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faAngleUp,
  faAngleDown,
  faThermometerFull,
  faGlobe,
  faMapMarker
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
  faGlobe,
  faMapMarker
);

class HotCitiesApp extends App {
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
