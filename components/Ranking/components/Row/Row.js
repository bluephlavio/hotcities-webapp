import React from 'react';
import { formatFracAsPerc, formatTemp } from '@/helpers/format';
import styles from './Row.module.scss';

const Row = ({ index, name, recordfrac, recordtemp, score }) => (
  <tr>
    <th scope="row">{index}</th>
    <td className={styles.name}>{name}</td>
    <td className={styles.score}>{score.toFixed(2)}</td>
    <td className={styles.recordfrac}>{formatFracAsPerc(recordfrac)}</td>
    <td className={styles.recordtemp}>{formatTemp(recordtemp)}</td>
  </tr>
);

export default Row;
