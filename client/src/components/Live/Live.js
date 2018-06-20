import React, { Component } from "react";
import _ from 'underscore';
import fmt from '../../helpers/formatter';
import InfoPanel from "../InfoPanel/InfoPanel";
import "./Live.css";

const Item = props => {
	return (
		<li className="live-item">
			<span className="live-item-value">{props.value}</span>
			<span className="live-item-icon"><span className={props.icon} /></span>
		</li>
	);
};

const Details = props => {
	return (
		<div className="live-details">
			<ul>{props.children}</ul>
		</div>
	);
};

class View extends Component {

	views() {
		return (
			<div className="carousel-inner">
				{_.map(this.props.views, (view, index) => {
					return (
						<div
							key={index}
							className={"carousel-item" + (index === 0 ? " active" : "")}
							style={{backgroundImage: "url(" + view.source + ")"}} />
					);
				})}
			</div>
		);
	}

	indicators() {
		return (
			<ol className="carousel-indicators">
				{_.map(this.props.views, (view, index) => {
					return (
						<li
							key={index}
							data-target="#carousel-id"
							data-slide-to={String(index)}
							className={index === 0 ? 'active' : ''} />
					);
				})}
			</ol>
		);
	}

	render() {
		return (
			<div className="view">
				<div id="carousel-id" className="carousel slide" data-ride="carousel">
					{this.indicators()}
					{this.views()}
					<a className="carousel-control-prev" href="#carousel-id" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carousel-id" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</div>
		);
	}
}

class Live extends Component {

	constructor() {
		super();
		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		fetch('/api/records/current')
			.then(res => {
				return res.json();
			})
			.then(record => {
				return Promise.all([
					record,
					fetch('/api/cities/' + record.geonameid)
					.then(res => res.json()),
					fetch('/api/views/' + record.geonameid)
					.then(res => res.json())
				]);
			})
			.then(results => {
				let record = results[0];
				let city = results[1];
				let views = results[2];
				this.setState({
					data: {
						name: city.name,
						localname: city.localname,
						country: city.country,
						countrycode: city.countrycode,
						lat: city.lat,
						lng: city.lng,
						temp: record.temp,
						views: _.first(views, 3)
					},
					isLoading: false
				});
			});
	}

	caption() {
		if (this.state.isLoading) {
			return 'Loading...';
		} else {
			return fmt.names(this.state.data.name, this.state.data.localname);
		}
	}

	render() {
		return (
			<div className="live">
				<View views={!this.state.isLoading ? this.state.data.views : []} />
				<InfoPanel title={this.caption()} isLoading={this.state.isLoading} >
					{!this.state.isLoading &&
						<Details>
							<Item value={fmt.temp(this.state.data.temp)}
								icon={"fa fa-thermometer-full"} />
							<Item value={fmt.country(this.state.data.country, this.state.data.countrycode)}
								icon={"fa fa-globe"} />
							<Item value={fmt.coords(this.state.data.lat, this.state.data.lng)}
								icon={"fa fa-map-marker"} />
						</Details>
					}
				</InfoPanel>
			</div>
		);
	}
}

export default Live;