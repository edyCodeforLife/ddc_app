import React from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';

import OrderDetail from '../OrderDetail';

const OrderGroup = (props) => (
  <div
    className={props.TDSOrder ? 'bg-white' : 'mb-10 p-15 bg-white box-shadow'}
  >
    {!props.TDSOrder && (
      <div className="mt-15">
        Order ID :&nbsp;
        <span className="font-weight-bold">{props.order.orderNumber}</span>
      </div>
    )}

    <div className="mt-15 border">
      {props.order.orderDetailProduct.map((product, index) => (
        <OrderDetail
          order={props.order}
          product={product}
          isLast={props.order.orderDetailProduct.length === index + 1}
          key={product.id}
        />
      ))}
    </div>
    <div className="mt-15 font-size-small">
      <Row type="flex" justify="space-between">
        <Col>Item ({props.order.orderDetailProduct.length} produk)</Col>
        <Col className="font-weight-bold">
          {props.order.discountPrice > 0 && (
            <div className="text-right font-color-gray font-size-smaller text-decoration-strike">
              <NumberFormat
                value={props.order.beforeDiscountPrice}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
              />
            </div>
          )}
          <div>
            <NumberFormat
              value={props.order.price}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp '}
            />
          </div>
        </Col>
      </Row>

      {props.order.deliveryMethod === 'Kirim Alamat' && (
        <Row className="mt-25" type="flex" justify="space-between">
          <Col>Ongkos Kirim</Col>
          <Col className="font-weight-bold">
            {props.order.shippingFee === 0 ? (
              'Gratis'
            ) : (
              <NumberFormat
                value={props.order.shippingFee}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
              />
            )}
          </Col>
        </Row>
      )}

      <Row className="mt-25" type="flex" justify="space-between">
        <Col>Biaya Admin</Col>
        <Col className="font-weight-bold">
          <NumberFormat
            value={props.order.serviceFee}
            displayType={'text'}
            thousandSeparator
            prefix={'Rp '}
          />
        </Col>
      </Row>

      <Row className="mt-25" type="flex" justify="space-between">
        <Col>Total</Col>
        <Col className="font-weight-bold">
          <NumberFormat
            value={props.order.totalPrice}
            displayType={'text'}
            thousandSeparator
            prefix={'Rp '}
          />
        </Col>
      </Row>
    </div>
  </div>
);

export default OrderGroup;
