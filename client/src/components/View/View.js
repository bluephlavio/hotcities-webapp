import React, { Component } from 'react';
import formatcoords from "formatcoords";
import './View.css';

class View extends Component {

  coords() {
    return formatcoords(this.props.lat, this.props.lon)
      .format("DD MM X", {
        latLonSeparator: " ",
        decimalPlaces: 0
      }
    );
  }

  temp() {
    return Math.round(this.props.temp) + " °C";
  }

  maps() {
    return "http://www.google.com/maps/place/" + this.props.city;
  }

  render() {
    return (
      <div className="view">
        <div
          className="view-photo"
          style={{ backgroundImage: 'url(' + this.props.view + ')' }}>
        </div>
        <div className="view-info">
          <h2>{this.props.city}</h2>
          <hr />
          <ul>
            <li>
              <span>{this.temp()}</span>
              <span className="fa fa-thermometer-full"></span>
            </li>
            <li>
              <span>{this.props.country}</span>
              <span className="fa fa-globe"></span>
            </li>
            <li>
              <span>
                <a href={this.maps()} target="_blank">
                  {this.coords()}
                </a>
              </span>
              <span className="fa fa-map-marker"></span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default View;
