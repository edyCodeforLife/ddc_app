import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import CustomSVG from '../../../../components/CustomSVG';

const ProfileMenuButton = (props) => (
  <Col
    span={props.span}
    style={{
      // border: 'solid 0.1px rgb(220, 220, 220, 0.20)',
      // border: '0.1px solid',
      border: '0.1px solid rgba(220, 220, 220, 0.51)',
      borderColor: '0.5px solid rgba(220, 220, 220, 0)',
      backgroundColor: '#fffff',
    }}
  >
    <Link to={props.link}>
      <Row span={24} type="flex" align="middle" style={{ height: 80 }}>
        <CustomSVG
          name={props.icon}
          style={{ marginLeft: 15, marginRight: 15, height: 30, width: 30 }}
        />
        <div className="ddc_default_font_color">{props.label}</div>
      </Row>
    </Link>
  </Col>
);

export default ProfileMenuButton;
