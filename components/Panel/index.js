import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

const Bar = ({ title, toggle, icon, isLoading }) => (
  <div className={style.bar}>
    <h1>{title}</h1>
    <button type="button" onClick={toggle}>
      <FontAwesomeIcon icon={icon} spin={isLoading} />
    </button>
  </div>
);

Bar.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  toggle: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const Details = ({ children }) => <div className={style.details}>{children}</div>;

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
        className={style.panel}
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
        <Collapse isOpen={isOpen}>{!isLoading && <Details>{children}</Details>}</Collapse>
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
