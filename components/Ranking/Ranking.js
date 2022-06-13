import React from 'react';
import _ from 'lodash';
import { Table } from 'reactstrap';
import { formatNames } from '@/helpers/format';
import Header from './components/Header';
import Row from './components/Row';
import styles from './Ranking.module.scss';

const Ranking = ({ data }) => {
  const [sortBy, setSortBy] = React.useState('score');

  const handleSortBy = key => () => {
    setSortBy(key);
  };

  return (
    <div className={styles.ranking}>
      <Table size="sm" hover>
        <thead>
          <tr>
            <th></th>
            <th>city</th>
            <Header
              title="score"
              selected={sortBy === 'score'}
              onClick={handleSortBy('score')}
            />
            <Header
              title="record %"
              selected={sortBy === 'recordfrac'}
              onClick={handleSortBy('recordfrac')}
            />
            <Header
              title="max @/components/°F"
              selected={sortBy === 'recordtemp'}
              onClick={handleSortBy('recordtemp')}
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
                  key={`${name}-${score}-${recordfrac}-${recordtemp}`}
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
    </div>
  );
};

export default Ranking;
