import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import Panel from '../components/Panel';
import Ranking from '../components/Ranking';
import Loading from '../components/Loading';
import config from '../config';

/* eslint-disable */
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: Loading
});
/* eslint-enable */

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
        {isLoading ? <Loading /> : <Map data={data} />}
        <Panel title={() => 'Stats'} isLoading={isLoading}>
          <Ranking data={isLoading ? [] : data} />
        </Panel>
      </>
    );
  }
}

export default Stats;
