import React, { Component } from 'react';
import _ from 'underscore';
import geojson from 'geojson';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';


class Map extends Component {

	constructor(props) {
		super(props);
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
		this.recordCities = _.map(props.data.recordCities, entry => {
			let data = entry;
			data.circleRadius = Math.sqrt(entry.recordFrac);
			data.circleColor = entry.recordTemp;
			return data;
		});
		this.recordTemps = _.map(props.data.recordCities, entry => {
			return entry.recordTemp;
		});
		this.recordFracs = _.map(props.data.recordCities, entry => {
			return entry.recordFrac;
		});
	}

	componentDidMount() {

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/dark-v9',
			zoom: 1,
			center: [0, 0]
		});

		map.on('load', () => {
			map.addLayer({
				id: 'records',
				type: 'circle',
				source: {
					type: 'geojson',
					data: geojson.parse(this.recordCities, { Point: ['lat', 'lng'] })
				},
				paint: {
					'circle-color': {
						'property': 'circleColor',
						'stops': [
							[Math.min(...this.recordTemps), 'rgba(244, 147, 29, 0)'],
							[Math.max(...this.recordTemps), 'rgba(244, 147, 29, 1)']
						]
					},
					'circle-blur': 0.3,
					'circle-radius': {
						'property': 'circleRadius',
						'stops': [
							[Math.min(...this.recordFracs), 0],
							[Math.max(...this.recordFracs), 10]
						]
					}
				}
			});
		});

	}

	render() {
		return (
			<div className="map" ref={e => this.mapContainer = e}>
			</div>
		);
	}

}

export default Map;