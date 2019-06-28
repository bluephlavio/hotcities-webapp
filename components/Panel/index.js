import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

const Toggler = ({ toggle, icon }) => (
  <button type="button" onClick={toggle}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

Toggler.propTypes = {
  toggle: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};

const Bar = ({ title, toggle, icon }) => (
  <div className={style.bar}>
    <h1>{title}</h1>
    <Toggler toggle={toggle} icon={icon} />
  </div>
);

Bar.propTypes = {
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
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
    const { children, title } = this.props;
    return (
      <div className={style.panel}>
        <Bar title={title} toggle={this.toggle} icon={isOpen ? 'angle-down' : 'angle-up'} />
        <Collapse isOpen={isOpen}>
          <Details>{children}</Details>
        </Collapse>
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Panel;
