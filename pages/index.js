import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';
import Item from '../components/Item';
import { formatNames, formatTemp, formatCountry, formatCoords } from '../helpers/format';
import config from '../config';

class Index extends Component {
  static async getInitialProps({ pageProps }) {
    const { api } = config;
    const { data: record } = await fetch(`${api}/records/current`).then(res => res.json());
    const { geonameid } = record;
    const { data: city } = await fetch(`${api}/cities/${geonameid}`).then(res => res.json());
    const { data: photos } = await fetch(`${api}/photos?geonameid=${geonameid}&limit=3`).then(res =>
      res.json()
    );
    return { ...pageProps, record, city, photos };
  }

  render() {
    const { record, city, photos } = this.props;
    const { name, localname, countryname, countrycode, lat, lng } = city;
    const { temp } = record;
    return (
      <React.Fragment>
        <Slideshow photos={photos} />
        <Panel title={formatNames(name, localname)}>
          <Item value={formatTemp(temp)} icon="thermometer-full" />
          <Item value={formatCountry(countryname, countrycode)} icon="globe" />
          <Item value={formatCoords({ lng, lat })} icon="map-marker" />
        </Panel>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  record: PropTypes.shape({
    geonameid: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired
  }).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Index;
