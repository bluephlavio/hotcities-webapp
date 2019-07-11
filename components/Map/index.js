import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { getLayer } from './helpers';
import config from '../../config';
import theme from '../../style/theme';
import 'mapbox-gl/dist/mapbox-gl.css';

const {
  mapbox: { accessToken, mapstyle }
} = config;

mapboxgl.accessToken = accessToken;

class Map extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { data } = this.props;
    const container = this.containerRef.current;
    const map = new mapboxgl.Map({
      container,
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
    return (
      <div className="map" ref={this.containerRef}>
        <style jsx>
          {`
            .map {
              flex: 1;
              display: flex;
              flex-direction: column;
              min-height: 250px;
              animation: fadein 2s;
              background-color: ${theme.palette.secondary};
            }
          `}
        </style>
      </div>
    );
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
