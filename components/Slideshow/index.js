import React, { Component } from 'react';
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
        { title || 'Untitled' }
      </a>
      {' by '}
      <a href={owner.page} rel="noopener noreferrer" target="_blank">
        { owner.realname }
      </a>
      {', '}
      <a href={license.link} rel="noopener noreferrer" target="_blank">
        { license.abbr }
      </a>
    </div>
  );
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
    const { views } = this.props;

    if (this.animating) return;
    const nextIndex = this.state.activeIndex == views.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const { views } = this.props;

    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? views.length - 1 : this.state.activeIndex - 1;
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

    const slides = views.map((view) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={view.src}
        >
          <div className={style.view} style={{ backgroundImage: `url(${activeView.src})` }} />
          <CarouselCaption captionText={activeView.title} captionHeader={activeView.title} />
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
          <CarouselIndicators items={views} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <Attribution view={activeView} />
      </div>
    );
  }
}

export default Slideshow;