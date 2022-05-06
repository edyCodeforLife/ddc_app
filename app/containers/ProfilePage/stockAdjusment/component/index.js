import React from 'react';
import { Row, Col, Icon } from 'antd';

const labelStyle = {
  fontSize: 10,
  color: '#8c8c8c',
};

const badgeStyle = {
  marginTop: 5,
  padding: 5,
  fontSize: 10,
  color: 'rgb(245, 130, 31)',
  borderRadius: 3,
  backgroundColor: 'rgba(245, 130, 31, 0.05)',
  border: 'solid 0.5px rgb(245, 130, 31)',
};

const TransactionCard = (props) => (
  <div
    style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
      padding: 15,
    }}
  >
    <Row type="flex" align="middle" justify="space-between">
      <Col>
        <div style={labelStyle}>No. Order</div>
        <div style={{ fontSize: 12 }}>00146633</div>
        <div style={badgeStyle}>Menunggu Pembayaran</div>
      </Col>
      <Col>
        <Icon
          type="right"
          style={{ fontSize: 16, color: 'rgb(140, 140, 140)' }}
        />
      </Col>
    </Row>
  </div>
);

export default TransactionCard;
