import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import ReactGA from 'react-ga';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';
import Item from '../components/Item';
import Thermometer from '../components/Thermometer';
import { formatNames, formatCountry, formatCoords } from '../helpers/format';
import config from '../config';

const Title = ({ names, temp }) => (
  <div style={{ display: 'flex', alignItems: 'center', alignContent: 'space-between' }}>
    <span style={{ flex: 0, whiteSpace: 'nowrap' }}>{names}</span>
    <span style={{ width: '50px', textAlign: 'center' }}> • </span>
    <Thermometer temp={temp} style={{ flex: 0 }} />
  </div>
);

Title.propTypes = {
  names: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
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
    const { data: record } = await fetch(`${api}/records/current`).then(res => res.json());
    const { geonameid } = record;
    const { data: city } = await fetch(`${api}/cities/${geonameid}`).then(res => res.json());
    const { data: photos } = await fetch(`${api}/photos?geonameid=${geonameid}&limit=3`).then(res =>
      res.json()
    );
    this.setState({ isLoading: false, record, city, photos });
  }

  render() {
    const { isLoading, record, city, photos } = this.state;
    return (
      <>
        <Head>
          <title>Hot Cities • world hottest city, now.</title>
        </Head>
        <Slideshow photos={isLoading ? [] : photos} />
        <Panel
          title={() => <Title names={formatNames(city.name, city.localname)} temp={record.temp} />}
          isLoading={isLoading}
        >
          {!isLoading && (
            <>
              <Item value={city.population} icon="users" />
              <Item value={formatCountry(city.countryname, city.countrycode)} icon="globe" />
              <Item value={formatCoords({ lng: city.lng, lat: city.lat })} icon="map-marker" />
            </>
          )}
        </Panel>
      </>
    );
  }
}

export default Index;
