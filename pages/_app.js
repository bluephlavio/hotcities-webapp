import App, { Container } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';
import '../style/global.scss';

library.add(faBars);

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