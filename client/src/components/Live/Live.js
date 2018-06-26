import React, { Component } from "react";
import _ from 'underscore';
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators
} from 'reactstrap';
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

const Attribution = (props) => {
	return (
		<div className="live-attribution">
			<a href={props.view.page} target="_blank">
				{props.view.title}
			</a> by <a href={props.view.owner.page} target="_blank">
				{props.view.owner.realname}
			</a>, <a href={props.view.license.link} target="_blank">
				{props.view.license.abbr}
			</a>
		</div>
	);
}

class View extends Component {

	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === this.props.views.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? this.props.views.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	views() {
		return _.map(this.props.views, (view, index) => {
			return (
				<CarouselItem
					onExiting={this.onExiting}
					onExited={this.onExited}
					key={index} >
					<div className="carousel-view"
						style={{backgroundImage: "url(" + view.src + ")"}} />
				</CarouselItem>
			);
		});
	}

	render() {
		const { activeIndex } = this.state;
		const views = this.props.views;
		const view = views[activeIndex];
		return (
			<div className="live-view">
				<Carousel
					activeIndex={this.state.activeIndex}
					next={this.next}
					previous={this.previous} >
					<CarouselIndicators
						items={views}
						activeIndex={activeIndex}
						onClickHandler={this.goToIndex} />
					{this.views()}
					<CarouselControl
						direction="prev"
						directionText="Previous"
						onClickHandler={this.previous} />
					<CarouselControl
						direction="next"
						directionText="Next"
						onClickHandler={this.next} />
				</Carousel>
				{view && <Attribution view={view} />}
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
						views: views
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
				<View
					views={this.state.data ? _.first(this.state.data.views, 3) : []} />
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