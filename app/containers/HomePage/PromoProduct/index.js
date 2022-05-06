import React from 'react';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Rate } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';

import constant from '../../../utils/configs/constant';
import CustomImage from '../../../components/CustomImage';

const perfectScrollbarOption = {
  suppressScrollY: true,
  wheelPropagation: true,
};
const Max_length = 30;
const PromoProduct = (props) => (
  <PerfectScrollbar option={perfectScrollbarOption}>
    <div style={{ display: 'inline-flex' }}>
      {props.product.map((product) => (
        <div
          key={product.uuid}
          style={{
            borderRadius: 3,
            padding: 15,
            margin: '7.5px',
            backgroundColor: '#ffffff',
            width: 175,
            height: 265,
            border: 'solid 0.5px #dcdcdc',
          }}
        >
          <NavLink to={`/produk/${product.uuid}`}>
            <div className="ddc_default_font_color">
              <div
                style={{ width: 145, height: 145, backgroundColor: '#f0f0f0' }}
              >
                {product.imagePath ? (
                  <img width={145} src={product.imagePath} />
                ) : (
                  <CustomImage
                    name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                    style={{ width: '100%' }}
                  />
                )}
              </div>
              <div style={{ fontSize: 12, marginTop: 5 }}>
                <span>{`${product.name.substring(0, 30)}...`}</span>
              </div>
              <Rate
                disabled
                allowHalf
                defaultValue={product.rating}
                className="productCardMini__rate"
              />
              <div style={{ fontSize: 14 }}>
                <NumberFormat
                  value={product.standardRetailPrice}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                  suffix={'/pc'}
                />
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  </PerfectScrollbar>
);

export default PromoProduct;
