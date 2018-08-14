import React, { Component } from 'react';
import './InfoPanel.scss';

const Title = props => (
  <div className="info-panel-title" style={{ alignItems: props.alignment }}>
    <h1>{props.title}</h1>
    <button
      onClick={props.toggle}
      data-toggle="collapse"
      data-target="#collapse-id"
    >
      <span className={props.icon} />
    </button>
  </div>
);

const Details = props => (
  <div className="info-panel-details">
    <div className="collapse" id="collapse-id">
      {props.children}
    </div>
  </div>
);

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isExpanded: !this.state.isExpanded,
    }));
  }

  alignment() {
    if (this.props.isLoading) {
      return 'center';
    }
    if (this.state.isExpanded) {
      return 'center';
    }
    return 'center';
  }

  icon() {
    if (this.props.isLoading) {
      return 'fa fa-spinner fa-spin';
    }
    if (this.state.isExpanded) {
      return 'fa fa-angle-down';
    }
    return 'fa fa-angle-up';
  }

  render() {
    return (
      <div className="info-panel">
        <Title
          icon={this.icon()}
          title={this.props.title}
          toggle={this.toggle}
          alignment={this.alignment()}
        />
        <Details children={this.props.children} />
      </div>
    );
  }
}

export default InfoPanel;
