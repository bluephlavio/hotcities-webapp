import React from 'react';
import Header from '../Header';
import style from './style.scss';

const Layout = props => (
  <div className={style.layout}>
    <Header />
    { props.children }
  </div>
);

export default Layout;