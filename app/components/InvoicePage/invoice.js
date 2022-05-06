import React from 'react';
import NumberFormat from 'react-number-format';

import DDCLogo from '../../../assets/images/logo/logo-ddc.png';

export default (props) => (
  <div className="p-24 contAdjustment page-layout blank mat-white-bg responsive-page">
    <div className="report-page" style={{ maxWidth: '718px' }}>
      <div style={{ padding: '20px', border: '2px solid #b3b3b3' }}>
        <div className="text-right">
          {props.config.isDropship === 0 && (
            <img
              src={DDCLogo}
              alt="dusdusan"
              style={{
                maxWidth: 'auto',
                maxHeight: '40px',
                width: 'auto !important',
              }}
            />
          )}
        </div>
        <h5 className="font-weight-500" style={{ margin: '0px' }}>
          Order No
        </h5>
        <h5 style={{ margin: '0', color: '#ff8700', fontSize: '27px' }}>
          {props.config.orderNumber} ( {props.config.invoiceNumber} )
        </h5>

        <div
          fxlayout="row"
          fxlayoutalign="space-between start"
          style={{ marginTop: '50px' }}
        >
          {props.config.isDropship === 0 ? (
            <div id="containerHeader">
              <div>
                <div className="h5 font-weight-500">
                  PT DUSDUSAN DOTCOM INDONESIA
                </div>
                <div>www.dusdusan.com</div>
                <div>Telepon : (021) 5366-1376</div>
                <div>Email : support@dusdusan.com</div>
              </div>
              <div className="text-right">
                <div className="h5 font-weight-500">ALAMAT PENGIRIMAN</div>
                <div>
                  {props.config.receiverName}
                  <span>({props.config.phoneDestination})</span>
                </div>
                <div>
                  {props.config.addressDestination}
                  <br />
                  {`
                  ${props.config.provinceDestination},
                  ${props.config.cityDestination},
                  ${props.config.districtDestination}
                  `}
                  <br />
                  {props.config.postalCodeDestination}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-right">
                <div className="h5 font-weight-500">ALAMAT PENGIRIMAN</div>
                <div>
                  {props.config.receiverName}
                  <span>({props.config.phoneDestination})</span>
                </div>
                <div>
                  {props.config.addressDestination}
                  <br />
                  {`
                  ${props.config.provinceDestination},
                  ${props.config.cityDestination},
                  ${props.config.districtDestination}
                  `}
                  <br />
                  {props.config.postalCodeDestination}
                </div>
                <div>
                  <div>(DROPSHIP)</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ borderTop: '1px solid #231f20', marginTop: '20px' }}>
          &nbsp;
        </div>

        <table>
          <tr>
            <td>Tanggal</td>
            <td>:</td>
            <td>{props.config.createAt.replace('T', ' ').replace('Z', ' ')}</td>
          </tr>
          <tr>
            <td>Nama</td>
            <td>:</td>
            <td>{props.config.memberName}</td>
          </tr>
          <tr>
            <td>Telepon</td>
            <td>:</td>
            <td>{props.config.memberPhone}</td>
          </tr>
        </table>

        <div style={{ borderTop: '1px solid #231f20', marginTop: '20px' }}>
          &nbsp;
        </div>

        <table className="TableContainer">
          <thead>
            <tr className="h5 font-weight-500 ">
              <td>No.</td>
              <td>Produk</td>
              <td>Banyaknya</td>
              <td>Harga</td>
              <td className="pl-2">Total</td>
            </tr>
          </thead>
          <tbody>
            {props.config.orderDetailProduct.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td key={index.id}>
                  <div>{product.internalSKU}</div>
                  <div>{product.name}</div>
                </td>
                <td>{product.quantity}</td>
                <td>
                  <NumberFormat
                    value={product.price}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </td>
                <td className="pl-2">
                  <NumberFormat
                    value={product.totalPrice}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-right">
            <tr>
              <td className="font-weight-500" colSpan="4">
                <strong>Total Belanja</strong>
              </td>
              <td className="text-left pl-2">
                <NumberFormat
                  value={props.config.beforeDiscountPrice}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <div>Diskon</div>
              </td>
              <td className="text-left pl-2">
                <NumberFormat
                  value={props.config.discountPrice}
                  displayType={'text'}
                  thousandSeparator
                  decimalScale={1}
                  prefix={'Rp '}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <div>Biaya Pengiriman</div>
                <div>
                  ({props.config.shippingName} :{' '}
                  <NumberFormat
                    value={props.config.totalWeight / 1000}
                    displayType={'text'}
                    thousandSeparator
                    decimalScale={1}
                    suffix={' kg'}
                  />
                  )
                </div>
              </td>
              <td className="text-left pl-2">
                <NumberFormat
                  value={props.config.shippingFee}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="4">Biaya Penanganan</td>
              <td className="text-left pl-2">
                <NumberFormat
                  value={props.config.serviceFee}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              </td>
            </tr>
            <tr>
              <td className="font-weight-500" colSpan="4">
                <strong>Total Pembayaran</strong>
              </td>
              <td className="font-weight-500 text-left pl-2">
                <strong>
                  <NumberFormat
                    value={props.config.totalPrice}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <div style={{ fontSize: '11', fontStyle: 'italic', marginTop: '10px' }}>
          * Harga sudah termasuk PPN 10%
        </div>
      </div>

      <div className="mt-3 ml-4 mr-4 mb-5" style={{ maxidth: 'auto' }}>
        <div>
          Pembayaran menggunakan{' '}
          {`${props.config.payment.paymentMethod.name} Bank ${
            props.config.payment.bankAccount.name
          }`}
        </div>
        <div style={{ color: '#808080' }}>
          {' '}
          {`${props.config.payment.bankAccount.name} ${
            props.config.payment.bankAccount.branchName
          } a/n ${props.config.payment.bankAccount.name} - ${
            props.config.payment.bankAccount.accountName
          }`}
          {props.config.payment.bankAccount.accountNumber !== ''
            ? props.config.payment.bankAccount.accountNumber
            : null}
        </div>
      </div>
    </div>
  </div>
);
