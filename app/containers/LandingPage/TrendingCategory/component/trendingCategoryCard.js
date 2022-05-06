import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

const perfectScrollbarOption = {
  suppressScrollY: true,
  wheelPropagation: true,
};
const trendingCategoryCard = (props) => (
  <PerfectScrollbar option={perfectScrollbarOption}>
    <div style={{ display: 'inline-flex' }}>
      {props.trendingProduct &&
        props.trendingProduct.map((trending) => (
          <div
            key={trending.id}
            style={{
              borderRadius: 3,
              padding: 0,
              width: 180,
              maxHeight: '180px',
              margin: '7.5px',
            }}
          >
            <NavLink to={`/produk/${trending.uuid}`}>
              {trending.imageList.length > 0 && (
                <img
                  src={trending.imageList[0].imagePath}
                  alt={trending.name}
                  style={{ height: '100%', width: '100%' }}
                />
              )}
            </NavLink>
          </div>
        ))}
    </div>
  </PerfectScrollbar>
);
export default trendingCategoryCard;
