import '@/styles/global.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import React from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga4';
import Layout from '@/components/Layout';
import {
  faBars,
  faAngleUp,
  faAngleDown,
  faThermometerFull,
  faUsers,
  faGlobe,
  faMapMarker,
  faCircle as fasCircle,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

const { library } = require('@fortawesome/fontawesome-svg-core');

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
  fasCircle,
  farCircle,
  faSpinner,
  faXmark
);

const HotCitiesApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    ReactGA.initialize('G-7W12E1MDES');
  }, []);

  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fc900c" />
        <meta property="og:title" content="Hot Cities • world hottest city, now." />
        <meta
          property="og:description"
          content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
        />
        <meta property="og:image" content="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/images/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/icons/icon-180x180.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default HotCitiesApp;
