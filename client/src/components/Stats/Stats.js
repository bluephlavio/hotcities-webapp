import React, { Component } from "react";
import _ from 'underscore';
import fmt from '../../helpers/formatter';
import Map from '../Map/Map';
import InfoPanel from '../InfoPanel/InfoPanel';
import './Stats.css';


const Item = (props) => {
	return (
		<tr>
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
			rankFn: this.rankByRecordFrac,
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

	icon() {
		if (this.state.isLoading) {
			return 'fa fa-spinner fa-spin';
		} else {
			return 'fa fa-ellipsis-h';
		}
	}

	data() {
		if (this.state.isLoading) {
			return {
				cities: [],
				recordCities: []
			}
		} else {
			return this.state.data;
		}
	}

	render() {
		return (
			<div className='stats'>
				<div className="view">
					{!this.state.isLoading && <Map data={this.state.data} />}
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