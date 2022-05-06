import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Divider, Button } from 'antd';
import Moment from 'react-moment';
import { Countdown } from 'react-countdown-now';

import OrderStep from '../OrderStep';
import TrackingTable from './TrackingTable';

const PaymentInformation = (props) => {
  let value = props.value;
  if (props.isCountdown) {
    value = new Date(props.value);
    value.setDate(value.getDate() + 1); // Add 1 day
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
            <Countdown date={new Date(value)} renderer={renderer} />
          ) : (
            value
          )}
        </span>
      </Col>
    </Row>
  );
};

const OrderDescription = (props) => {
  if (props.orderStatusId === 2) {
    return (
      // Pembayaran Diterima
      <div>
        <div>
          Selamat, pembayaran Anda telah dikonfirmasi dan diterima oleh Kami
          pada:
        </div>

        <p className="font-weight-bold">
          <Moment format="dddd DD MMMM YYYY">
            {props.transaction.paymentDate}
          </Moment>
          <span>
            ,&nbsp;pukul&nbsp;
            <Moment format="HH:MM">{props.transaction.paymentDate}</Moment>
            &nbsp;WIB.
          </span>
        </p>
        <div>
          Terima kasih atas kepercayaan Anda telah berbelanja di Dusdusan.com
        </div>
      </div>
    );
  } else if (props.orderStatusId === 3) {
    return (
      // 3 = Pesanan Diproses
      <div>
        Selamat, pesanan Anda sedang di proses dan akan siap untuk dikirim.
      </div>
    );
  } else if (props.orderStatusId === 4 || props.orderStatusId === 6) {
    return (
      // Pesanan Dikirim
      <React.Fragment>
        <div>
          Selamat, pesanan Anda sudah dikirim pada:
          <div className="font-weight-bold">
            <Moment format="dddd DD MMMM YYYY">
              {props.transaction.paymentDate}
            </Moment>
            <span>
              ,&nbsp;pukul&nbsp;
              <Moment format="HH:MM">{props.transaction.paymentDate}</Moment>
              &nbsp;WIB.
            </span>
          </div>
        </div>
        <div className="mt-20">
          <PaymentInformation
            label={'Jasa Pengiriman'}
            value={props.order.shippingName}
          />
          <PaymentInformation
            label={'No. Resi'}
            value={props.order.resiNumber}
          />
          <PaymentInformation
            label={'Tujuan'}
            value={props.order.addressDestination}
          />
          <PaymentInformation
            label={'Status'}
            value={
              props.order.orderStatusId === 6
                ? 'Sampai Tujuan'
                : 'Dalam Perjalanan'
            }
          />
        </div>
        <div>
          <Divider className="mt-20" />
          <div className="my-20 font-weight-bold font-size-normal">
            Histori Pengiriman
          </div>
          <div>
            <TrackingTable trackings={props.trackings[props.order.id]} />
          </div>
        </div>
        {props.orderStatusId === 4 && (
          <div>
            <Button
              className="mt-20 btn-block"
              type="primary"
              onClick={() => props.onClickOrderDelivered(props.order.uuid, 6)}
            >
              Konfirmasi Pesanan Sampai
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  } else if (props.orderStatusId === 7) {
    return (
      // 7 = Persiapan Barang
      <div>Pesanan Anda sedang di persiapkan.</div>
    );
  } else if (props.orderStatusId === 8) {
    return (
      // 8 = Barang Siap Diambil
      <div>
        <div>
          Selamat, pesanan barang Anda kini sudah siap untuk diambil di:
        </div>
        <div className="mt-15 order__delivery__member__address">
          <div className="font-weight-bold">{props.order.branchNameOrigin}</div>
          <div className="font-weight-bold">{props.order.phoneOrigin}</div>
          <br />
          <div>{props.order.addressOrigin}</div>
        </div>
        <div>
          <Button
            className="mt-20 btn-block"
            type="primary"
            onClick={() => props.onClickOrderDelivered(props.order.uuid, 9)}
          >
            Konfirmasi Pesanan Diambil
          </Button>
        </div>
      </div>
    );
  } else if (props.orderStatusId === 9) {
    return (
      // 9 = Telah Diambil
      <div>
        <div>Selamat, barang Anda telah diambil di:</div>
        <div className="mt-15 order__delivery__member__address">
          <div className="font-weight-bold">{props.order.branchNameOrigin}</div>
          <div className="font-weight-bold">{props.order.phoneOrigin}</div>
          <br />
          <div>{props.order.addressOrigin}</div>
        </div>
      </div>
    );
  } else if (props.orderStatusId === 10) {
    return (
      // 10 = Dibatalkan oleh Sistem
      <div>
        <p>
          Mohon maaf, pesanan Anda telah dibatalkan oleh sistem karena batas
          waktu konfirmasi pesanan yang diberikan ke TDS sudah habis.
        </p>
        <p>
          Untuk itu, Kami akan mentransfer uang kembali ke rekening Anda
          berdasarkan order dan nominalnya. Silahkan untuk order kembali.
        </p>
        <p>
          Jika ada masalah atau pertanyaan yang ingin diajukan, silahkan hubungi
          kami.
        </p>
      </div>
    );
  } else if (props.orderStatusId === 11) {
    return (
      // 11 = Dibatalkan oleh Admin
      <div>
        <p>
          Mohon maaf, pesanan Anda telah dibatalkan oleh Admin Kami. Periksa
          kembali barang pesanan Anda dan nominal transaksi pembayaran Anda.
        </p>
        <p>
          Jika ada masalah atau pertanyaan yang ingin diajukan, silahkan hubungi
          kami.
        </p>
      </div>
    );
  } else if (props.orderStatusId === 13) {
    return (
      // 11 = Dibatalkan oleh User
      <div>
        <p>
          Mohon maaf, pesanan Anda telah ditolak dengan alasan sebagai berikut:
        </p>
        <div className="box-shadow border-radius font-size-normal p-15">
          {/* <div>{props.order.branchNameOrigin}</div> */}
          <div>{props.order.reason}</div>
        </div>
        <p className="mt-15">
          Untuk itu, Kami akan mentransfer uang kembali ke rekening Anda
          berdasarkan order dan nominalnya. Silahkan untuk{' '}
          <u className="font-weight-bold" style={{ color: '#16b8b2' }}>
            order kembali
          </u>
          .
        </p>
        <p>
          Jika ada masalah atau pertanyaan yang ingin diajukan, silahkan hubungi
          kami.
        </p>
      </div>
    );
  }
  return null;
};

const OrderCard = (props) => (
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
      <OrderStep
        deliveryMethod={props.order.deliveryMethod}
        step={props.order.orderStatusId}
      />
    </div>
    <PaymentInformation
      label={'Order Pembayaran'}
      value={props.transaction.paymentNumber}
    />
    <PaymentInformation label={'Order ID'} value={props.order.orderNumber} />
    <PaymentInformation
      label={'Nomor Tagihan'}
      value={props.order.invoiceNumber}
    />
    <PaymentInformation label={'Status'} value={props.order.orderStatusName} />

    <div style={{ marginTop: 20 }}>
      <OrderDescription
        orderStatusId={props.order.orderStatusId}
        // orderStatusId={11}
        order={props.order}
        transaction={props.transaction}
        trackings={props.trackings}
        onClickOrderDelivered={props.onClickOrderDelivered}
      />
    </div>
  </div>
);

OrderCard.propTypes = {
  order: PropTypes.object,
  transaction: PropTypes.object,
  orderStatusId: PropTypes.number,
};

OrderDescription.propTypes = {
  order: PropTypes.object,
  transaction: PropTypes.object,
  orderStatusId: PropTypes.number,
};

export default OrderCard;
