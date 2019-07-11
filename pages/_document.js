import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import favicon from '../static/favicon.ico';

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
          <meta
            property="og:title"
            content="Hot Cities • world hottest city, now."
          />
          <meta
            property="og:description"
            content="Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now."
          />
          <meta property="og:image" content={favicon} />
          <link rel="manifest" href="/static/manifest.json" />
          <link href={favicon} rel="icon" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:300"
            rel="stylesheet"
          />
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
