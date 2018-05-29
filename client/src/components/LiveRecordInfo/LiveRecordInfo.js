import React, { Component } from 'react';

class LiveRecordInfo extends Component {
  constructor() {
      super();
      this.state = {
        current: {
          city: {
            name: 'Dubai',
            lat: 25,
          },
          temp: 40
        }
      };
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h2 id="city-name">{this.state.current.city.name}</h2>
            <p>{this.state.current.city.lat}</p>
          </div>
          <div className="col-md-6">
            <p>{this.state.current.temp}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveRecordInfo;
