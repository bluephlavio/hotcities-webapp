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

const Title = ({ names, temp, minTemp, maxTemp }) => (
  <div>
    <div style={{ flex: 0, whiteSpace: 'nowrap' }}>{names}</div>
    <Thermometer
      temp={temp}
      minTemp={minTemp}
      maxTemp={maxTemp}
      widthFactor={0.15}
    />
  </div>
);

Title.propTypes = {
  names: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  minTemp: PropTypes.number.isRequired,
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
    const data = await fetch(`${api}/web/live`).then(res => res.json());
    this.setState({
      isLoading: false,
      ...data
    });
  }

  render() {
    const {
      isLoading,
      record,
      city,
      photos,
      stats,
      maxTemp,
      minTemp
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
              minTemp={minTemp}
              maxTemp={maxTemp}
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
