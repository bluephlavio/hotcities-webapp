import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import style from './style.scss';

const Attribution = ({ photo }) => {
  const { url, title, owner, license } = photo;
  return (
    <div className={style.attribution}>
      <a href={url} rel="noopener noreferrer" target="_blank">
        {title || 'Untitled'}
      </a>
      {' by '}
      <a href={owner.url} rel="noopener noreferrer" target="_blank">
        {owner.name || 'unnamed'}
      </a>
      {', '}
      <a href={license.url} rel="noopener noreferrer" target="_blank">
        {license.name}
      </a>
    </div>
  );
};

Attribution.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired,
    license: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
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
    const { photos } = this.props;

    if (this.animating) return;
    const nextIndex = activeIndex === photos.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const { activeIndex } = this.state;
    const { photos } = this.props;

    if (this.animating) return;
    const nextIndex = activeIndex === 0 ? photos.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { photos } = this.props;
    const activePhoto = photos[activeIndex];

    const slides = photos.map(photo => {
      const { src } = photo;
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={src}>
          <div className={style.photo} style={{ backgroundImage: `url(${src})` }} />
        </CarouselItem>
      );
    });

    return (
      <div className={style.slideshow}>
        <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
          <CarouselIndicators
            items={photos}
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
        {activePhoto && <Attribution photo={activePhoto} />}
      </div>
    );
  }
}

Slideshow.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Slideshow;
