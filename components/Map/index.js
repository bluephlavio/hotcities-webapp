import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { getLayer } from './helpers';
import config from '../../config';
import style from './style.scss';

const {
  mapbox: { accessToken, mapstyle }
} = config;

mapboxgl.accessToken = accessToken;

class Map extends Component {
  componentDidMount() {
    const { data } = this.props;
    const map = new mapboxgl.Map({
      container: this.container,
      style: mapstyle,
      zoom: 1,
      center: [0, 0]
    });

    map.on('load', () => {
      const layer = getLayer(data);
      map.addLayer(layer);
    });
  }

  render() {
    return <div className={style.map} ref={e => (this.container = e)} />;
  }
}

Map.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lng: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      recordfrac: PropTypes.number.isRequired,
      recordtemp: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Map;
