import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import ReactGA from 'react-ga';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';
import Item from '../components/Item';
import { formatNames, formatTemp, formatCountry, formatCoords } from '../helpers/format';
import config from '../config';

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
        <Slideshow photos={isLoading ? [] : photos} />
        <Panel title={() => formatNames(city.name, city.localname)} isLoading={isLoading}>
          {!isLoading && (
            <>
              <Item value={formatTemp(record.temp)} icon="thermometer-full" />
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
