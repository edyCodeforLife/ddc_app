import React from 'react';
import { NavLink } from 'react-router-dom';
import constant from 'utils/configs/constant';
import PerfectScrollbar from 'react-perfect-scrollbar';
import placeholder from '../../../../assets/images/CrashKatalog.png';

const perfectScrollbarOption = {
  suppressScrollY: true,
  wheelPropagation: true,
};
const trendingCategoryCard = (props) => (
  <PerfectScrollbar option={perfectScrollbarOption}>
    <div style={{ display: 'inline-flex' }}>
      {props.trendingProduct &&
        props.trendingProduct.map((product) => (
          <div
            style={{
              borderRadius: 3,
              padding: 0,
              width: 180,
              maxHeight: '180px',
              margin: '7.5px',
            }}
          >
            <NavLink to={`/produk/${product.uuid}`}>
              {product.promotionImagePath.length > 0 && (
                <img
                  src={product.promotionImagePath[0].imagePath}
                  alt={product.name}
                  style={{ height: '100%', width: '100%' }}
                />
              )}
              {product.imageList.length > 0 && (
                <img
                  src={product.imageList[0].imagePath}
                  alt={product.name}
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
