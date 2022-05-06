import React from 'react';
import { Row, Col, Icon } from 'antd';
import NumberFormat from 'react-number-format';
import CustomProfileImage from '../../../components/CustomProfileImage';
import { NavLink } from 'react-router-dom';

const labelStyle = {
  fontSize: 10,
  color: '#8c8c8c',
};

const valueStyle = {
  fontSize: 16,
  fontWeight: 'bold',
};

const columnStyle = {
  height: 60,
  padding: '10px 15px',
  // border: 'solid 0.5px rgb(220, 220, 220, 0.2)',
  // border: '0.1px solid rgba(220, 220, 220, 0.51)',
  // borderColor: 'rgba(220, 220, 220, 1)',
};
const userNameStyle = {
  border: '1px solid #cccccc1c',
  height: 60,
  padding: '10px 15px',
};
const borderProfil = {
  border: '0.1px solid rgba(220, 220, 220, 0.51)',
  // borderColor: '0.5px solid rgba(220, 220, 220, 0)',
};

const HalfBlock = (props) => (
  <Row
    className="ddc_default_font_color"
    type="flex"
    align="middle"
    justify="space-between"
  >
    <Col>
      <div style={labelStyle}>{props.label}</div>
      <div className={props.className} style={valueStyle}>
        {props.isNumber ? (
          <NumberFormat
            value={props.value}
            displayType={'text'}
            thousandSeparator
            prefix={'Rp '}
          />
        ) : (
          props.value
        )}
      </div>
    </Col>
    <Col>
      <Icon
        type="right"
        style={{ fontSize: 16, color: 'rgb(140, 140, 140)' }}
      />
    </Col>
  </Row>
);

const ProfileSummary = (props) => (
  <div
    style={{
      backgroundColor: '#ffffff',
      // boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    }}
  >
    {props.member.memberTypeName !== 'Member Non Reseller' &&
      props.member.trial === 0 && (
        <Row>
          <Col span={12} style={columnStyle}>
            {/* Display Level Name */}
            <NavLink to="profil/membership" className="ddc_default_font_color">
              <HalfBlock label="Level" value={props.member.memberLevelName} />
            </NavLink>
          </Col>
          <Col span={12} style={columnStyle}>
            {/* Display Poin */}
            <NavLink to="profil/tukar-poin">
              <HalfBlock
                label="Poin"
                value={props.member.memberPoint}
                className={
                  props.member.memberPointLock >= props.member.memberPoint
                    ? 'font-color-red'
                    : 'ddc_default_font_color'
                }
              />
            </NavLink>
          </Col>
        </Row>
      )}

    {/* BEGIN Display Saldo */}
    {(props.member.memberLevelName === 'Prioritas' ||
      props.member.memberTypeName === 'TDS') && (
      <Row style={borderProfil}>
        <Col span={24} style={columnStyle}>
          <NavLink to="profil/saldo" className="ddc_default_font_color">
            <HalfBlock
              label="Saldo"
              value={props.member.totalBalance}
              isNumber
            />
          </NavLink>
        </Col>
      </Row>
    )}
    {/* END Display Saldo */}

    {/* BEGIN Display Member Name */}
    <Row type="flex" align="middle" style={userNameStyle}>
      <Col>
        <div className="wrap mr-1">
          {props.member.image !== '' ? (
            <CustomProfileImage
              style={{
                backgroundImage: `url(${props.member.image})`,
              }}
              className="style__profil-global"
            />
          ) : (
            <CustomProfileImage
              style={{ background: '#e1e1e1' }}
              className="style__profil-global"
            />
          )}
        </div>
      </Col>
      <Col>
        {props.member.firstName}
        &nbsp;
        {props.member.lastName}
      </Col>
    </Row>
    {/* BEGIN Display Member Name */}
  </div>
);

export default ProfileSummary;
