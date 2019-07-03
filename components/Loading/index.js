import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Loading = ({ children }) => <div className={style.loading}>{children}</div>;

Loading.propTypes = {
  children: PropTypes.node
};

Loading.defaultProps = {
  children: <></>
};

export default Loading;
