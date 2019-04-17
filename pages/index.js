import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Slideshow from '../components/Slideshow';

class Index extends Component {
  static async getInitialProps({ pageProps }) {
    const currentRecordResponse = await fetch('http://hotcities.world/api/records/current');
    const recordCity = await currentRecordResponse.json();
    const { geonameid } = recordCity;
    const viewsResponse = await fetch(`http://hotcities.world/api/views/${geonameid}`);
    const viewsData = await viewsResponse.json();
    const views = [viewsData[0], viewsData[1]];
    return { ...pageProps, recordCity, views };
  }

  render() {
    const { views } = this.props;
    return <Slideshow views={views} />;
  }
}

Index.propTypes = {
  views: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Index;
