import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../style/theme';

const Bar = ({ title, toggle, icon, isLoading }) => (
  <div className="bar">
    <h1>{title}</h1>
    <button type="button" onClick={toggle}>
      <FontAwesomeIcon icon={icon} spin={isLoading} fixedWidth />
    </button>
    <style jsx>
      {`
        .bar {
          margin: 0;
          border: 0;
          padding: ${theme.dim.padding};
          display: flex;
          align-items: center;
          align-content: space-between;
        }
        h1 {
          margin: 0;
          border: 0;
          padding: 0;
          flex: 1;
          color: ${theme.palette.accent};
          font-size: ${theme.font.size.big};
        }
      `}
    </style>
  </div>
);

Bar.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  toggle: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const Details = ({ children }) => (
  <div className="details">
    {children}
    <style jsx>
      {`
        .details {
          margin: 0;
          border: 0;
          padding: ${theme.dim.padding};
          background-color: ${theme.palette.primary};
          color: ${theme.palette.accent};
          font-size: ${theme.font.size.medium};
        }

        .details a {
          color: rgba(${theme.palette.secondary}, 0.5);
        }

        .details a:hover {
          color: ${theme.palette.accent};
        }
      `}
    </style>
  </div>
);

Details.propTypes = {
  children: PropTypes.node.isRequired
};

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { children, title, isLoading } = this.props;
    return (
      <div
        className="panel"
        onMouseOver={() => this.setState({ isOpen: true })}
        onFocus={() => null}
        onMouseOut={() => this.setState({ isOpen: false })}
        onBlur={() => null}
      >
        <Bar
          title={isLoading ? 'Loading...' : title()}
          toggle={this.toggle}
          icon={isLoading ? 'spinner' : isOpen ? 'angle-down' : 'angle-up'}
          isLoading={isLoading}
        />
        <Collapse isOpen={isOpen}>
          {!isLoading && <Details>{children}</Details>}
        </Collapse>
        <style jsx>
          {`
            .panel {
              flex: 0;
              background-color: ${theme.palette.primary};
              color: ${theme.palette.accent};
            }
          `}
        </style>
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default Panel;
