import React from 'react';
import { PropTypes } from 'prop-types';
import { Divider } from 'antd';
import NumberFormat from 'react-number-format';

const ShippingInformation = (props) => (
  <div
    className="mt-3"
    style={{
      marginLeft: -15,
      marginRight: -15,
      padding: 15,
      backgroundColor: '#f0f0f0',
      minHeight: 200,
    }}
  >
    <div className="my-3">
      <div className="my-1 text-label">Dikirim oleh</div>
      <div className="my-1 font-weight-bold" style={{ height: 10 }}>
        {props.order.originBranch.name}
      </div>
    </div>
    <div className="my-3">
      <div className="my-1 text-label">Kurir</div>
      <div className="my-1 font-weight-bold" style={{ height: 10 }}>
        {props.order.isFreeShipping
          ? 'Dari Pihak Pengirim'
          : props.order.courier.shippingName}
        {props.order.subtotalPrice >= 6000000 && !props.order.isFreeShipping
          ? 'Dari Pihak Pengirim'
          : ''}
      </div>
    </div>
    <div className="my-3">
      <div className="my-1 text-label">Biaya Kirim</div>
      <div className="my-1 font-weight-bold" style={{ height: 10 }}>
        {props.order.originBranch.id &&
        props.order.subtotalPrice >= 6000000 &&
        !props.order.isFreeShipping ? (
          <u>Dalam Perhitungan</u>
        ) : !props.order.isFreeShipping ? (
          <NumberFormat
            value={props.order.shippingCost}
            displayType={'text'}
            thousandSeparator
            prefix={'Rp. '}
          />
        ) : (
          <u>Gratis</u>
        )}
      </div>
    </div>
    <div className="my-3">
      <div className="my-1 text-label">Estimasi Pengiriman</div>
      <div className="my-1 font-weight-bold" style={{ height: 10 }}>
        {props.order.originBranch.id &&
        props.order.subtotalPrice >= 6000000 &&
        !props.order.isFreeShipping
          ? '-'
          : props.order.courier.etd}

        {(props.order.courier.shippingName === 'Tiki' ||
          props.order.courier.shippingName === 'Sicepat') &&
          ' Hari'}

        {props.order.isFreeShipping ? '3-5 Hari' : null}
      </div>
    </div>

    <Divider className="my-3 deviderLine" />

    {props.order.subtotalPrice >= 6000000 ? (
      <ul className="text-label">
        <li>
          Untuk pembelanjaan diatas 6 juta, pengiriman dan kurir (jasa
          ekspedisi) akan ditentukan dari pihak kami
        </li>
        <li>
          Untuk pengiriman kurir (jasa ekspedisi) mungkin akan dikenakan Pph 23
          pada invoice dan ekspedisi.
        </li>
      </ul>
    ) : (
      <ul className="text-label">
        <li>Belum termasuk persiapan dan pengemasan barang 1-2 hari kerja.</li>
        <li>
          Untuk barang yang tidak ready stock, membutuhkan waktu 2-5 hari kerja.
        </li>
      </ul>
    )}
  </div>
);

ShippingInformation.propTypes = {
  order: PropTypes.object,
};

export default ShippingInformation;
