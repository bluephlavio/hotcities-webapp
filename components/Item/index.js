import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../style/theme';

const Item = ({ value, icon }) => {
  return (
    <div className="item">
      <span className="value">{value}</span>
      <FontAwesomeIcon icon={icon} fixedWidth className="icon" />
      <style jsx>
        {`
          .item {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .icon {
            width: 60px;
            border-left: 1px dashed ${theme.palette.accent};
          }
          .value {
            padding: 0 10px;
            text-align: right;
          }
        `}
      </style>
    </div>
  );
};

Item.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired
};

export default Item;
