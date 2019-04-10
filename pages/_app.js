import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import '../style/global.scss';

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