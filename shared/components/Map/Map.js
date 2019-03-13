import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config/config';
import style from './Map.scss';

let mapboxgl;
if (typeof window !== 'undefined') {
  mapboxgl = require('mapbox-gl');
}

class Map extends Component {
  constructor(props) {
    super(props);
    mapboxgl.accessToken = config.mapbox.accessToken;
  }

  componentDidMount() {
    const {
      load,
    } = this.props;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: config.mapbox.mapstyle,
      zoom: 1,
      center: [0, 0],
    });

    if (load) {
      map.on('load', load(map));
    }
  }

  render() {
    return (
      <div className={style.map} ref={e => this.mapContainer = e} /> // eslint-disable-line
    );
  }
}

Map.propTypes = {
  load: PropTypes.func.isRequired,
};

export default Map;
