import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import globalStyles from '../../style/global';

const Layout = props => {
  const { children } = props;
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="main">{children}</div>
      <div className="footer">
        <Footer />
      </div>
      <style jsx>
        {`
          .layout {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .header {
            flex: 0;
          }
          .main {
            flex: 1;
            flex-basis: auto;
            display: flex;
            flex-direction: column;
          }
          .footer {
            flex: 0;
          }
        `}
      </style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
