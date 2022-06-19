import React from 'react';
import classNames from 'classnames';
import useData from '@/hooks/useData';
import styles from './Selector.module.scss';

const Selector = ({ focus, children }) => {
  const { focus: activeFocus, setFocus } = useData();

  const handleSelect = () => {
    setFocus(focus);
  };

  const isActive = focus === activeFocus;

  return (
    <button type="button" onClick={handleSelect} className={classNames(styles.selector, { [styles.active]: isActive })}>
      {children}
    </button>
  );
};

export default Selector;
