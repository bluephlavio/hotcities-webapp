import React, { Component } from "react";
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

const View = props => {
	return (
		<div className="live-view" style={{backgroundImage: "url(" + props.view + ")"}} />
	);
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
						view: views[0].source
					},
					isLoading: false
				});
			});
	}

	view() {
		if (this.state.isLoading) {
			return null;
		} else {
			return this.state.data.view;
		}
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
				<View view={this.view()} />
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