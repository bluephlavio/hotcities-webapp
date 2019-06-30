import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Panel from '../components/Panel';
import Map from '../components/Map';
import Ranking from '../components/Ranking';
import config from '../config';

class Stats extends Component {
  static async getInitialProps({ pageProps }) {
    const { api } = config;
    const { data } = await fetch(`${api}/stats?extra=name,localname,countrycode,lng,lat`).then(
      res => res.json()
    );
    return { data, ...pageProps };
  }

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Map data={data} />
        <Panel title="Stats">
          <Ranking data={data} />
        </Panel>
      </React.Fragment>
    );
  }
}

Stats.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      geonameid: PropTypes.number.isRequired,
      recordfrac: PropTypes.number.isRequired,
      recordtemp: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Stats;
