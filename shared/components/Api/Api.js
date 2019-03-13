import React from 'react';
import Endpoint from '../Endpoint/Endpoint';
import style from './Api.scss';

const Api = () => (
  <div className={style.api}>
    <p>
      <b>Base URI / </b>
      http://www.hotcities.world/api
    </p>
    <table className="table-hover table-sm table-responsive d-table">
      <thead>
        <tr>
          <th scope="col" nowrap="nowrap">method</th>
          <th scope="col" nowrap="nowrap">path</th>
          <th scope="col" nowrap="nowrap">description</th>
          <th scope="col" nowrap="nowrap">try it out</th>
        </tr>
      </thead>
      <tbody>
        <Endpoint
          method="GET"
          path="/cities"
          queryParams={{
            name: '',
            population: '',
            countrycode: '',
            timezone: '',
            lng: '',
            lat: '',
            sort: '',
            skip: '',
            limit: '',
          }}
        >
          Returns all the cities in database.
          <ul className={style.params}>
            <li>
              <tt>name / </tt>
              retrieve a single city by international name.
            </li>
            <li>
              <tt>country / </tt>
              filter cities from a single nation.
            </li>
            <li>
              <tt>population / </tt>
              filter cities based on population;
              <br />
              prepend
              <tt> gt: </tt>
              or
              <tt> lt: </tt>
              for
              <i> greater than </i>
              and
              <i> less than </i>
              operators;
              <br />
              many comma separated conditions can be set.
            </li>
            <li>
              <tt>sort / </tt>
              set criteria for sorting results;
              <br />
              accepted criteria are:
              <i> name</i>
              ,
              <i> country</i>
              ,
              <i> population</i>
              ;
              <br />
              prepend a
              <tt> + </tt>
              or a
              <tt> - </tt>
              for
              <i> ascending </i>
              or
              <i> descending </i>
              order.
            </li>
            <li>
              <tt>skip / </tt>
              the offset for pagination purposes.
            </li>
            <li>
              <tt>limit / </tt>
              the maximum number of results.
            </li>
          </ul>
        </Endpoint>
        <Endpoint
          method="GET"
          path="/cities/:geonameid"
          pathParams={{
            geonameid: 109223,
          }}
        >
          returns the city with
          {' '}
          <tt>geonameid</tt>
          {' '}
          as geonameid
        </Endpoint>
        <Endpoint
          method="GET"
          path="/records"
          queryParams={{
            geonameid: '',
            temp: '',
            timestamp: '',
            sort: '',
            skip: '',
            limit: '',
          }}
        >
          returns all the records
        </Endpoint>
        <Endpoint
          method="GET"
          path="/records/:geonameid"
          pathParams={{
            geonameid: 109223,
          }}
        >
          return all the records for the city with
          {' '}
          <tt>geonameid</tt>
          {' '}
          as geonameid
        </Endpoint>
        <Endpoint
          method="GET"
          path="/records/current"
        >
          returns current record info
        </Endpoint>
        <Endpoint
          method="GET"
          path="/views"
        >
          returns all the photos fetched from flickr for live page
        </Endpoint>
        <Endpoint
          method="GET"
          path="/views/:geonameid"
          pathParams={{
            geonameid: 109223,
          }}
        >
          Returns all the photos already fetched from flickr
          <br />
          for the city with
          {' '}
          <tt>geonameid</tt>
          {' '}
          as geonameid
        </Endpoint>
        <Endpoint
          method="GET"
          path="/stats/cities"
        >
          returns all record cities with statistics
        </Endpoint>
        <Endpoint
          method="GET"
          path="/stats/countries"
        >
          returns all record countries with statistics
        </Endpoint>
      </tbody>
    </table>
  </div>
);

export default Api;
