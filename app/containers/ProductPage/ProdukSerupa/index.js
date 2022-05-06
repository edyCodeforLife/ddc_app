import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rate } from 'antd';
import productImagePlaceholder from '../../../../assets/images/CrashKatalog.png';
import NumberFormat from 'react-number-format';

const produkSerupa = (props) => (
  <div
    style={{
      width: 165,
      height: 255,
      borderRadius: 3,
      padding: 10,
      margin: '0px 7.5px',
      backgroundColor: '#ffffff',
      border: 'solid 0.5px #dcdcdc',
    }}
  >
    <NavLink to={`${props.products.uuid}`} key={props.products.id}>
      <div className="ddc_default_font_color">
        {props.products.imageList[0] ? (
          <div
            style={{
              backgroundImage: `url(${encodeURI(
                props.products.imageList[0].imagePath
              )})`,
              height: 145,
              width: '100%',
              backgroundSize: 'cover',
              backgroundRepeatY: 'no-repeat',
              borderRadius: '3px',
              backgroundPosition: 'center center',
              overflow: 'hidden',
            }}
          />
        ) : (
          <div
            style={{
              backgroundImage: `url(${productImagePlaceholder})`,
              width: '100%',
              height: '100px',
              backgroundSize: 'cover',
              backgroundRepeatY: 'no-repeat',
              borderRadius: '3px',
              backgroundPosition: 'center center',
            }}
          />
        )}
        <div className="list__article-card">
          <span>{`${props.products.name.substring(0, 35)}...`}</span>
        </div>
        <Rate
          disabled
          allowHalf
          defaultValue={props.products.rating}
          className="productCardMini__rate"
        />
        <div className="font-weight-bold" style={{ fontSize: 14 }}>
          <NumberFormat
            value={props.products.standardRetailPrice}
            displayType={'text'}
            thousandSeparator
            prefix={'Rp '}
            suffix={'/pc'}
          />
        </div>
      </div>
    </NavLink>
  </div>
);
export default produkSerupa;
