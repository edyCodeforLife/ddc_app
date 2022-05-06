import React from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';

import UpsellingCart from '../UpsellingCart';
import ProductDetailCart from '../ProductDetailCart';
import Countdown from 'react-countdown-now';

const disableStyle = {
  opacity: 0.2,
};

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => (
  <div>
    <span>{hours}</span>
    <span style={{ margin: '0px 3px' }}>jam</span>
    <span>{minutes}</span>
    <span style={{ margin: '0px 3px' }}>menit</span>
    <span>{seconds}</span>
    <span style={{ margin: '0px 3px' }}>detik</span>
  </div>
);

// addDay = (date) => {
//   const value = new Date();
//   value.setDate(value.getDate() + 1); // Add 1 day
// }

const ProductGroupCart = (props) => {
  const value = new Date(props.cart.createAt);
  value.setDate(value.getDate() + 1); // Add 1 day

  return (
    <div
      style={{
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 2px 0 #28282833',
      }}
    >
      {props.cart.productList.map((product, index) => (
        <ProductDetailCart
          cart={props.cart}
          product={product}
          isLast={props.cart.productList.length === index + 1}
          key={product.productId}
          isWaitingShippingFee={
            props.cart.isWaitingShippingFee === 1
              ? props.cart.customDeliveryId > 0 &&
                props.cart.isWaitingShippingFee === 1
              : props.cart.isCustomDelivery === 1 &&
                props.cart.isWaitingShippingFee === 0
          }
        />
      ))}

      {/* BEGIN Product Group Summary */}
      <div>
        <Row className="mt-3" type="flex" justify="space-between">
          <Col>Item ({props.cart.productList.length} produk)</Col>
          <Col
            className="font-weight-bold"
            style={props.cart.isWaitingShippingFee === 1 ? disableStyle : null}
          >
            {props.cart.discountPrice > 0 && (
              <div className="text-right font-color-gray font-size-smaller text-decoration-strike">
                <NumberFormat
                  value={props.cart.beforeDiscountPrice}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              </div>
            )}
            <div>
              <NumberFormat
                value={props.cart.subtotalPrice}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
              />
            </div>
          </Col>
        </Row>

        {props.cart.deliveryMethod === 'Kirim Alamat' && (
          <Row className="mt-3" type="flex" justify="space-between">
            <Col>Ongkos Kirim</Col>
            <Col className="font-weight-bold">
              {props.cart.isWaitingShippingFee === 1 ? (
                <span style={{ textDecoration: 'underline', color: '#16b8b2' }}>
                  Dalam Penghitungan
                </span>
              ) : (
                <NumberFormat
                  value={props.cart.shippingFee}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              )}
            </Col>
          </Row>
        )}

        {props.cart.customDeliveryId > 0 &&
          props.cart.isWaitingShippingFee === 1 && (
            <Row className="mt-3" type="flex" justify="space-between">
              <Col />
              <Col className="font-weight-bold" style={{ color: '#e61e3c' }}>
                <Countdown date={new Date(value)} renderer={renderer} />
              </Col>
            </Row>
          )}

        <Row className="mt-3" type="flex" justify="space-between">
          <Col>Biaya Packing</Col>
          <Col
            className="font-weight-bold"
            style={props.cart.isWaitingShippingFee === 1 ? disableStyle : null}
          >
            <NumberFormat
              value={props.cart.serviceFee}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp '}
            />
          </Col>
        </Row>

        <Row className="mt-3" type="flex" justify="space-between">
          <Col>Total</Col>
          <Col
            className="font-weight-bold"
            style={props.cart.isWaitingShippingFee === 1 ? disableStyle : null}
          >
            <NumberFormat
              value={props.cart.totalPrice}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp '}
            />
          </Col>
        </Row>
        {props.cart.subtotalPrice < 3000000 && <UpsellingCart />}
      </div>
      {/* END Product Group Summary */}
    </div>
  );
};

export default ProductGroupCart;
