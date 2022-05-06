import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';

import CustomSVG from '../../../CustomSVG';

const NavigationItem = (props) => (
  <li className="navigationItem">
    <NavLink
      to={props.link}
      exact={props.exact}
      // activeClassName={classes.active}
    >
      <Row type="flex" align="middle">
        <Col span={5}>
          <CustomSVG
            name={props.icon}
            style={{ height: 30, width: 30 }}
          />
        </Col>
        <Col span={19}>
          <span>{props.children}</span>
        </Col>
      </Row>
    </NavLink>
  </li>
);

export default NavigationItem;
