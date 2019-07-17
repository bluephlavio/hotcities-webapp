import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import ReactGA from 'react-ga';
import Panel from '../components/Panel';
import Ranking from '../components/Ranking';
import Loading from '../components/Loading';
import config from '../config';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: Loading
});

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      ReactGA.pageview('/stats');
      const { api } = config;
      const { data } = await fetch(`${api}/web/stats`).then(res => res.json());
      this.setState({ isLoading: false, data });
    } catch (err) {
      this.setState({ isLoading: true });
    }
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <>
        <Head>
          <title>Hot Cities • Stats</title>
          <meta
            name="description"
            content="Hot Cities collects statistics about global hottest cities and visualize them through maps and tables."
          />
          <meta property="og:title" content="Hot Cities • Stats" />
          <meta
            property="og:description"
            content="Hot Cities collects statistics about global hottest cities and visualize them through maps and tables."
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/static/fonts/quicksand-v9-latin-ext_latin-500.woff2"
            crossOrigin="anonymous"
          />
        </Head>
        {isLoading ? <Loading /> : <Map data={data.ranking} />}
        <Panel title={() => 'Stats'} isLoading={isLoading}>
          <Ranking data={isLoading ? [] : data.ranking} />
        </Panel>
      </>
    );
  }
}

export default Stats;
