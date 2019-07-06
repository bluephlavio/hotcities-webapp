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
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:300"
            rel="stylesheet"
          />
<<<<<<< HEAD
=======
          <link
            href="https://use.fontawesome.com/releases/v5.9.0/css/svg-with-js.css"
            rel="stylesheet"
          />
>>>>>>> master
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link href={favicon} rel="icon" type="image/x-icon" />
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
