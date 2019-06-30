import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker } from 'react-map-gl';
import config from '../../config';

const Mapbox = ({ data }) => {
  const { lat, lng } = data[0];
  return (
    <ReactMapGL
      mapStyle={config.mapbox.style}
      mapboxApiAccessToken={config.mapbox.accessToken}
      containerStyle={{ width: '100%', height: '100% ' }}
      latitude={lat}
      longitude={lng}
      zoom={8}
    >
      <Marker latitude={lat} longitude={lng} />
    </ReactMapGL>
  );
};

Mapbox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lng: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      recordfrac: PropTypes.number.isRequired,
      recordtemp: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Mapbox;
