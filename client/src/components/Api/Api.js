import React from 'react';
import './Api.css';

const Api = (props) => {
	return (
		<div className="api">
			<p>
				<b>Base URI: </b>http://www.hotcities.world/api
			</p>
			<table className="table-sm table-responsive table-hover d-table">
				<thead>
					<tr>
						<th scope="col" nowrap="nowrap">endpoint</th>
						<th scope="col" nowrap="nowrap">method</th>
						<th scope="col" nowrap="nowrap">params</th>
						<th scope="col" nowrap="nowrap">description</th>
						<th col="col" nowrap="nowrap"></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td nowrap="nowrap">/cities</td>
						<td nowrap="nowrap">GET</td>
						<td nowrap="nowrap"></td>
						<td nowrap="nowrap">all cities in database</td>
						<td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
					</tr>
					<tr>
						<td nowrap="nowrap">/cities/:id</td>
						<td nowrap="nowrap">GET</td>
						<td nowrap="nowrap">:id</td>
						<td nowrap="nowrap">info about the city with :id as geonameid</td>
						<td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
					</tr>
					<tr>
						<td nowrap="nowrap">/records</td>
						<td nowrap="nowrap">GET</td>
						<td nowrap="nowrap"></td>
						<td nowrap="nowrap">all records info</td>
						<td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
					</tr>
					<tr>
						<td nowrap="nowrap">/records/current</td>
						<td nowrap="nowrap">GET</td>
						<td nowrap="nowrap"></td>
						<td nowrap="nowrap">current record info</td>
						<td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
					</tr>
					<tr>
						<td nowrap="nowrap">/records/cities</td>
						<td nowrap="nowrap">GET</td>
						<td nowrap="nowrap"></td>
						<td nowrap="nowrap">all record cities with statistics</td>
						<td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
					</tr>
					<tr>
						<td nowrap="nowrap">/records/countries</td>
						<td nowrap="nowrap">GET</td>
						<td nowrap="nowrap"></td>
						<td nowrap="nowrap">all record countries with statistics</td>
						<td nowrap="nowrap"><a href="/api/cities" target="_blank">Try it</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Api;