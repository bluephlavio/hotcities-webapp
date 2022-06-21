import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.main}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
