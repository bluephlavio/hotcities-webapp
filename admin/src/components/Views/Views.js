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
			<div className="view">
                <div className="card">
                    <img className="card-img-top img-fluid" src={view.src} alt={view.title} />
                    <div className="card-body">
                        <h5 className="card-title">{view.city.name} | {view.title}</h5>
                        <div>
                            <strong>timestamp</strong> {view.timestamp}  |  <strong>rank</strong> {view.rank}  |  <strong>isfavorite</strong> {view.isfavorite}  |  <strong>views</strong> {view.views}
                        </div>
                        <div className="input-group mb-3">
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
                                    className="btn btn-secondary"
                                    onClick={this.setBonus.bind(this)}
                                >
                                    Set bonus
                                </button>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-secondary">
                                <a href={view.page} target="_blank">flickr photo page</a>
                            </button>
                            <button className="btn btn-secondary">
                                <a href={view.owner.page} target="_blank">flickr owner page</a>
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
                <div className="container-fluid">
                    {_.map(this.props.views, view => {
                        return (
                            <div className="row" key={view.id}>
                                <View view={view} />
                            </div>
                        );
                    })
                    }
                </div>
            </div>
		);
	}
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
                <form className="form-inline" method="get" action="/admin/views/fetch">
                    <div className="form-group">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            id="search"
                            value={this.state.search}
                            onChange={this.updateSearch.bind(this)}
                            placeholder="Search..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Fetch Views</button>
                </form>
                {!this.state.isLoading && <ViewList views={_.first(filteredViews, 100)} />}
            </div>
		);
	}
}

export default Views;