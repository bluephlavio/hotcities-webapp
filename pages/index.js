import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import ReactGA from 'react-ga';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';
import Item from '../components/Item';
import Thermometer from '../components/Thermometer';
import {
  formatNames,
  formatRank,
  formatCountry,
  formatCoords,
  formatPopulation
} from '../helpers/format';
import config from '../config';

const Title = ({ names, temp, temprange }) => (
  <>
    <div className="names">{names}</div>
    <Thermometer
      className="thermometer"
      temp={temp}
      temprange={temprange}
      widthFactor={0.15}
    />
    <style jsx>
      {`
        .names {
          flex: 0;
          white-space: wrap;
        }
        .thermometer {
          flex: 0;
        }
      `}
    </style>
  </>
);

Title.propTypes = {
  names: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  temprange: PropTypes.arrayOf(PropTypes.number).isRequired
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      ReactGA.pageview('/');
      const { api } = config;
      const { data } = await fetch(`${api}/web/live`).then(res => res.json());
      this.setState({
        isLoading: false,
        data
      });
    } catch (err) {
      this.setState({ isLoading: true });
    }
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <>
        <Head>
          <title>Hot Cities • world hottest city, now.</title>
        </Head>
        <Slideshow photos={!isLoading ? data.current.photos : []} />
        <Panel
          title={() => (
            <Title
              names={formatNames(data.current)}
              temp={data.current.temp}
              temprange={data.stats.temprange}
            />
          )}
          isLoading={isLoading}
        >
          {!isLoading && (
            <>
              <Item
                value={formatPopulation(data.current.population)}
                icon="users"
              />
              <Item value={formatCountry(data.current)} icon="globe" />
              <Item value={formatCoords(data.current)} icon="map-marker" />
              <Item value={formatRank(data.current)} icon="thermometer-full" />
            </>
          )}
        </Panel>
      </>
    );
  }
}

export default Index;
