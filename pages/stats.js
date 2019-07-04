import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
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
    const { api } = config;
    const { data } = await fetch(`${api}/stats?extra=name,localname,countrycode,lng,lat`).then(
      res => res.json()
    );
    this.setState({ isLoading: false, data });
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
        </Head>
        {isLoading ? <Loading /> : <Map data={data} />}
        <Panel title={() => 'Stats'} isLoading={isLoading}>
          <Ranking data={isLoading ? [] : data} />
        </Panel>
      </>
    );
  }
}

export default Stats;
