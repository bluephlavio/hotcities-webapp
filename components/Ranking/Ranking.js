import React from 'react';
import lodash from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useData from '@/hooks/useData';
import { formatNames } from '@/helpers/format';
import Header from './components/Header';
import Row from './components/Row';
import styles from './Ranking.module.scss';

const Ranking = () => {
  const { data } = useData();

  const [limit, setLimit] = React.useState(10);

  const handleMore = () => {
    setLimit(limit + 10);
  };

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
            .slice(0, limit)
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
      <button type="button" onClick={handleMore} className={styles.more}>
        <span>more</span>
        <FontAwesomeIcon icon={['fa', 'angle-down']} />
      </button>
    </div>
  );
};

export default Ranking;
