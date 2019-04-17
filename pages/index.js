import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Slideshow from '../components/Slideshow';
import Panel from '../components/Panel';

class Index extends Component {
  static async getInitialProps({ pageProps }) {
    const currentRecordResponse = await fetch('http://hotcities.world/api/records/current');
    const currentRecord = await currentRecordResponse.json();
    const { geonameid } = currentRecord;
    const cityResponse = await fetch(`http://hotcities.world/api/cities/${geonameid}`);
    const city = await cityResponse.json();
    const viewsResponse = await fetch(`http://hotcities.world/api/views/${geonameid}`);
    const views = await viewsResponse.json();
    return { ...pageProps, city, views };
  }

  render() {
    const { city, views } = this.props;
    return (
      <React.Fragment>
        <Slideshow views={views} />
        <Panel title={city.name}>
          <div>Bla</div>
        </Panel>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  views: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Index;
