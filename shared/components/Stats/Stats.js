import React, { Component } from 'react';
import geojson from 'geojson';
import _ from 'underscore';
import Ranking from '../Ranking/Ranking';
import Map from '../Map/Map';
import InfoPanel from '../InfoPanel/InfoPanel';
import style from './Stats.scss';

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
    this.loadMapData = this.loadMapData.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/cities'),
      fetch('/api/stats/cities'),
    ])
      .then(results => Promise.all(results.map(item => item.json())))
      .then(results => this.setState({
        data: {
          cities: results[0],
          recordCities: results[1],
        },
      }))
      .then(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  caption() {
    const { isLoading } = this.state;
    if (isLoading) {
      return 'Loading...';
    }
    return 'Stats';
  }

  loadMapData(map) {
    const { data } = this.state;
    const recordCities = _.map(data.recordCities, (entry) => {
      const city = entry;
      city.circleRadius = Math.sqrt(entry.recordFrac);
      city.circleColor = entry.recordTemp;
      return city;
    });
    const recordTemps = _.map(data.recordCities, entry => entry.recordTemp);
    const recordFracs = _.map(data.recordCities, entry => entry.recordFrac);
    return () => {
      map.addLayer({
        id: 'records',
        type: 'circle',
        source: {
          type: 'geojson',
          data: geojson.parse(recordCities, { Point: ['lat', 'lng'] }),
        },
        paint: {
          'circle-color': {
            property: 'circleColor',
            stops: [
              [Math.min(...recordTemps), 'rgba(244, 147, 29, 0)'],
              [Math.max(...recordTemps), 'rgba(244, 147, 29, 1)'],
            ],
          },
          'circle-blur': 0.3,
          'circle-radius': {
            property: 'circleRadius',
            stops: [
              [Math.min(...recordFracs), 0],
              [Math.max(...recordFracs), 10],
            ],
          },
        },
      });
    };
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className={style.stats}>
        <div className={style.view}>
          {!isLoading && <Map load={this.loadMapData} />}
        </div>
        <div className={style.panel}>
          <InfoPanel
            title={this.caption()}
            isLoading={isLoading}
            isExpanded={false}
          >
            {!isLoading && <Ranking data={data.recordCities} />}
          </InfoPanel>
        </div>
      </div>
    );
  }
}

export default Stats;
