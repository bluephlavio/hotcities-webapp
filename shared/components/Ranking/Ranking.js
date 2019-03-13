import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import fmt from '../../helpers/formatter';
import style from './Ranking.scss';

const Item = (props) => {
  const { index, item } = props;
  const {
    formatNames,
    formatTemp,
    fracToPerc,
  } = fmt;
  return (
    <tr className={style.item}>
      <th nowrap="nowrap" scope="row">{index}</th>
      <td nowrap="nowrap">{formatNames(item.name, item.localname)}</td>
      <td nowrap="nowrap">{item.score.toFixed(2)}</td>
      <td nowrap="nowrap">{fracToPerc(item.recordFrac)}</td>
      <td nowrap="nowrap">{formatTemp(item.recordTemp)}</td>
    </tr>
  );
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

class Ranking extends Component {
  static rankByRecordFrac(data) {
    return _.sortBy(data, item => -item.recordFrac);
  }

  static rankByRecordTemp(data) {
    return _.sortBy(data, item => -item.recordTemp);
  }

  static rankByScore(data) {
    return _.sortBy(data, item => -item.score);
  }

  constructor(props) {
    super(props);
    this.state = {
      rankFn: Ranking.rankByRecordTemp,
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
    const { rankFn } = this.state;
    const { data } = this.props;
    return rankFn(data);
  }

  rows() {
    return this.rank()
      .map((item, index) => (
        <Item key={`${item}${-index}`} index={index + 1} item={item} />
      ));
  }

  render() {
    const { rankFn } = this.state;
    return (
      <div className={style.ranking}>
        <table className="table-hover table-sm table-responsive d-table">
          <thead>
            <tr>
              <th nowrap="nowrap" scope="col">#</th>
              <th nowrap="nowrap" scope="col">city</th>
              <th
                nowrap="nowrap"
                scope="col"
                onClick={this.changeRankFn(Ranking.rankByScore)}
              >
                {'score'}
                {rankFn === Ranking.rankByScore
                  ? <span className="fas fa-circle" />
                  : <span className="far fa-circle" />
                }
              </th>
              <th
                nowrap="nowrap"
                scope="col"
                onClick={this.changeRankFn(Ranking.rankByRecordFrac)}
              >
                {'record fraction'}
                {rankFn === Ranking.rankByRecordFrac
                  ? <span className="fas fa-circle" />
                  : <span className="far fa-circle" />
                }
              </th>
              <th
                nowrap="nowrap"
                scope="col"
                onClick={this.changeRankFn(Ranking.rankByRecordTemp)}
              >
                {'record temperature'}
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

Ranking.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Ranking;
