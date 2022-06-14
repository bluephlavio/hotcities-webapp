import React from 'react';
import { Collapse } from 'reactstrap';
import useData from '@/hooks/useData';
import Bar from './components/Bar';
import Details from './components/Details';
import styles from './Panel.module.scss';

const Panel = ({ children, Title }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const { isLoading } = useData();

  return (
    <div className={styles.panel}>
      <Bar
        title={isLoading ? 'Loading...' : <Title />}
        toggle={handleToggle}
        icon={isLoading ? 'spinner' : isOpen ? 'angle-down' : 'angle-up'}
        isLoading={isLoading}
        onClick={handleToggle}
      />
      <Collapse isOpen={isOpen}>
        {!isLoading && <Details>{children}</Details>}
      </Collapse>
    </div>
  );
};

export default Panel;
