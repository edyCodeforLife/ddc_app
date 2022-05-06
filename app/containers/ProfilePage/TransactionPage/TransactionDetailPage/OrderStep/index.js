/**
 * OrderStep
 * deliveryMethod = Ambil Sendiri, Kirim Alamat
 */

import React from 'react';
import { Row } from 'antd';

import CustomSVG from '../../../../../components/CustomSVG';

const svgStyle = {
  zIndex: 1,
};

const OrderStep = (props) => (
  <Row
    className="wrapStepper"
    type="flex"
    align="middle"
    justify="space-between"
  >
    {props.step === 1 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pembayaran-diterima-pending'}
        />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diproses-pending'}
        />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 2 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diproses-pending'}
        />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 3 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 4 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 5 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 6 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diterima'} />
      </React.Fragment>
    )}

    {props.step === 7 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-persiapan-barang-pending'}
        />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 8 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG style={svgStyle} name={'ic-steps-persiapan-barang'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {props.step === 9 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diproses'} />
        <CustomSVG style={svgStyle} name={'ic-steps-persiapan-barang'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-diterima'} />
      </React.Fragment>
    )}

    {/* Dibatalkan Sistem */}
    {props.step === 10 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-filed'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pembayaran-diterima-pending'}
        />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diproses-pending'}
        />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {/* Dibatalkan Admin */}
    {props.step === 11 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-filed'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {/* Menunggu Penghitungan Biaya Pengiriman */}
    {props.step === 12 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diproses-pending'}
        />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}

    {/* Dibatalkan User */}
    {props.step === 13 && (
      <React.Fragment>
        <CustomSVG style={svgStyle} name={'ic-steps-menunggu-pembayaran'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pembayaran-diterima'} />
        <CustomSVG style={svgStyle} name={'ic-steps-filed'} />
        <CustomSVG style={svgStyle} name={'ic-steps-pesanan-dikirim-pending'} />
        <CustomSVG
          style={svgStyle}
          name={'ic-steps-pesanan-diterima-pending'}
        />
      </React.Fragment>
    )}
  </Row>
);

export default OrderStep;
