import React, { Component } from 'react';
import _ from 'underscore';
import './Cities.css';

const City = (props) => {
  const view = props.view || { src: '/admin/logo-transparent.png' };
  return (
    <div className="city row">
      <div className="col-md-4">
        <img className="w-100" src={view.src} alt={view.title} />
      </div>
      <div className="info col-md-8">
        <h4>
          {props.name}
          {' '}
|
          {' '}
          {props.localname}
        </h4>
        <ul>
          <li>
            <i className="fas fa-globe" />
            {' '}
            <strong>country</strong>
            {' '}
            {props.country}
            {' '}
(
            {props.countrycode}
)
          </li>
          <li>
            <i className="fas fa-map-marker" />
            {' '}
            <strong>coordinates</strong>
            {' '}
            {Math.round(props.lng)}
°
            {' '}
            {props.lng > 0 ? 'E' : 'W'}
,
            {' '}
            {Math.round(props.lat)}
°
            {' '}
            {props.lat > 0 ? 'N' : 'S'}
          </li>
          <li>
            <i className="fas fa-users" />
            {' '}
            <strong>population</strong>
            {' '}
            {props.population}
          </li>
          <li>
            <i className="fas fa-sun" />
            {' '}
            <strong>records</strong>
            {' '}
            {props.records}
            {' '}
(
            {props.share.toFixed(2)}
            {' '}
%)
          </li>
          {props.maxTemp && (
          <li>
            <i className="fas fa-thermometer-full" />
            {' '}
            <strong>record temperature</strong>
            {' '}
            {props.maxTemp}
            {' '}
°C
          </li>
          )
                    }
        </ul>
      </div>
    </div>
  );
};

const CitiesList = props => (
  <div className="cities-list">
    {_.map(props.cities, city => (<City {...city} key={city.geonameid} />))
            }
  </div>
);

const SearchBar = props => (
  <div className="search-bar">
    <div className="row">
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          name="city"
          id="search"
          value={props.search}
          onChange={props.onChange}
          placeholder="Search..."
        />
      </div>
    </div>
  </div>
);

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      search: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    Promise.all([fetch('/api/cities'), fetch('/api/records'), fetch('/api/views')])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then((results) => {
        let cities = results[0];
        const records = results[1];
        const views = results[2];
        cities = _.each(cities, (city) => {
          let cityViews = _.filter(views, view => view.geonameid === city.geonameid);
          cityViews = _.sortBy(cityViews, view => -view.relevance);
          city.view = cityViews[0];
          const cityRecords = _.filter(records, record => record.geonameid === city.geonameid);
          city.records = cityRecords.length;
          city.share = city.records / records.length;
          if (city.records) {
            const temps = _.map(cityRecords, record => record.temp);
            city.maxTemp = _.max(temps);
          }
        });
        this.setState({
          cities,
          isLoading: false,
        });
      });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    const filteredCities = _.filter(this.state.cities, city => city.name.toLowerCase()
      .indexOf(this.state.search.toLowerCase()) !== -1);
    return (
      <div className="cities">
        <div className="container-fluid">
          <h2>Cities</h2>
          <SearchBar search={this.state.search} onChange={this.updateSearch.bind(this)} />
          <CitiesList cities={filteredCities} />
        </div>
      </div>
    );
  }
}

export default Cities;
