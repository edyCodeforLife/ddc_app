import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import moment from 'moment';

const labelStyle = {
  fontSize: 10,
  color: '#8c8c8c',
};

const badgeStyle = {
  padding: 5,
  fontSize: 10,
  color: 'rgb(245, 130, 31)',
  borderRadius: 3,
  backgroundColor: 'rgba(245, 130, 31, 0.05)',
  border: 'solid 0.5px rgb(245, 130, 31)',
};

const SalesCard = (props) => (
  <div
    style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
      padding: 15,
    }}
  >
    <NavLink to={`/profil/penjualan/${props.order.uuid}`}>
      <Row type="flex" align="middle" justify="space-between">
        <Col>
          <div style={labelStyle}>Order ID</div>
          <div className="ddc_default_font_color" style={{ fontSize: 12 }}>
            {props.order.orderNumber}
          </div>
          <div className="font-size-smaller font-color-gray">
              {moment(props.order.createAt).format('D MMM, HH : mm')}
            </div>
          <div style={{ marginTop: 5 }}>
            <span style={badgeStyle}>
              {props.order.orderStatusName === 'Pembayaran Diterima'
                ? 'Menunggu Konfirmasi'
                : props.order.orderStatusName}
            </span>
          </div>
        </Col>
        <Col>
          <Icon
            type="right"
            style={{ fontSize: 16, color: 'rgb(140, 140, 140)' }}
          />
        </Col>
      </Row>
    </NavLink>
  </div>
);

export default SalesCard;
