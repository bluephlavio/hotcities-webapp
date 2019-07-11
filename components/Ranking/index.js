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

const Header = ({ title, selected, onClick }) => (
  <th onClick={onClick}>
    <div className="header">
      <FontAwesomeIcon icon={[selected ? 'fas' : 'far', 'circle']} />
      <span className="sep" />
      <span className="title">{title}</span>
    </div>
    <style jsx>
      {`
        .header {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
        }
        .title {
          white-space: nowrap;
        }
        .sep {
          width: 3px;
        }
      `}
    </style>
  </th>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const Row = ({ index, name, recordfrac, recordtemp, score }) => (
  <tr>
    <th scope="row">{index}</th>
    <td className="name">{name}</td>
    <td className="score">{score.toFixed(2)}</td>
    <td className="recordfrac">{formatFracAsPerc(recordfrac)}</td>
    <td className="recordtemp">{formatTemp(recordtemp)}</td>
    <style jsx>
      {`
        td {
          color: ${theme.palette.accent};
          white-space: wrap;
        }
        .score,
        .recordfrac,
        .recordtemp {
          white-space: nowrap;
        }
      `}
    </style>
  </tr>
);

Row.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  recordfrac: PropTypes.number.isRequired,
  recordtemp: PropTypes.number.isRequired
};

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
              <Header
                title="score"
                selected={sortBy === 'score'}
                onClick={() => this.sortBy('score')}
              />
              <Header
                title="record %"
                selected={sortBy === 'recordfrac'}
                onClick={() => this.sortBy('recordfrac')}
              />
              <Header
                title="max °C/°F"
                selected={sortBy === 'recordtemp'}
                onClick={() => this.sortBy('recordtemp')}
              />
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
                  <Row
                    key={name}
                    index={i + 1}
                    name={`${formatNames(entry)} (${countrycode})`}
                    score={score}
                    recordfrac={recordfrac}
                    recordtemp={recordtemp}
                  />
                );
              })
              .value()}
          </tbody>
        </Table>
        <style jsx global>
          {`
            th {
              color: ${theme.palette.accent};
              font-weight: 500;
            }
          `}
        </style>
        <style jsx>
          {`
            .ranking {
              background-color: ${theme.palette.primary};
              color: ${theme.palette.accent};
              height: 160px;
              overflow: auto;
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
