import React, { Component } from 'react';
import './Api.scss';

class Api extends Component {
  constructor() {
    super();
    this.state = {
      citiesGeonameid: 109223, // Medina
      recordsGeonameid: 109223, // Medina
      viewsGeonameid: 109223, // Medina
    };
  }

  render() {
    return (
      <div className="api">
        <p>
          <b>Base URI. </b>
http://www.hotcities.world/api

        </p>
        <table className="table-sm table-responsive table-hover d-table">
          <thead>
            <tr>
              <th scope="col" nowrap="nowrap">endpoint</th>
              <th scope="col" nowrap="nowrap">method</th>
              <th scope="col" nowrap="nowrap">params</th>
              <th scope="col" nowrap="nowrap">description</th>
              <th col="col" nowrap="nowrap" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td nowrap="nowrap">/cities</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap" />
              <td nowrap="nowrap">all cities in database</td>
              <td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
            </tr>
            <tr>
              <td nowrap="nowrap">/cities/:id</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap">
                <label target="#citiesGeonameid">:id</label>
                <input
                  className="form-control d-inline"
                  size="8"
                  type="text"
                  id="citiesGeonameid"
                  placeholder={this.state.citiesGeonameid}
                  onChange={(e) => { this.setState({ citiesGeonameid: e.target.value }); }}
                />
              </td>
              <td nowrap="nowrap">info about the city with :id as geonameid</td>
              <td nowrap="nowrap">
                <a href={`/api/cities/${this.state.citiesGeonameid}`} target="_blank">
									Try it

                </a>
              </td>
            </tr>
            <tr>
              <td nowrap="nowrap">/records</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap" />
              <td nowrap="nowrap">all records info</td>
              <td nowrap="nowrap"><a href="/api/records" target="_blank">Try it</a></td>
            </tr>
            <tr>
              <td nowrap="nowrap">/records/current</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap" />
              <td nowrap="nowrap">current record info</td>
              <td nowrap="nowrap"><a href="/api/records/current" target="_blank">Try it</a></td>
            </tr>
            <tr>
              <td nowrap="nowrap">/records/:id</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap">
                <label target="#recordsGeonameid">:id</label>
                <input
                  className="form-control d-inline"
                  size="8"
                  type="text"
                  id="recordsGeonameid"
                  placeholder={this.state.recordsGeonameid}
                  onChange={(e) => { this.setState({ recordsGeonameid: e.target.value }); }}
                />
              </td>
              <td nowrap="nowrap">records for the city with :id as geonameid</td>
              <td nowrap="nowrap">
                <a href={`/api/records/${this.state.recordsGeonameid}`} target="_blank">
									Try it

                </a>
              </td>
            </tr>
            <tr>
              <td nowrap="nowrap">/views</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap" />
              <td nowrap="nowrap">all views</td>
              <td nowrap="nowrap"><a href="/api/views" target="_blank">Try it</a></td>
            </tr>
            <tr>
              <td nowrap="nowrap">/view/:id</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap">
                <label target="#viewsGeonameid">:id</label>
                <input
                  className="form-control d-inline"
                  size="8"
                  type="text"
                  id="viewsGeonameid"
                  placeholder={this.state.viewsGeonameid}
                  onChange={(e) => { this.setState({ viewsGeonameid: e.target.value }); }}
                />
              </td>
              <td nowrap="nowrap">views for the city with :id as geonameid</td>
              <td nowrap="nowrap">
                <a href={`/api/views/${this.state.viewsGeonameid}`} target="_blank">
									Try it

                </a>
              </td>
            </tr>
            <tr>
              <td nowrap="nowrap">/stats/cities</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap" />
              <td nowrap="nowrap">all record cities with statistics</td>
              <td nowrap="nowrap"><a href="/api/stats/cities" target="_blank">Try it</a></td>
            </tr>
            <tr>
              <td nowrap="nowrap">/stats/countries</td>
              <td nowrap="nowrap">GET</td>
              <td nowrap="nowrap" />
              <td nowrap="nowrap">all record countries with statistics</td>
              <td nowrap="nowrap"><a href="/api/stats/countries" target="_blank">Try it</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Api;
