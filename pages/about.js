import React from 'react';
import Head from 'next/head';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Hot Cities • About</title>
        <meta name="description" content="Info about Hot Cities project." />
        <meta property="og:title" content="Hot Cities • About" />
        <meta
          property="og:description"
          content="Info about Hot Cities project."
        />
      </Head>
      <About />
    </>
  );
};

export default AboutPage;
