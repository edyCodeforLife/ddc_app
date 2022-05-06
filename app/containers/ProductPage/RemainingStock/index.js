import React from 'react';
import { Row } from 'antd';

const RemainingStock = (props) =>
  props.quantity > 0 && (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="font-weight-bold"
      style={{
        backgroundColor: '#f5f5f5',
        fontSize: 12,
        height: 40,
      }}
    >
      Produk ini tinggal {props.quantity} lagi stoknya
    </Row>
  );

export default RemainingStock;
