import React from 'react';
import NumberFormat from 'react-number-format';
import { Row, Col } from 'antd';

const ResellerPrices = (props) =>
  props.product.productDiscountPrice &&
  props.product.productDiscountPrice.length != 0 ? (
    // If Discount
    <Row>
      {props.product.productDiscountPrice.map((price) => (
        <Col
          span={12}
          className="productCard__description__price"
          key={price.id}
        >
          <div className="productCard__description__label">
            {price.minimumPurchase === 1
              ? 'Harga Member'
              : `Pembelian Minimal ${price.minimumPurchase} pc+`}
          </div>
          <div className="font-weight-bolder font-size-small font-color-gray text-decoration-strike">
            <NumberFormat
              value={price.priceBefore}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp. '}
            />
            <span>/pc</span>
          </div>
          <div className="font-weight-bolder">
            <NumberFormat
              value={price.priceAfter}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp. '}
            />
            <span>/pc</span>
          </div>
        </Col>
      ))}
    </Row>
  ) : (
    <Row>
      {props.product.productResellerPrice.map((price) => (
        <Col
          span={12}
          className="productCard__description__price"
          key={price.id}
        >
          <div className="productCard__description__label">
            {price.minimumPurchase === 1
              ? 'Harga Member'
              : `Pembelian Minimal ${price.minimumPurchase} pc+`}
          </div>
          <div className="font-weight-bolder">
            <NumberFormat
              value={price.minimumPurchasePrice}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp. '}
            />
            <span>/pc</span>
          </div>
        </Col>
      ))}
    </Row>
  );

export default ResellerPrices;
