import React, { Component } from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga';
import About from '../components/About';

class AboutPage extends Component {
  componentDidMount() {
    ReactGA.pageview('/about');
  }

  render() {
    return (
      <>
        <Head>
          <title>Hot Cities • About</title>
          <meta name="description" content="Info about Hot Cities project." />
          <meta property="og:title" content="Hot Cities • About" />
          <meta property="og:description" content="Info about Hot Cities project." />
        </Head>
        <About />
      </>
    );
  }
}

export default AboutPage;
