import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import style from './Slideshow.scss';

const Attribution = (props) => {
  const {
    view: {
      page,
      title,
      owner,
      license,
    },
  } = props;
  return (
    <div className={style.attribution}>
      <a href={page} rel="noopener noreferrer" target="_blank">
        {title}
      </a>
      {' by '}
      <a href={owner.page} rel="noopener noreferrer" target="_blank">
        {owner.realname}
      </a>
      {', '}
      <a href={license.link} rel="noopener noreferrer" target="_blank">
        {license.abbr}
      </a>
    </div>
  );
};

Attribution.propTypes = {
  view: PropTypes.object.isRequired,
};


class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const { activeIndex } = this.state;
    const { views } = this.props;
    const nextIndex = activeIndex === views.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const { activeIndex } = this.state;
    const { views } = this.props;
    const nextIndex = activeIndex === 0 ? views.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  views() {
    const { views } = this.props;
    return _.map(views, (view, index) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={index}
      >
        <div
          className={style.view}
          style={{ backgroundImage: `url(${view.src})` }}
        />
      </CarouselItem>
    ));
  }

  render() {
    const { activeIndex } = this.state;
    const { views } = this.props;
    const view = views[activeIndex];
    return (
      <div className={style.slideshow}>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={views}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {this.views()}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        {view && <Attribution view={view} />}
      </div>
    );
  }
}

Slideshow.propTypes = {
  views: PropTypes.array.isRequired,
};

export default Slideshow;
