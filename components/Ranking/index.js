import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  formatNames,
  formatFracAsPerc,
  formatTemp
} from '../../helpers/format';
import theme from '../../style/theme';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'score'
    };
    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(key) {
    this.setState({
      sortBy: key
    });
  }

  render() {
    const { data } = this.props;
    const { sortBy } = this.state;
    return (
      <div className="ranking">
        <Table size="sm" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>city</th>
              <th onClick={() => this.sortBy('score')}>
                score{' '}
                {sortBy === 'score' ? <FontAwesomeIcon icon="circle" /> : ''}
              </th>
              <th onClick={() => this.sortBy('recordfrac')}>
                record fraction{' '}
                {sortBy === 'recordfrac' ? (
                  <FontAwesomeIcon icon="circle" />
                ) : (
                  ''
                )}
              </th>
              <th onClick={() => this.sortBy('recordtemp')}>
                record temperature{' '}
                {sortBy === 'recordtemp' ? (
                  <FontAwesomeIcon icon="circle" />
                ) : (
                  ''
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {_.chain(data)
              .sortBy(entry => -entry[sortBy])
              .map((entry, i) => {
                const {
                  name,
                  countrycode,
                  recordfrac,
                  recordtemp,
                  score
                } = entry;
                return (
                  <tr key={name}>
                    <th scope="row">{i + 1}</th>
                    <td>{`${formatNames(entry)} (${countrycode})`}</td>
                    <td>{score.toFixed(2)}</td>
                    <td>{formatFracAsPerc(recordfrac)}</td>
                    <td>{formatTemp(recordtemp)}</td>
                  </tr>
                );
              })
              .value()}
          </tbody>
        </Table>
        <style jsx>
          {`
            .ranking {
              background-color: ${theme.palette.primary};
              color: ${theme.palette.accent};
              height: 160px;
              overflow: auto;
            }
            td,
            th {
              color: ${theme.palette.accent};
            }
          `}
        </style>
      </div>
    );
  }
}

Ranking.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      recordfrac: PropTypes.number.isRequired,
      recordtemp: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Ranking;
