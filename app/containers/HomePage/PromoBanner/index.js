import React from 'react';
import Slider from 'react-slick';

const sliderSettings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  slidesToShow: 1,
  autoplay: true,
  initialSlide: 0,
};

const PromoBanner = (props) => (
  <Slider {...sliderSettings}>
    {props.banner &&
      props.banner.map((image) => (
        <a href={image.url} key={image.id} target={image.target === 'New Windows' && '_target'}>
          <img src={image.image} alt={image.name} style={{ width: '100%' }} />
        </a>
      ))}
  </Slider>
);

export default PromoBanner;
