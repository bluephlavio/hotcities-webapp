import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import style from './style.scss';

const Attribution = ({ view }) => {
  const { page, title, owner, license } = view;
  return (
    <div className={style.attribution}>
      <a href={page} rel="noopener noreferrer" target="_blank">
        {title || 'Untitled'}
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
  view: PropTypes.shape({
    page: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      realname: PropTypes.string.isRequired
    }).isRequired,
    license: PropTypes.shape({
      abbr: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
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
    const { activeIndex } = this.state;
    const { views } = this.props;

    if (this.animating) return;
    const nextIndex = activeIndex === views.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const { activeIndex } = this.state;
    const { views } = this.props;

    if (this.animating) return;
    const nextIndex = activeIndex === 0 ? views.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { views } = this.props;
    const activeView = views[activeIndex];

    const slides = views.map(view => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={view.src}>
          <div className={style.view} style={{ backgroundImage: `url(${view.src})` }} />
          <CarouselCaption captionText={view.title} captionHeader={view.title} />
        </CarouselItem>
      );
    });

    return (
      <div className={style.slideshow}>
        <Carousel
          className={style.carousel}
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={views}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <Attribution view={activeView} />
      </div>
    );
  }
}

Slideshow.propTypes = {
  views: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Slideshow;
