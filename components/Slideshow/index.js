import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import theme from '../../style/theme';

const Attribution = ({ photo }) => {
  const { url, title, owner, license } = photo;
  return (
    <div className="attribution">
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
      <style jsx>
        {`
          .attribution {
            flex: 0;
            font-size: ${theme.font.size.tiny};
          }
        `}
      </style>
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
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={src}
        >
          <div className="photo" style={{ backgroundImage: `url(${src})` }} />
          <style jsx>
            {`
              .photo {
                flex: 1;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-attachment: fixed;
                filter: grayscale(1);
              }
            `}
          </style>
        </CarouselItem>
      );
    });

    return (
      <div className="slideshow">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
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
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        {activePhoto && <Attribution photo={activePhoto} />}
        <style jsx>
          {`
            .slideshow {
              flex: 1;
              display: flex;
              flex-direction: column;
              min-height: 250px;
              animation: fadein 2s;
              background-color: ${theme.palette.secondary};
            }
          `}
        </style>
        <style jsx global>
          {`
            .carousel,
            .carousel-inner,
            .carousel-item.active {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .carousel-indicators li {
              width: 10px;
              height: 10px;
              border-radius: 100%;
            }
          `}
        </style>
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
