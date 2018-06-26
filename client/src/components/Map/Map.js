import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';


class Map extends Component {

	constructor(props) {
		super(props);
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
	}

	componentDidMount() {

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: this.props.mapstyle,
			zoom: this.props.zoom,
			center: this.props.center
		});

		if (this.props.load) {
			map.on('load', this.props.load(map));
		}

	}

	render() {
		return (
			<div className="map" ref={e => this.mapContainer = e}>
			</div>
		);
	}

}

export default Map;