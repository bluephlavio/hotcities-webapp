import React from 'react';
import { Collapse } from 'reactstrap';
import Bar from './components/Bar';
import Details from './components/Details';
import styles from './Panel.module.scss';

const Panel = ({ children, Title, isLoading }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  return (
    <div className={styles.panel}>
      <Bar
        title={isLoading ? 'Loading...' : <Title />}
        toggle={handleToggle}
        icon={isLoading ? 'spinner' : isOpen ? 'angle-down' : 'angle-up'}
        isLoading={isLoading}
      />
      <Collapse isOpen={isOpen}>
        {!isLoading && <Details>{children}</Details>}
      </Collapse>
    </div>
  );
};

export default Panel;
