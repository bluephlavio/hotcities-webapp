import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import style from './style.scss';

const Mapbox = dynamic(() => import('./mapbox'), {
  ssr: false
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className={style.map}>
        <Mapbox data={data} />
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
