import React, {Component} from "react";
import Loading from '../Loading/Loading';
import View from '../View/View';
import './Live.css';

class Live extends Component {

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    fetch("/api/records/current/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({data, isLoading: false});
      });
  }

  render() {
    return (
      <div className="live">
        {this.state.isLoading ? <Loading /> :
          <View
            city={this.state.data.city.name}
            lat={this.state.data.city.lat}
            lon={this.state.data.city.lon}
            country={this.state.data.city.country}
            population={this.state.data.city.population}
            temp={this.state.data.temp}
            view={this.state.data.view} />
        }
      </div>
    );
  }

}

export default Live;
