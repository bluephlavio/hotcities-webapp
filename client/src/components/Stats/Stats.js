import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Stats.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class Stats extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  render() {
    return (
      <div className="stats">
        <div id="map" ref={e => this.mapContainer = e}></div>
      </div>
    );
  }
}

export default Stats;
