import React, { Component } from "react";
import fmt from '../../helpers/formatter';
import InfoPanel from "../InfoPanel/InfoPanel";
import "./Live.css";

const Item = props => {
	return (
		<li className="live-item">
			<span className="live-item-value">{props.value}</span>
			<span className={"live-item-icon " + props.icon} />
		</li>
	);
};

const Details = props => {
	return <ul className="live-details">{props.children}</ul>;
};

const View = props => {
	return (
		<div className="live-view" style={{backgroundImage: "url(" + props.view + ")"}} />
	);
}

class Live extends Component {

	constructor() {
		super();
		this.state = { isLoading: true };
	}

	componentDidMount() {
		fetch("/api/records/current")
			.then(res => {
				return res.json();
			})
			.then(data => {
				this.setState(prevState => ({
					data,
					isLoading: false
				}));
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

	icon() {
		if (this.state.isLoading) {
			return 'fa fa-spinner fa-spin';
		} else {
			return 'fa fa-ellipsis-h';
		}
	}

	render() {
		return (
			<div className="live">
				<View view={this.view()} />
				<InfoPanel title={this.caption()} icon={this.icon()}>
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