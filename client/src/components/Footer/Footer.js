import React from "react";
import './Footer.css';

const Social = (props) => {
	return (
		<div className="footer-social">
			<ul className="nav justify-content-center">
				<li className="nav-item">
					<button className="btn btn-social-icon">
						<a href="https://twitter.com/intent/user?screen_name=hotcitiesworld" target="_blank" rel="noopener noreferrer">
							<span className="fab fa-twitter"></span>
						</a>
					</button>
				</li>
				<li className="nav-item">
					<button className="btn btn-social-icon">
						<a href="https://github.com/bluephlavio/hotcities" target="_blank" rel="noopener noreferrer">
							<span className="fab fa-github"></span>
						</a>
					</button>
				</li>
			</ul>
		</div>
	);
}

const Footer = (props) => {
	return (
		<footer className="footer">
			<hr />
			<Social />
		</footer>
	);
}

export default Footer;