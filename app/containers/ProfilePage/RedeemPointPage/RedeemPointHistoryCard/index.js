import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon, Button } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const RedeemPointHistoryCard = (props) => (
  <div
    className="box-shadow"
    style={{
      backgroundColor: '#ffffff',
      padding: 15,
    }}
  >
    <div>
      <div className="text-label font-color-gray">Tanggal</div>
      <div className="text-label">
        {moment(props.history.createAt).format('DD MMMM YYYY hh:mm')} WIB
      </div>
    </div>
    <div className="mt-15">
      <div className="text-label font-color-gray">Didapat Melalui</div>
      {props.history.paymentNumber === '' ? (
        <div className="text-label">{props.history.pointRuleName}</div>
      ) : (
        <React.Fragment>
        <div className="text-label">
          {props.history.pointRuleName} <strong>{'#'} {props.history.paymentNumber}</strong>
        </div>
          <div className="text-label">
          Subtotal :{' '}
          <NumberFormat
            value={props.history.subTotal}
            displayType={'text'}
            thousandSeparator
            prefix={'Rp '}
          />
        </div>
        </React.Fragment>
      )}
    </div>
    <div className="mt-15">
      <div className="text-label font-color-gray">Jumlah Poin</div>
      <div className="text-label">{props.history.point}</div>
    </div>
    <div className="mt-15">
      <div className="text-label font-color-gray">Poin Sebelumnya</div>
      <div className="text-label">{props.history.previousTotalPoint}</div>
    </div>
  </div>
);

export default RedeemPointHistoryCard;
