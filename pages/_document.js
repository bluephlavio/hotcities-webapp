import Document, {
  Head, Main, NextScript,
} from 'next/document';
import favicon from '../assets/favicon.ico';

class HotCitiesDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet" />
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
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