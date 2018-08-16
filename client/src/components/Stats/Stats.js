import React, { Component } from 'react';
import geojson from 'geojson';
import _ from 'underscore';
import formatter from '../../helpers/formatter';
import Map from '../Map/Map';
import InfoPanel from '../InfoPanel/InfoPanel';
import './Stats.scss';


const Item = (props) => {
  const { index, item } = props;
  const {
    formatNames,
    formatTemp,
    fracToPerc,
  } = formatter;
  return (
    <tr className="stats-item">
      <th nowrap="nowrap" scope="row">{index}</th>
      <td nowrap="nowrap">{formatNames(item.name, item.localname)}</td>
      <td nowrap="nowrap">{fracToPerc(item.recordFrac)}</td>
      <td nowrap="nowrap">{formatTemp(item.recordTemp)}</td>
    </tr>
  );
};

class Ranking extends Component {
  static rankByRecordFrac(data) {
    return _.sortBy(data, item => -item.recordFrac);
  }

  static rankByRecordTemp(data) {
    return _.sortBy(data, item => -item.recordTemp);
  }

  constructor(props) {
    super(props);
    this.state = {
      rankFn: Ranking.rankByRecordTemp,
      expanded: true,
    };
  }

  changeRankFn(fn) {
    return () => {
      this.setState({
        rankFn: fn,
      });
    };
  }

  rank() {
    const { expanded, rankFn } = this.state;
    const { data } = this.props;
    if (expanded) {
      return rankFn(data);
    }
    return _.first(rankFn(data), 5);
  }

  rows() {
    return this.rank()
      .map((item, index) => (
        <Item key={index} index={index + 1} item={item} />
      ));
  }

  render() {
    const { rankFn } = this.state;
    return (
      <div className="ranking">
        <table className="table-hover table-sm table-responsive d-table">
          <thead>
            <tr>
              <th nowrap="nowrap" scope="col">#</th>
              <th nowrap="nowrap" scope="col">city</th>
              <th nowrap="nowrap" scope="col" onClick={this.changeRankFn(Ranking.rankByRecordFrac)}>
                record fraction
                {rankFn === Ranking.rankByRecordFrac
                  ? <span className="fas fa-circle" />
                  : <span className="far fa-circle" />
                }
              </th>
              <th nowrap="nowrap" scope="col" onClick={this.changeRankFn(Ranking.rankByRecordTemp)}>
                record temperature
                {rankFn === Ranking.rankByRecordTemp
                  ? <span className="fas fa-circle" />
                  : <span className="far fa-circle" />
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {this.rows()}
          </tbody>
        </table>
      </div>
    );
  }
}

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
      <div className="stats">
        <div className="stats-view">
          {!isLoading && (
            <Map
              mapstyle="mapbox://styles/bluephlavio/cjin553wo0vr92rrynvsksfuv"
              zoom={1}
              center={[0, 0]}
              load={this.loadMapData}
            />
          )
          }
        </div>
        <InfoPanel
          title={this.caption()}
          isLoading={isLoading}
        >
          {!isLoading && (
            <Ranking data={data.recordCities} />
          )
          }
        </InfoPanel>
      </div>
    );
  }
}

export default Stats;
