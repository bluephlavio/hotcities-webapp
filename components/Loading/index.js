import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../style/theme';

const Loading = ({ children }) => (
  <div className="loading">
    {children}
    <style jsx>
      {`
        .loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 250px;
          animation: fadein 2s;
          background-color: ${theme.palette.secondary};
        }
      `}
    </style>
  </div>
);

Loading.propTypes = {
  children: PropTypes.node
};

Loading.defaultProps = {
  children: <></>
};

export default Loading;
