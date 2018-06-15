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
			entry.circleRadius = Math.sqrt(entry.recordFrac);
			entry.circleColor = entry.recordTemp;
			return entry;
		})
	}

	componentDidMount() {

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v9',
			minZoom: 1,
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
							[30, 'rgba(244, 147, 29, 0)'],
							[50, 'rgba(244, 147, 29, 1)']
						]
					},
					'circle-blur': 0.5,
					'circle-radius': {
						'property': 'circleRadius',
						'stops': [
							[0, 0],
							[1, 20]
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