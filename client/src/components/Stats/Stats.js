import React, { Component } from "react";
import geojson from 'geojson';
import _ from 'underscore';
import fmt from '../../helpers/formatter';
import Map from '../Map/Map';
import InfoPanel from '../InfoPanel/InfoPanel';
import './Stats.css';


const Item = (props) => {
	return (
		<tr className="stats-item">
            <th nowrap="nowrap" scope="row">{props.index}</th>
            <td nowrap="nowrap">{fmt.names(props.item.name, props.item.localname)}</td>
            <td nowrap="nowrap">{fmt.fracToPerc(props.item.recordFrac)}</td>
            <td nowrap="nowrap">{fmt.temp(props.item.recordTemp)}</td>
        </tr>
	);
}

class Ranking extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rankFn: this.rankByRecordTemp,
			expanded: true
		};
	}

	changeRankFn(fn) {
		return () => {
			this.setState({
				rankFn: fn
			});
		};
	}

	rankByRecordFrac(data) {
		return _.sortBy(data, item => {
			return -item.recordFrac;
		});
	}

	rankByRecordTemp(data) {
		return _.sortBy(data, item => {
			return -item.recordTemp;
		});
	}

	rank() {
		if (this.state.expanded) {
			return this.state.rankFn(this.props.data);
		} else {
			return _.first(this.state.rankFn(this.props.data), 5);
		}
	}

	rows() {
		return this.rank()
			.map((item, index) => {
				return (
					<Item key={index} index={index + 1} item={item} />
				);
			});
	}

	render() {
		return (
			<div className="ranking">
                <table className="table-hover table-sm table-responsive d-table">
                    <thead>
                        <tr>
                            <th nowrap="nowrap" scope="col">#</th>
                            <th nowrap="nowrap" scope="col">city</th>
                            <th nowrap="nowrap" scope="col" onClick={this.changeRankFn(this.rankByRecordFrac)} >
                                record fraction
                                {this.state.rankFn === this.rankByRecordFrac ?
                                    <span className="fas fa-circle"></span> :
                                    <span className="far fa-circle"></span>
                                }
                            </th>
                            <th nowrap="nowrap" scope="col" onClick={this.changeRankFn(this.rankByRecordTemp)} >
                                record temperature
                                {this.state.rankFn === this.rankByRecordTemp ?
                                    <span className="fas fa-circle"></span> :
                                    <span className="far fa-circle"></span>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rows()}
                    </tbody>
                    </table>
            </div>
		);
	}

}

class Stats extends Component {

	constructor() {
		super();
		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		Promise.all([
				fetch('/api/cities'),
				fetch('/api/stats/cities')
			])
			.then(results => {
				return Promise.all(results.map(item => item.json()));
			})
			.then(results => {
				return this.setState({
					data: {
						cities: results[0],
						recordCities: results[1]
					}
				});
			})
			.then(() => {
				this.setState({
					isLoading: false
				});
			});
	}

	caption() {
		if (this.state.isLoading) {
			return 'Loading...';
		} else {
			return 'Stats';
		}
	}

	loadMapData(map) {
		let recordCities = _.map(this.state.data.recordCities, entry => {
			let data = entry;
			data.circleRadius = Math.sqrt(entry.recordFrac);
			data.circleColor = entry.recordTemp;
			return data;
		});
		let recordTemps = _.map(this.state.data.recordCities, entry => {
			return entry.recordTemp;
		});
		let recordFracs = _.map(this.state.data.recordCities, entry => {
			return entry.recordFrac;
		});
		return () => {
			map.addLayer({
				id: 'records',
				type: 'circle',
				source: {
					type: 'geojson',
					data: geojson.parse(recordCities, { Point: ['lat', 'lng'] })
				},
				paint: {
					'circle-color': {
						'property': 'circleColor',
						'stops': [
							[Math.min(...recordTemps), 'rgba(244, 147, 29, 0)'],
							[Math.max(...recordTemps), 'rgba(244, 147, 29, 1)']
						]
					},
					'circle-blur': 0.3,
					'circle-radius': {
						'property': 'circleRadius',
						'stops': [
							[Math.min(...recordFracs), 0],
							[Math.max(...recordFracs), 10]
						]
					}
				}
			});
		};
	}

	render() {
		return (
			<div className='stats'>
                <div className="stats-view">
                    {!this.state.isLoading &&
                        <Map
                            mapstyle='mapbox://styles/bluephlavio/cjin553wo0vr92rrynvsksfuv'
                            zoom={1}
                            center={[0, 0]}
                            load={this.loadMapData.bind(this)} />
                    }
                </div>
                <InfoPanel
                    title={this.caption()}
                    isLoading={this.state.isLoading}>
                    {!this.state.isLoading &&
                        <Ranking data={this.state.data.recordCities} />
                    }
                </InfoPanel>
            </div>
		);
	}

}

export default Stats;