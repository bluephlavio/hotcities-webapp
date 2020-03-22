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
    const { center, zoom, style, data } = this.props;
    const container = this.containerRef.current;
    this.map = new mapboxgl.Map({
      container,
      style,
      zoom,
      center
    });

    if (data) {
      this.map.on('load', () => {
        const layer = getLayer(data);
        this.map.addLayer(layer);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { center, zoom } = this.props;
    if (prevProps.center !== center || prevProps.zoom !== zoom) {
      this.map.flyTo({ center, zoom, speed: 0.2 });
    }
  }

  render() {
    return (
      <div className="map" ref={this.containerRef}>
        <style jsx>
          {`
            @keyframes fadein {
              from {
                opacity: 0;
              }

              to {
                opacity: 1;
              }
            }
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
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  style: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lng: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      recordfrac: PropTypes.number.isRequired,
      recordtemp: PropTypes.number.isRequired
    })
  )
};

Map.defaultProps = {
  center: [0, 0],
  zoom: 1,
  style: mapstyle,
  data: undefined
};

export default Map;
