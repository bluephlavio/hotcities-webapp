import React, { Component } from 'react';
import _ from 'underscore';
import axios from 'axios';
import './Views.css';

class View extends Component {

	setBonus(event) {
		let bonus = this.bonusBox.value;
		let id = this.props.view.id;
		axios.put('/api/views/' + id, { bonus });
	}

	render() {
		const view = this.props.view;
		return (
			<div className="view row">
                <div className="col-md-4">
                    <img className="w-100" src={view.src} alt={view.title} />
                </div>
                <div className="info col-md-8">
                    <div>
                        <h4>{view.city.name} | {view.title}</h4>
                    </div>
                    <div>
                        <div>
                            <strong>timestamp</strong> {view.timestamp}  |  <strong>rank</strong> {view.rank}  |  <strong>isfavorite</strong> {view.isfavorite}  |  <strong>views</strong> {view.views} | <strong>relevance</strong> {view.relevance}
                        </div>
                        <div className="input-group input-group-sm pt-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text">bonus</span>
                            </div>
                            <input
                                type="number"
                                className="form-control"
                                placeholder={view.bonus}
                                ref={el => this.bonusBox = el}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn border"
                                    onClick={this.setBonus.bind(this)}
                                >
                                    <a>
                                        Set
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className="btn-group btn-group-sm pt-2">
                            <button className="btn border">
                                <a href={view.page} target="_blank"><i className="fas fa-camera"></i> photo page</a>
                            </button>
                            <button className="btn border">
                                <a href={view.owner.page} target="_blank"><i className="fas fa-user"></i> owner page</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

class ViewList extends Component {
	render() {
		return (
			<div className="view-list">
                {_.map(this.props.views, view => {
                    return (<View view={view} key={view.id} />);
                })
                }
            </div>
		);
	}
}

const SearchBar = (props) => {
	return (
		<div className="search-bar">
            <div className="row">
                <div className="col-12">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            id="search"
                            value={props.search}
                            onChange={props.onChange}
                            placeholder="Search..."
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn border"
                            >
                                <a href={"/admin/views/fetch?city=" + props.search}>
                                    Fetch Views
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}


class Views extends Component {

	constructor(props) {
		super(props);
		this.state = {
			search: decodeURI(props.location.search.substr(1)),
			views: [],
			cities: [],
			isLoading: true
		}
	}

	componentDidMount() {
		return Promise.all([fetch('/api/views'), fetch('/api/cities')])
			.then(responses => {
				return Promise.all([responses[0].json(), responses[1].json()]);
			})
			.then(results => {
				let views = results[0];
				let cities = results[1];
				for (let view of views) {
					view.city = _.find(cities, entry => {
						return entry.geonameid === view.geonameid;
					});
				}
				views = _.sortBy(views, view => {
					return -view.relevance;
				});
				return this.setState({
					views,
					cities,
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
		const filteredViews = _.filter(this.state.views, view => {
			return view.city.name.toLowerCase()
				.indexOf(this.state.search.toLowerCase()) !== -1;
		});
		return (
			<div className="views">
                <div className="container-fluid">
                    <h2>Views</h2>
                    <SearchBar search={this.state.search} onChange={this.updateSearch.bind(this)} />
                    {!this.state.isLoading && <ViewList views={_.first(filteredViews, 100)} />}
                </div>
            </div>
		);
	}
}

export default Views;