import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import style from './style.scss';

const Layout = props => (
  <div className={style.layout}>
    <Header />
    { props.children }
    <Footer />
  </div>
);

export default Layout;