import React, { Component } from 'react';
import './InfoPanel.css';

const Title = (props) => {
	return (
		<div className="info-panel-title">
			<h1>{props.title}</h1>
			<button onClick={props.toggle}>
				<span className={props.icon}></span>
			</button>
		</div>
	);
}

const Details = (props) => {
	return (
		<div className="info-panel-details">
			{props.children}
		</div>
	);
}

class InfoPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState(prevState => ({
			expanded: !prevState.expanded
		}));
	}

	render() {
		return (
			<div className="info-panel">
				<hr />
				<Title icon={this.props.icon}
					title={this.props.title}
					toggle={this.toggle} />
				{this.state.expanded && <Details children={this.props.children} />}
			</div>
		);
	}

}

export default InfoPanel;