import React from 'react';
import { Row, Col } from 'antd';

const headerStyle = {
  height: 86,
  backgroundColor: '#505050',
  color: '#ffffff',
  fontSize: 12,
};
const fontStyle = {
  color: '#f0f0f0',
  fontSize: 12,
  fontWeight: 'normal',
};

const DarkRedeemPoint = (props) => (
  <Row type="flex" align="middle" style={headerStyle} justify="space-between">
    <Col span={24} className="pointRedeem_header" style={{ marginLeft: 15 }}>
      <Col span={11} style={fontStyle}>
        <div>
          {props.titleFirst}
          <br />
          {props.titleLast}
        </div>
        <div
          className="font-weight-bold"
          style={{
            color: '#fff',
            fontWeight: 'bold',
            paddingTop: 7,
            fontSize: 14,
          }}
        >
          {props.countPoint}
        </div>
      </Col>
      <Col span={2}>
        <div style={{ width: 1, height: 60, border: 'solid 1px #979797' }} />
      </Col>
      <Col span={11} style={fontStyle}>
        <div>
          {props.estimasiFirst}
          <br />
          {props.estimasiLast}
        </div>
        <div
          className="font-weight-bold"
          style={{ color: '#fff', paddingTop: 7, fontSize: 14 }}
        >
          {props.estimasiCountPoint}
        </div>
      </Col>
    </Col>
  </Row>
);
// props.show ? <div className="backdrop" onClick={props.clicked} /> : null;

export default DarkRedeemPoint;
