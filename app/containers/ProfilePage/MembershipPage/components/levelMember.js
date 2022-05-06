import React from 'react';
import { Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
moment.locale('id');

const LevelMember = (props) => (
  <div className="view__level-member">
    <Row>
      <Row
        type="flex"
        justify="start"
        align="middle"
        className="header__level-class"
      >
        <Col span={24}>
          <span className="saldo__page-member-label">Level Anda :</span>{' '}
          <span className="saldo__page-member">{props.member.memberLevelName}</span>
        </Col>
      </Row>
      <div className="status__member-now">Status Member</div>
      <div style={{ overflowX: 'auto', padding: '0px 15px' }}>
        <div className="level__table">
          <table>
            <tr>
              <th>Bergabung</th>
              <th>Berakhir</th>
            </tr>
            <tr>
              <td>{moment(props.member.createAt).format('LL')}</td>
              <td>{moment(props.member.expiredDate).format('LL')}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="status__member-now">Masa Aktif Diskon</div>
      <div style={{ overflowX: 'auto', padding: '0px 15px' }}>
        <div className="level__table">
          <table>
            <tr>
              <th>Berlaku</th>
              <th>Berakhir</th>
            </tr>
            <tr>
              <td>{moment(props.member.memberLevelStartDate).format('LL')}</td>
              <td>{moment(props.member.memberLevelEndDate).format('LL')}</td>
            </tr>
          </table>
        </div>
        <div style={{ paddingTop: 15, paddingBottom:10 }}>
          <NavLink to="membership/perpanjang">
          <Button className="btn-block" type="primary" htmlType="button">
            Perpanjang
          </Button>
            </NavLink>
        </div>
      </div>
    </Row>
  </div>
);

export default LevelMember;
