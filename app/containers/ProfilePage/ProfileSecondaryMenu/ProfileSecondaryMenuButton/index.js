import React from 'react';
import { Row, Col, Switch } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomSVG from '../../../../components/CustomSVG';

const SecondaryMenuButton = (props) => {
  let onClick = null;
  if (props.props.onClickLogout) {
    onClick = props.props.onClickLogout;
  } else if (props.props.onClickRequestTDS) {
    onClick = props.props.onClickRequestTDS;
  }
  return (
    <Row
      type="flex"
      align="middle"
      justify="space-between"
      style={{
        border: '0.1px solid rgba(220, 220, 220, 0.51)',
        borderColor: '0.5px solid rgba(220, 220, 220, 0)',
        backgroundColor: '#fffff',
        height: 50,
      }}
      onClick={onClick}
    >
      <Col style={{ paddingTop: 10, paddingBottom: 10 }}>
        <CustomSVG
          name={props.props.icon}
          style={{ marginLeft: 15, marginRight: 15, height: 30, width: 30 }}
        />
        <span className="ddc_default_font_color">{props.props.label}</span>
      </Col>
      <Col style={{ paddingRight: 10 }}>
        {/* BEGIN Waiting Request TDS */}
        {props.props.showStatusRequestTDS && (
          <span
            className="ddc_default_font_color"
            style={{
              fontSize: 10,
              color: '#ffffff',
              backgroundColor: '#16b8b2',
              padding: 5,
              borderRadius: 20,
            }}
          >
            Menunggu
          </span>
        )}
        {/* END Waiting Request TDS */}

        {/* BEGIN Open Close TDS */}
        {props.props.showStoreOpen && (
          <Switch
            style={{ width: 65 }}
            checkedChildren={'Aktif'}
            unCheckedChildren={'Tidak'}
            onChange={props.props.onChangeOpenCloseStore}
            checked={props.props.storeIsOpen}
          />
        )}
        {/* END Open Close TDS */}
      </Col>
    </Row>
  );
};

const ProfileSecondaryMenuButton = (props) =>
  props.link ? (
    <NavLink to={props.link}>
      <SecondaryMenuButton props={props} />
    </NavLink>
  ) : (
    <SecondaryMenuButton props={props} />
  );

export default ProfileSecondaryMenuButton;
