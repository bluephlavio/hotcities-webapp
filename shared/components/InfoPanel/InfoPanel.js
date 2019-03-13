import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './InfoPanel.scss';

const Title = (props) => {
  const {
    alignment,
    title,
    toggle,
    icon,
  } = props;
  return (
    <div className={style.title} style={{ alignItems: alignment }}>
      <h1>{title}</h1>
      <button
        type="button"
        onClick={toggle}
        data-toggle="collapse"
        data-target="#collapse-id"
      >
        <span className={icon} />
      </button>
    </div>
  );
};

Title.propTypes = {
  alignment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

const Details = (props) => {
  const { children } = props;
  return (
    <div className="collapse" id="collapse-id">
      <div className={style.details}>
        {children}
      </div>
    </div>
  );
};

Details.propTypes = {
  children: PropTypes.node,
};

Details.defaultProps = {
  children: undefined,
};

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
    });
  }

  alignment() {
    const { isLoading } = this.props;
    const { isExpanded } = this.state;
    if (isLoading) {
      return 'center';
    }
    if (isExpanded) {
      return 'center';
    }
    return 'center';
  }

  icon() {
    const { isLoading } = this.props;
    const { isExpanded } = this.state;
    if (isLoading) {
      return 'fa fa-spinner fa-spin';
    }
    if (isExpanded) {
      return 'fa fa-angle-down';
    }
    return 'fa fa-angle-up';
  }

  render() {
    const {
      title,
      children,
      isLoading,
    } = this.props;
    return (
      <div className={style.infoPanel}>
        <Title
          icon={this.icon()}
          title={title}
          toggle={this.toggle}
          alignment={this.alignment()}
        />
        {!isLoading && (
          <Details>
            {children}
          </Details>
        )}
      </div>
    );
  }
}

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

InfoPanel.defaultProps = {
  children: undefined,
};

export default InfoPanel;
