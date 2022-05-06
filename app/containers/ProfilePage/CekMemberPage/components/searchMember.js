import React from 'react';
import { Row, Col, Button } from 'antd';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';

const searchPageComponent = (props) =>
  props.member && props.member.TotalBalance !== null ? (
    <div className="view__saldo-member">
      <Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          className="header__level-class"
        >
          <Col span={24}>
            <span className="saldo__page-member-label">Saldo Anda :</span>{' '}
            <span className="saldo__page-member">
              {
                <NumberFormat
                  value={props.member.TotalBalance}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              }
            </span>
          </Col>
        </Row>
        <div className="saldo__member-now">Ketentuan Penarikan Saldo</div>
        <ul type="circle">
          <li className="list-requirment">Minimum Penarikan Saldo 15.000</li>
          <li className="list-requirment">Penarikan akan diproses 2x24 jam</li>
        </ul>
        <div style={{ paddingTop: 15, padding: '0px 15px' }}>
          <NavLink to="saldo/tarik-saldo">
            <Button className="btn-block" type="primary" htmlType="button">
              Tarik Saldo
            </Button>
          </NavLink>
        </div>
      </Row>
    </div>
  ) : null;
export default searchPageComponent;
