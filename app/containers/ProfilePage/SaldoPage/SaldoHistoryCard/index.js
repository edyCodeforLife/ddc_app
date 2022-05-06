import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon, Button } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const SaldoHistoryCard = (props) => (
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
        {moment(props.saldo.createAt).format('DD MMMM YYYY HH:mm')} WIB
      </div>
    </div>
    {props.type === 'in' && (
      <React.Fragment>
        <div className="mt-15">
          <div className="text-label font-color-gray">Didapat Melalui</div>
          <div className="text-label">
            Order pesanan{' '}
            <span className="font-weight-bold">
              <u>{props.saldo.paymentNumber}</u>
            </span>
          </div>
          <div className="text-label">
            Subtotal :{' '}
            <NumberFormat
              value={props.saldo.balance}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp '}
            />
          </div>
        </div>

        <div className="mt-15">
          <div className="text-label font-color-gray">Saldo Sebelumnya</div>
          <div className="text-label">
            <NumberFormat
              value={props.saldo.totalSubBalance - props.saldo.balance}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp '}
            />
          </div>
        </div>
      </React.Fragment>
    )}

    {props.type === 'out' && (
      <React.Fragment>
        <div className="mt-15">
          <div className="text-label font-color-gray">Jumlah Penarikan</div>
          <div className="text-label">
            <NumberFormat
              value={props.saldo.balance}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp '}
            />
          </div>
        </div>

        <div className="mt-15">
          <div className="text-label font-color-gray">Rekening Tujuan</div>
          <div className="text-label" />
          {props.saldo.accountNumber} {'a/n'} {props.saldo.accountName}
        </div>
        <div className="text-label" >
          {props.saldo.bankName}
        </div>
      </React.Fragment>
    )}
  </div>
);

export default SaldoHistoryCard;
