import React from 'react';
import Head from 'next/head';
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
import Layout from '../components/Layout';
import { accent } from '../styles/_variables.scss';
import '../styles/global.scss';

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

const HotCitiesApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    ReactGA.initialize('UA-55404180-2');
  }, []);

  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={accent} />
        <meta
          property="og:title"
          content="Hot Cities • world hottest city, now."
        />
        <meta
          property="og:description"
          content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
        />
        <meta property="og:image" content="/images/logo.png" />
        <link
          rel="preconnect"
          href="https://ib1335tybj.execute-api.eu-west-2.amazonaws.com/prod/"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google.it" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://stats.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/images/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/icons/icon-180x180.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default HotCitiesApp;
