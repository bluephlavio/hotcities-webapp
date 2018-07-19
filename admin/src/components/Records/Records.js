import React, { Component } from 'react';
import _ from 'underscore';
import './Records.css';

const Record = (props) => {
	const view = props.view || { src: '/admin/logo-transparent.png' };
	return (
		<div className="record row">
            <div className="col-md-4">
                <img className="w-100" src={view.src} alt={view.title} />
            </div>
            <div className="info col-md-8">
                <h4>{props.city.name} | {props.city.localname}</h4>
                <ul>
                    <li>
                        <i className="fas fa-globe"></i> <strong>country</strong> {props.city.country} ({props.city.countrycode})
                    </li>
                    <li>
                        <i className="fas fa-thermometer-full"></i> <strong>temperature</strong> {props.temp} °C
                    </li>
                    <li>
                        <i className="fas fa-clock"></i> <strong>timestamp</strong> {props.timestamp}
                    </li>
                </ul>
            </div>
        </div>
	);
}

const RecordsList = (props) => {
	return (
		<div className="records-list">
            {_.map(props.records, record => {
                return (<Record {...record} key={record.timestamp} />);
            })
            }
        </div>
	);
}

const SearchBar = (props) => {
	return (
		<div className="search-bar">
            <div className="row">
                <div className="col-12">
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        id="search"
                        value={props.search}
                        onChange={props.onChange}
                        placeholder="Search..."
                    />
                </div>
            </div>
        </div>
	);
}

class Records extends Component {

	constructor(props) {
		super(props);
		this.state = {
			records: [],
			search: '',
			isLoading: true
		};
	}

	componentDidMount() {
		Promise.all([fetch('/api/cities'), fetch('/api/records'), fetch('/api/views')])
			.then(responses => {
				return Promise.all(responses.map(response => response.json()));
			})
			.then(results => {
				let cities = results[0];
				let records = results[1];
				let views = results[2];
				_.each(records, record => {
					record.city = _.find(cities, entry => {
						return entry.geonameid === record.geonameid;
					});
					let cityViews = _.filter(views, view => {
						return view.geonameid === record.geonameid;
					});
					cityViews = _.sortBy(cityViews, view => {
						return -view.relevance;
					});
					record.view = cityViews[0];
				});
				records = _.map(records, record => {
					record.timestampNumber = new Date(record.timestamp)
						.getTime();
					return record;
				});
				records = _.sortBy(records, record => {
					return -record.timestampNumber;
				});
				this.setState({
					records: records,
					isLoading: false
				});
			});
	}

	updateSearch(event) {
		this.setState({
			search: event.target.value
		});
	}

	render() {
		const filteredRecords = _.filter(this.state.records, record => {
			return record.city.name.toLowerCase()
				.indexOf(this.state.search.toLowerCase()) !== -1;
		});
		return (
			<div className="records">
                <div className="container-fluid">
                    <h2>Records</h2>
                    <SearchBar search={this.state.search} onChange={this.updateSearch.bind(this)} />
                    <RecordsList records={filteredRecords} />
                </div>
            </div>
		);
	}
}

export default Records;