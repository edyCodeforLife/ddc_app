import React from 'react';

function importAll(r) {
  const images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const images = importAll(
  require.context('../../../assets/svg/', false, /\.(svg)$/)
);

const CustomSVG = (props) => (
  <img
    className={props.className}
    src={images[`${props.name}.svg`]}
    style={props.style}
  />
);

export default CustomSVG;
