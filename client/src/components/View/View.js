import React, { Component } from 'react';
import './View.css';

const View = (props) => {
	return (
		<div
			className="view"
			style={{ backgroundImage: 'url(' + this.props.view + ')' }}>
		</div>
	);
}

export default View;