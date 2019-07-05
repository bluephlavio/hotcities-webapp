import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import ReactGA from 'react-ga';
import _ from 'lodash';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';
import Item from '../components/Item';
import Thermometer from '../components/Thermometer';
import {
  formatNames,
  formatRank,
  formatCountry,
  formatCoords,
  formatPopulation
} from '../helpers/format';
import config from '../config';

const Title = ({ names, temp, maxTemp }) => (
  <div>
    <div style={{ flex: 0, whiteSpace: 'nowrap' }}>{names}</div>
    <Thermometer temp={temp} maxTemp={maxTemp} widthFactor={0.15} />
  </div>
);

Title.propTypes = {
  names: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    ReactGA.pageview('/');
    const { api } = config;
    const { data: record } = await fetch(`${api}/records/current`).then(res =>
      res.json()
    );
    const { geonameid } = record;
    const { data: city } = await fetch(`${api}/cities/${geonameid}`).then(res =>
      res.json()
    );
    const { data: photos } = await fetch(
      `${api}/photos?geonameid=${geonameid}&limit=3`
    ).then(res => res.json());
    const { data: stats } = await fetch(`${api}/stats/${geonameid}`).then(res =>
      res.json()
    );
    const { data: allTimeRecord } = await fetch(`${api}/records/record`).then(
      res => res.json()
    );
    this.setState({
      isLoading: false,
      record,
      city,
      photos,
      stats,
      allTimeRecord
    });
  }

  render() {
    const {
      isLoading,
      record,
      city,
      photos,
      stats,
      allTimeRecord
    } = this.state;
    return (
      <>
        <Head>
          <title>Hot Cities • world hottest city, now.</title>
        </Head>
        <Slideshow photos={isLoading ? [] : photos} />
        <Panel
          title={() => (
            <Title
              names={formatNames(city)}
              temp={record.temp}
              maxTemp={allTimeRecord.temp}
            />
          )}
          isLoading={isLoading}
        >
          {!isLoading && (
            <>
              <Item value={formatPopulation(city.population)} icon="users" />
              <Item value={formatCountry(city)} icon="globe" />
              <Item value={formatCoords(city)} icon="map-marker" />
              <Item value={formatRank(stats)} icon="thermometer-full" />
            </>
          )}
        </Panel>
      </>
    );
  }
}

export default Index;
