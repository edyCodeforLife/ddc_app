import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const labelStyle = {
  fontSize: 10,
  color: '#8c8c8c',
};

const badgeStyle = {
  marginRight: 5,
  padding: 5,
  fontSize: 10,
  color: 'rgb(245, 130, 31)',
  borderRadius: 3,
  backgroundColor: 'rgba(245, 130, 31, 0.05)',
  border: 'solid 0.5px rgb(245, 130, 31)',
};

const Bagde = (props) =>
  props.count > 0 && (
    <span style={badgeStyle}>
      {props.label} {props.label != 'Menunggu Pembayaran' && `(${props.count})`}
    </span>
  );

const TransactionCard = (props) => {
  const statuses = _.countBy(props.transaction.orderDetail, 'orderStatusName');
  const statusArray = _.map(_.toPairs(statuses), (d) => _.fromPairs([d]));

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
        padding: 15,
      }}
    >
      <NavLink to={`/profil/transaksi/${props.transaction.uuid}`}>
        <Row type="flex" align="middle" justify="space-between">
          <Col>
            <div style={labelStyle}>No. Order Pembayaran</div>
            <div className="ddc_default_font_color" style={{ fontSize: 12 }}>
              {props.transaction.paymentNumber}
            </div>
            <div className="font-size-smaller font-color-gray">
              {moment(props.transaction.createAt).format('D MMM, HH : mm')}
            </div>
            <div style={{ marginTop: 5 }}>
              {statusArray.map((status) => (
                <Bagde
                  key={Object.keys(status)}
                  label={Object.keys(status)}
                  count={status[Object.keys(status)]}
                />
              ))}
            </div>
          </Col>
          <Col>
            <Icon
              type="right"
              style={{ fontSize: 16, color: 'rgb(140, 140, 140)' }}
            />
          </Col>
        </Row>
      </NavLink>
    </div>
  );
};

export default TransactionCard;
