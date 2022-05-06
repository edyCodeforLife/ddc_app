import React from 'react';
import { Row, Col } from 'antd';

const headerStyle = {
  height: 50,
  backgroundColor: '#505050',
  color: '#ffffff',
  fontSize: 14,
  paddingLeft: 15,
};

const DarkTitle = (props) => (
  <Row type="flex" align="middle" style={headerStyle}>
    <Col>
      <span>{props.title}</span>
      <span>{props.children}</span>
    </Col>
  </Row>
);
// props.show ? <div className="backdrop" onClick={props.clicked} /> : null;

export default DarkTitle;
