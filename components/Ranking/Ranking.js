import React from 'react';
import lodash from 'lodash';
import { Table } from 'reactstrap';
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
      <Table size="sm" hover>
        <thead>
          <tr>
            <th aria-label="label" />
            <th>city</th>
            <Header title="score" selected={sortBy === 'score'} onClick={handleSortBy('score')} />
            <Header
              title="record time share"
              selected={sortBy === 'recordfrac'}
              onClick={handleSortBy('recordfrac')}
            />
            <Header
              title="record temperature"
              selected={sortBy === 'recordtemp'}
              onClick={handleSortBy('recordtemp')}
            />
          </tr>
        </thead>
        <tbody>
          {lodash
            .chain(data?.ranking || [])
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
      </Table>
    </div>
  );
};

export default Ranking;
