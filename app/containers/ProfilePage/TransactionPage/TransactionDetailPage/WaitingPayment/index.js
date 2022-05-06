import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import Countdown from 'react-countdown-now';
import NumberFormat from 'react-number-format';

import OrderStep from '../OrderStep';
import constant from './../../../../../utils/configs/constant';

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => (
  <div>
    <span>{days}</span>
    <span style={{ margin: '0px 3px' }}>hari</span>
    <span>{hours}</span>
    <span style={{ margin: '0px 3px' }}>jam</span>
    <span>{minutes}</span>
    <span style={{ margin: '0px 3px' }}>menit</span>
    <span>{seconds}</span>
    <span style={{ margin: '0px 3px' }}>detik</span>
  </div>
);

const PaymentInformation = (props) => {
  let paymentWaitDays = constant.CONFIG_ORDER.PAYMENT_COUNTDOWN.VA;
  if (props.paymentMethodId === 1) {
    // If Bank Transfer
    paymentWaitDays = constant.CONFIG_ORDER.PAYMENT_COUNTDOWN.MANUAL_TRANSFER;
  }

  let value = props.value;
  if (props.isCountdown) {
    value = new Date(props.value);
    value.setDate(value.getDate() + paymentWaitDays);
  }
  return (
    <Row type="flex" justify="space-between">
      <Col span={10}>
        <Row type="flex" justify="space-between">
          <Col>{props.label}</Col>
          <Col>:</Col>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: 5 }}>
        <span style={{ fontWeight: 'bold' }}>
          {props.isCountdown ? (
            <span className="font-color-red">
              <Countdown date={new Date(value)} renderer={renderer} />
            </span>
          ) : (
            value
          )}
        </span>
      </Col>
    </Row>
  );
};

const WaitingPayment = (props) => (
  <div
    style={{
      fontSize: 12,
      marginBottom: 10,
      padding: 15,
      backgroundColor: '#ffffff',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    }}
  >
    <div
      style={{
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 30,
      }}
    >
      <OrderStep step={1} />
    </div>
    <PaymentInformation
      label={'Order Pembayaran'}
      value={props.transaction.paymentNumber}
    />
    <PaymentInformation
      label={'Status'}
      value={props.transaction.isConfirmation === 1 ? 'Menunggu Approval' :
      props.transaction.orderStatusName}
    />
    {props.transaction.isConfirmation === 0 ? (
      <PaymentInformation
        className="font-color-red"
        label={'Batas Pembayaran'}
        value={props.transaction.createAt}
        paymentMethodId={props.transaction.paymentMethodId}
        isCountdown
      />
    ) : null}
    {props.transaction.paymentMethodId === 1 && props.transaction.isConfirmation === 0 && (
    <div className="text-center font-weight-bold" style={{ marginTop: 30 }}>
      <NumberFormat
        value={props.transaction.totalPrice}
        displayType={'text'}
        thousandSeparator
        prefix={'Rp '}
        style={{
          border: 'solid 1px',
          borderRadius: 3,
          fontSize: 18,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      />
    </div>
      )}
    {props.transaction.paymentMethodId === 3 && (
      // Credit Card
      <div style={{ marginTop: 30 }}>
        Menunggu konfirmasi pembayaran dari Kartu Kredit.
      </div>
    )}

    {props.transaction.paymentMethodId !== 3 && props.transaction.isConfirmation === 0 && (
      <React.Fragment>
        <div style={{ marginTop: 30 }}>
          Pembayaran dapat dilakukan ke rekening berikut:
        </div>

        <Divider className="my-4 deviderLine" />

        <div>
          <Row type="flex" align="middle" justify="space-between">
            {props.transaction.orderStatusId === 1 && props.transaction.paymentMethodId === 2 ? (
              <img
                src={props.transaction.bankImage}
                alt={props.transaction.bankAccountName}
                style={{ maxWidth: '95px', maxHeight: '50px', marginRight: 10 }}
              />) : (
              <img
                src={props.transaction.bankImage}
                alt={props.transaction.bankAccountName}
                style={{ maxWidth: 200, marginRight: 10 }}
              />
              )}
            {props.transaction.orderStatusId === 1 && props.transaction.paymentMethodId === 2 ? (
              <Col>
                <div>{props.transaction.bankBranchName}</div>
                <div style={{fontSize: '16px'}}>{`${props.transaction.bankName} Virtual Account`}</div>
                <div className="font-weight-bold">
                  {props.transaction.bankAccountNumber}
                </div>
              </Col>
            ) : (
              <Col>
                <div>{props.transaction.bankBranchName}</div>
                <div>a/n {props.transaction.bankAccountName}</div>
                <div className="font-weight-bold">
                  {props.transaction.bankAccountNumber}
                </div>
              </Col>
            )
          }

          </Row>
        </div>
      </React.Fragment>
    )}

    {/* BEGIN Show Konfirmasi only for Transfer Manual */}
    {props.transaction.paymentMethodId === 1 && props.transaction.isConfirmation === 0 && (
      <React.Fragment>
        <Divider className="my-4 deviderLine" />

        <div style={{ fontStyle: 'italic' }}>
          <div className="font-weight-bold">*Catatan:</div>
          <div>
            Usai melakukan pembayaran, diharapkan segera untuk melakukan{' '}
            <NavLink
              to="/konfirmasi-pembayaran"
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Konfirmasi Pembayaran
            </NavLink>{' '}
            agar pesanan Anda dapat di proses.
          </div>
        </div>
      </React.Fragment>
    )}
    {/* END Show Konfirmasi only for Transfer Manual */}
  </div>
);

export default WaitingPayment;
