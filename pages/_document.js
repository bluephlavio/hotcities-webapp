import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import favicon from '../static/images/icons/favicon.ico';
import ogImage from '../static/images/logo.png';
import iosIcon from '../static/images/icons/icon-180x180.png';
import theme from '../style/theme';

class HotCitiesDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="description"
            content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={theme.palette.accent} />
          <meta
            property="og:title"
            content="Hot Cities • world hottest city, now."
          />
          <meta
            property="og:description"
            content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
          />
          <meta property="og:image" content={ogImage} />
          <link
            rel="preconnect"
            href="https://ib1335tybj.execute-api.eu-west-2.amazonaws.com/prod/"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/static/fonts/quicksand-v9-latin-ext_latin-300.woff2"
            crossOrigin="anonymous"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" type="image/x-icon" href={favicon} />
          <link rel="apple-touch-icon" href={iosIcon} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default HotCitiesDocument;
