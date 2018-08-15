import React, { Component } from 'react';
import _ from 'underscore';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import formatter from '../../helpers/formatter';
import InfoPanel from '../InfoPanel/InfoPanel';
import './Live.scss';

const Item = (props) => {
  const { value, icon } = props;
  return (
    <li className="live-item">
      <span className="live-item-value">{value}</span>
      <span className="live-item-icon"><span className={icon} /></span>
    </li>
  );
};

const Details = (props) => {
  const { children } = props;
  return (
    <div className="live-details">
      <ul>{children}</ul>
    </div>
  );
};

const Attribution = (props) => {
  const {
    view: {
      page,
      title,
      owner,
      license,
    },
  } = props;
  return (
    <div className="live-attribution">
      <a href={page} rel="noopener noreferrer" target="_blank">
        {title}
      </a>
      {' '}
      by
      <a href={owner.page} rel="noopener noreferrer" target="_blank">
        {owner.realname}
      </a>
      ,
      <a href={license.link} rel="noopener noreferrer" target="_blank">
        {license.abbr}
      </a>
    </div>
  );
};

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
    const { activeIndex } = this.state;
    const { views } = this.props;
    const nextIndex = activeIndex === views.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const { activeIndex } = this.state;
    const { views } = this.props;
    const nextIndex = activeIndex === 0 ? views.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  views() {
    const { views } = this.props;
    return _.map(views, (view, index) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={index}
      >
        <div
          className="carousel-view"
          style={{ backgroundImage: `url(${view.src})` }}
        />
      </CarouselItem>
    ));
  }

  render() {
    const { activeIndex } = this.state;
    const { views } = this.props;
    const view = views[activeIndex];
    return (
      <div className="live-view">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={views}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {this.views()}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
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
    const { formatNames } = formatter;
    if (isLoading) {
      return 'Loading...';
    }
    return formatNames(data.name, data.localname);
  }

  render() {
    const { isLoading, data } = this.state;
    const { formatTemp, formatCoords, formatCountry } = formatter;
    return (
      <div className="live">
        <View
          views={data ? _.first(data.views, 3) : []}
        />
        <InfoPanel title={this.caption()} isLoading={isLoading}>
          {!isLoading && (
            <Details>
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
            </Details>
          )
        }
        </InfoPanel>
      </div>
    );
  }
}

export default Live;
