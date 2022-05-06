import React from 'react';

const Backdrop = (props) => {
  let componentClasses = ['backdrop'];
  if (props.show) { componentClasses.push('show'); }

  return (
    <div className={componentClasses.join(' ')} onClick={props.clicked} />
  );
};
  // props.show ? <div className="backdrop" onClick={props.clicked} /> : null;

export default Backdrop;
