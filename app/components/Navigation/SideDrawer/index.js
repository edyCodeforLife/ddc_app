import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import Backdrop from './../../UI/Backdrop/Backdrop';
import NavigationItems from './../NavigationItems';
import CustomProfileImage from '../../CustomProfileImage';
import FooterHelper from '../../FooterHelper';

const SideDrawer = (props) => {
  let attachedClasses = ['sideDrawer', 'sideDrawer__menu--close'];
  if (props.open) {
    attachedClasses = ['sideDrawer', 'sideDrawer__menu--open'];
  }
  const perfectScrollbarOption = { suppressScrollX: true };

  const remainingTrialDay = () => {
    if (props.authentication.member.trialEndDate) {
      const currentDate = moment();
      const expiredDate = moment(props.authentication.member.trialEndDate);
      const diffDate = moment(expiredDate - currentDate).format('D');
      return diffDate;
    }
    return 0;
  };

  return (
    <div>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <PerfectScrollbar option={perfectScrollbarOption}>
          <nav onClick={props.closed}>
            <div className="sideDrawer__menu title font-weight-bold">Menu</div>
            {props.authentication.isAuthenticated && (
              <React.Fragment>
                <div>
                  <NavLink to="/profil">
                    <Row className="ddc_default_font_color">
                      <Col span={6}>
                        <div className="wrap">
                          {props.authentication.member.image !== '' ? (
                            <CustomProfileImage
                              style={{
                                backgroundImage: `url(${
                                  props.authentication.member.image
                                })`,
                              }}
                              className="style__profil-global"
                            />
                          ) : (
                            <CustomProfileImage
                              style={{
                                background: '#e1e1e1',
                              }}
                              className="style__profil-global"
                            />
                          )}
                        </div>
                      </Col>
                      <Col span={18}>
                        <div className="font-weight-bold">
                          {props.authentication.member.firstName}{' '}
                          {props.authentication.member.lastName}
                        </div>
                        {(props.authentication.member.trial == 0 &&
                          props.authentication.member.memberTypeName ===
                            'Reseller') ||
                        props.authentication.member.memberTypeName === 'TDS' ? (
                          <React.Fragment>
                            <Row>
                              <Col span={12}>
                                <div style={{ fontSize: 10 }}>Level</div>
                                <div
                                  className="font-weight-bold"
                                  style={{ fontSize: 12 }}
                                >
                                  {props.authentication.member.memberLevelName}
                                </div>
                              </Col>
                              <Col span={12}>
                                <div style={{ fontSize: 10 }}>Poin</div>
                                <div
                                  className={
                                    props.authentication.member
                                      .memberPointLock >=
                                    props.authentication.member.memberPoint
                                      ? 'font-weight-bold font-color-red'
                                      : 'font-weight-bold ddc_default_font_color'
                                  }
                                  style={{ fontSize: 12 }}
                                >
                                  {props.authentication.member.memberPoint}
                                </div>
                              </Col>
                            </Row>
                            {props.authentication.member.memberTypeName ===
                              'TDS' && (
                              <Row>
                                <Col>
                                  <div style={{ fontSize: 10 }}>Saldo</div>
                                  <div
                                    className="font-weight-bold"
                                    style={{ fontSize: 12 }}
                                  >
                                    <NumberFormat
                                      value={
                                        props.authentication.member.totalBalance
                                      }
                                      displayType={'text'}
                                      thousandSeparator
                                      prefix={'Rp '}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <div style={{ fontSize: 10 }}>Keanggotaan</div>
                            <div
                              className="font-weight-bold"
                              style={{ fontSize: 12 }}
                            >
                              {props.authentication.member.trial ? (
                                <div>
                                  <span>Reseller Trial</span>
                                  <span
                                    className="font-weight-normal font-color-orange font-size-smaller"
                                    style={{
                                      backgroundColor: '#f5821f0c',
                                      padding: 5,
                                      marginLeft: 10,
                                      border: 'solid 0.5px #f5821f',
                                    }}
                                  >
                                    {remainingTrialDay()} Hari
                                  </span>
                                </div>
                              ) : (
                                props.authentication.member.memberTypeName
                              )}
                            </div>
                          </React.Fragment>
                        )}
                      </Col>
                    </Row>
                  </NavLink>
                  <Divider className="my-2 deviderLine" />
                </div>
              </React.Fragment>
            )}
            <NavigationItems authentication={props.authentication} />
          </nav>
          <FooterHelper />
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default SideDrawer;
