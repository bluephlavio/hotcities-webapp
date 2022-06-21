import React from 'react';
import { formatFracAsPerc, formatTemp } from '@/helpers/format';
import styles from './Row.module.scss';

const Row = ({
  index, name, recordfrac, recordtemp, score,
}) => (
  <tr className={styles.row}>
    <th scope="row">{index}</th>
    <td className={styles.name}>{name}</td>
    <td className={styles.score}>{score.toFixed(1)}</td>
    <td className={styles.recordfrac}>{formatFracAsPerc(recordfrac, 1)}</td>
    <td className={styles.recordtemp}>{formatTemp(recordtemp, 1)}</td>
  </tr>
);

export default Row;
