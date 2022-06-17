import React from 'react';
import lodash from 'lodash';
import useData from '@/hooks/useData';
import { formatNames } from '@/helpers/format';
import Header from './components/Header';
import Row from './components/Row';
import styles from './Ranking.module.scss';

const Ranking = () => {
  const { data } = useData();

  const [sortBy, setSortBy] = React.useState('score');

  const handleSortBy = (key) => () => {
    setSortBy(key);
  };

  return (
    <div className={styles.ranking}>
      <table>
        <thead>
          <tr>
            <th aria-label="label" />
            <th>city</th>
            <Header title="score" selected={sortBy === 'score'} onClick={handleSortBy('score')} />
            <Header title="time share" selected={sortBy === 'recordfrac'} onClick={handleSortBy('recordfrac')} />
            <Header title="max temp" selected={sortBy === 'recordtemp'} onClick={handleSortBy('recordtemp')} />
          </tr>
        </thead>
        <tbody>
          {lodash
            .chain(data?.stats?.ranking || [])
            .sortBy((entry) => -entry[sortBy])
            .slice(0, 30)
            .map((entry, i) => {
              const { name, countrycode, recordfrac, recordtemp, score } = entry;
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
      </table>
    </div>
  );
};

export default Ranking;
