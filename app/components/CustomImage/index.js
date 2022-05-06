import React from 'react';

function importAll(r) {
  const images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const images = importAll(
  require.context('../../../assets/images/', false)
);

const CustomImage = (props) => (
  <img
    className={props.className}
    src={images[`${props.name}`]}
    style={props.style}
  />
);

export default CustomImage;
