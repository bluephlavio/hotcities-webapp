import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import fmt from '../../helpers/formatter';
import Slideshow from '../Slideshow/Slideshow';
import InfoPanel from '../InfoPanel/InfoPanel';
import style from './Live.scss';

const Item = (props) => {
  const { value, icon } = props;
  return (
    <li className={style.item}>
      <span className={style.itemValue}>{value}</span>
      <span className={style.itemIcon}><span className={icon} /></span>
    </li>
  );
};

Item.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('/api/records/current', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(record => Promise.all([
        record,
        fetch(`/api/cities/${record.geonameid}`)
          .then(res => res.json()),
        fetch(`/api/views/${record.geonameid}`)
          .then(res => res.json()),
      ]))
      .then((results) => {
        const record = results[0];
        const city = results[1];
        const views = results[2];
        this.setState({
          data: {
            name: city.name,
            localname: city.localname,
            country: city.country,
            countrycode: city.countrycode,
            lat: city.lat,
            lng: city.lng,
            temp: record.temp,
            views,
          },
          isLoading: false,
        });
      });
  }

  caption() {
    const { isLoading, data } = this.state;
    const { formatNames } = fmt;
    if (isLoading) {
      return 'Loading...';
    }
    return formatNames(data.name, data.localname);
  }

  details() {
    const { data } = this.state;
    const {
      formatTemp,
      formatCoords,
      formatCountry,
    } = fmt;
    return (
      <div className={style.details}>
        <ul>
          <Item
            value={formatTemp(data.temp)}
            icon="fa fa-thermometer-full"
          />
          <Item
            value={formatCountry(data.country, data.countrycode)}
            icon="fa fa-globe"
          />
          <Item
            value={formatCoords(data.lat, data.lng)}
            icon="fa fa-map-marker"
          />
        </ul>
      </div>
    );
  }

  render() {
    const { isLoading, data } = this.state;
    const views = data ? _.first(data.views, 3) : [];
    return (
      <div className={style.live}>
        <div className={style.view}>
          <Slideshow views={views} />
        </div>
        <div className={style.panel}>
          <InfoPanel
            title={this.caption()}
            isLoading={isLoading}
            isExpanded={false}
          >
            {!isLoading && this.details()}
          </InfoPanel>
        </div>
      </div>
    );
  }
}

export default Live;
