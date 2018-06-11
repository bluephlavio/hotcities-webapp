import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <span className="fa fa-spinner fa-spin"> </span>
        <span>
          Loading...
        </span>
      </div>
    );
  }
}

export default Loading;
