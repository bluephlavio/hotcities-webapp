import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <div className={styles.header}>
      <Header />
    </div>
    <div className={styles.main}>{children}</div>
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Layout;
