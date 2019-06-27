import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';
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
    return (
      <React.Fragment>
        <Slideshow photos={photos.concat(photos).concat(photos)} />
        <Panel title={city.name}>
          <div>{record.temp}</div>
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
