import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import style from './style.scss';

const Layout = props => (
  <div className={style.layout}>
    <div className={style.header}>
      <Header />
    </div>
    <div className={style.main}>
      { props.children }
    </div>
    <div className={style.footer}>
      <Footer />
    </div>
  </div>
);

export default Layout;