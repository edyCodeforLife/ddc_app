/**
 *
 * PaymentPage
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Spin,
  Select,
  Collapse,
  Row,
  Col,
  Modal,
} from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';

import * as actions from '../../actions/index';
import constant from '../../utils/configs/constant';
import validationMessages from './../../utils/configs/validationMessages';
import Midtrans from './../../components/Midtrans';
import CustomSVG from '../../components/CustomSVG';
import CustomProfileImage from '../../components/CustomProfileImage';
import logoVisa from '../../../assets/images/visa-and-mastercard-logo@2x.png';
import bca from '../../../assets/images/bank-central-asia@2x.png';
import mandiri from '../../../assets/images/bank-mandiri-logo@2x.png';
import permata from '../../../assets/images/logo-bank-permata@2x.png';
import bni from '../../../assets/images/bni@2x.png';

const FormItem = Form.Item;

const Ketentuan = () => (
  <div className="font-weight-bold" style={{ marginBottom: 10 }}>
    Ketentuan:
  </div>
);

export class PaymentPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    let totalPrice = null;
    if (this.props.isRenewal || this.props.isFreeShippingAndService) {
      totalPrice = this.props.price;
    } else if (this.props.isMembership) {
      // Credit Card Only
      totalPrice =
        this.props.price +
        this.props.shippingCost +
        constant.CONFIG_PAYMENT.HANDLING_FEE;
    }
    this.state = {
      paymentMethodId: 1,
      bankId: null,
      disableSubmitButton: true,
      showDialogMidtrans: false,
      showDialogInfoCVV: false,
      serviceFee:
        this.props.isRenewal || this.props.isFreeShippingAndService
          ? 0
          : constant.CONFIG_PAYMENT.HANDLING_FEE,
      totalPrice,
      paymentCharge: 0, // Credit Card Only
      token: null, // Credit Card Only
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Pembayaran',
      hideBurgerMenu: true,
      showFooter: false,
    });
    this.props.getPaymentMethods();
    if (!this.props.isMembership) {
      this.props.getPaymentTotalPrice();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isMembership) {
      if (this.props.payment.totalPrice !== prevProps.payment.totalPrice) {
        this.setState({
          totalPrice: this.props.payment.totalPrice,
        });
      }
    } else if (this.props.shippingCost !== prevProps.shippingCost) {
      this.setState({
        totalPrice:
          this.props.price +
          this.props.shippingCost +
          constant.CONFIG_PAYMENT.HANDLING_FEE,
      });
    }
  }

  /**
   * On Change Payment Method
  //  * @param {number} value
   */
  onChangePaymentMethod = (value) => {
    const paymentMethodId = parseInt(value, 0);
    let disableSubmitButton = true;
    let paymentCharge = 0;

    if (paymentMethodId && paymentMethodId !== 1 && paymentMethodId !== 2) {
      disableSubmitButton = false;
      if (constant.DEBUG_MODE) {
        // Only show for Dev mode
        this.props.form.setFieldsValue({
          name: 'Tom Hank',
          card_number: 4811111111111114,
          card_exp_month: 12,
          card_exp_year: 2020,
          card_cvv: 123,
          secure: true,
        });
      }

      paymentCharge = this.paymentCharge();
    } else if (paymentMethodId === 1 || paymentMethodId === 2) {
      disableSubmitButton = true;
    }
    this.setState({
      paymentMethodId,
      paymentCharge,
      disableSubmitButton,
      bankId: null,
    });
  };

  /**
   * On Change Bank
   * @param {number} bankId
   */
  onChangeBank = (bankId) => {
    this.setState({
      bankId,
      disableSubmitButton: false,
    });
  };

  /**
   * Payment Charge Calculator
   * For Payment Method = Credit Card
   */
  paymentCharge = () => {
    const totalPrice = this.state.totalPrice;
    const mdrPercent = constant.CONFIG_PAYMENT.MDR;
    const mdr = Math.ceil(totalPrice / (1 - mdrPercent)) - totalPrice;
    // console.log(mdr);
    return mdr;
  };

  /**
   * On Click Submit Payment
   * paymentMethodId : 1 Bank Transfer
   * paymentMethodId : 2 Virtual Account
   * paymentMethodId : 3 Credit Card
   */
  submitPayment = () => {
    if (this.state.paymentMethodId === 1 || this.state.paymentMethodId === 2) {
      // Not Credit Card Payment
      let data = null;
      if (!this.props.isMembership) {
        // Purchase
        data = {
          paymentMethodId: this.state.paymentMethodId,
          bankAccountId: this.state.bankId,
        };
      } else if (this.props.isRenewal) {
        // Renewal
        data = {
          isRenewal: true,
          paymentMethodId: this.state.paymentMethodId,
          bankAccountId: this.state.bankId,
          price: this.state.totalPrice,
        };
      } else {
        // Starter Kit
        data = {
          isMembership: true,
          paymentMethodId: this.state.paymentMethodId,
          bankAccountId: this.state.bankId,
          totalPrice: this.state.totalPrice + this.state.paymentCharge,
          branchId: constant.CONFIG_ORDER.BASE_BRANCH_ID,
          memberDeliveryAddressId: null,
          deliveryMethod: 'Kirim Alamat',
          isDropship: 0,
          isFreeShipping: 0,
          shippingFee: this.props.shippingCost,
          serviceFee: this.props.isFreeShippingAndService
            ? 0
            : constant.CONFIG_PAYMENT.HANDLING_FEE,
          totalWeight: this.props.totalWeight,
          productId: this.props.productId,
          price: this.props.price,
        };
      }
      this.props.postPayment(data);
    } else {
      // Credit Card Payment
      this.props.form.validateFieldsAndScroll((err, values) => {
        const data = values;
        const totalPrice = this.state.totalPrice + this.state.paymentCharge;
        // console.log(totalPrice);
        if (!err) {
          // console.log(data);
          // TODO: Change with your client key.
          // Can be found in Merchant Portal (dashboard.midtrans.com) -> Settings -> Access keys
          // Veritrans.client_key = 'VT-client-vQ1h0fxDfZ6t39B9';
          Veritrans.client_key = 'VT-client-J2vRgJmJP027dl9s';
          if (Veritrans.client_key.substring(1, 5) == 'Your') {
            Veritrans.client_key = prompt(
              '(edit index.html and place your client key at "<Your-Client-Key-Here>")\nOr \nInput Your Client Key Here :',
              ''
            );
          }
          if (constant.DEBUG_MODE) {
            // API Url for Sandbox
            Veritrans.url = 'https://api.sandbox.midtrans.com/v2/token';
          } else {
            // API Url for Production
            Veritrans.url = 'https://api.midtrans.com/v2/token';
          }

          const card = function () {
            return {
              card_number: data.card_number,
              card_exp_month: data.card_exp_month,
              card_exp_year: data.card_exp_year,
              card_cvv: data.card_cvv,
              secure: true,
              gross_amount: totalPrice,
            };
          };

          // console.log('SUBMIT');
          // event.preventDefault();
          // $(this).attr("disabled", "disabled");
          Veritrans.token(card, this.callback);
        }
      });
    }
  };

  callback = (response) => {
    // console.log(response);
    if (response.redirect_url) {
      // console.log('3D SECURE');
      // 3D Secure transaction, please open this popup
      this.showDialogMidtrans(response.redirect_url);
    } else if (response.status_code === '200') {
      // Success 3-D Secure or success normal
      // console.log(response.status_code);
      // alert(response.status_message);
      this.closeDialogMidtrans();

      // const data = {
      //   paymentMethodId: this.state.paymentMethodId,
      //   token: response.token_id,
      // };
      let data = null;
      if (!this.props.isMembership) {
        // Purchase
        data = {
          paymentMethodId: this.state.paymentMethodId,
          token: response.token_id,
          bankAccountId: this.state.bankId,
        };
      } else if (this.props.isRenewal) {
        // Renewal
        data = {
          isRenewal: true,
          paymentMethodId: this.state.paymentMethodId,
          token: response.token_id,
          bankAccountId: this.state.bankId,
          price: this.state.totalPrice,
        };
      } else {
        // Starter Kit
        data = {
          isMembership: true,
          token: response.token_id,
          paymentMethodId: this.state.paymentMethodId,
          // bankAccountId: this.state.bankId,
          bankAccountId: 0,
          totalPrice: this.state.totalPrice + this.state.paymentCharge,
          branchId: constant.CONFIG_ORDER.BASE_BRANCH_ID,
          memberDeliveryAddressId: null,
          deliveryMethod: 'Kirim Alamat',
          isDropship: 0,
          isFreeShipping: 0,
          shippingFee: this.props.shippingCost,
          serviceFee: this.state.serviceFee, // Only Apply Service Fee
          totalWeight: this.props.totalWeight,
          productId: this.props.productId,
          price: this.props.price,
        };
      }
      this.props.postPayment(data);

      // $('button').removeAttr('disabled');
      // $('#token_id').val(response.token_id);
      // $('#token_result').html(response.token_id);
    } else {
      // Failed request token
      this.closeDialogMidtrans();
      // console.log(response.status_code);
      alert(response.status_message);
      // $('button').removeAttr('disabled');
      // $('#token_result').html(
      //   `${response.status_message}. Please Try Again`
      // );
    }
  };

  showDialogMidtrans = (redirectUrl) => {
    this.setState({
      showDialogMidtrans: true,
      redirectUrl,
    });
  };

  closeDialogMidtrans = () => {
    this.setState({
      showDialogMidtrans: false,
    });
  };

  showDialogInfoCVV = (flag) => {
    this.setState({
      showDialogInfoCVV: flag,
    });
  };

  render() {
    if (
      !this.props.isMembership &&
      !this.props.authentication.isAuthenticated
    ) {
      // console.log('Redirect');
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    const Panel = Collapse.Panel;
    const Option = Select.Option;
    const text = [
      'Bank Transfer',
      'Internet Banking (virtual account)',
      'Kartu Kredit',
      'Bayar di Gerai (retail)',
    ];

    // If Form Success
    if (this.props.payment.formSuccess) {
      if (!this.props.isMembership) {
        this.props.storePayment({ formSuccess: false });
        return (
          <Redirect
            to={`/profil/transaksi/${this.props.payment.response.uuid}`}
          />
        );
      }
      this.props.storePayment({ formSuccess: false });
      return <Redirect to={'/beranda'} />;
    }

    return this.props.paymentMethod.loading &&
      !this.props.paymentMethod.paymentMethods ? (
        <div className="text-center" style={{ marginTop: '50%' }}>
          <Spin />
        </div>
    ) : (
      <div
        style={{
          marginLeft: -15,
          marginRight: -15,
          fontSize: 12,
        }}
      >
        {/* BEGIN Midtrans Library */}
        <Midtrans />
        <Modal
          visible={this.state.showDialogMidtrans}
          closable={false}
          footer={null}
          bodyStyle={{ padding: 0, minWidth: 300, height: 450 }}
        >
          <iframe
            src={this.state.redirectUrl}
            style={{ width: '100%', height: '100%' }}
          />
        </Modal>
        {/* END Midtrans Library */}

        {/* BEGIN Info CVV */}
        <Modal
          visible={this.state.showDialogInfoCVV}
          footer={null}
          centered
          onCancel={() => this.showDialogInfoCVV(false)}
          bodyStyle={{ padding: 15 }}
        >
          <div style={{ marginTop: 30 }}>
            <div>
              Silahkan masukkan 3 kode verifikasi yang terdapat di belakang
              kartu kredit Anda.
            </div>
            <div className="mt-20 text-center">
              <CustomSVG name={'CreditCard'} />
            </div>
          </div>
        </Modal>
        {/* END Info CVV */}

        <div>
          {/* BEGIN Payment Method Wrapper */}
          <div style={{ minHeight: '60vh' }}>
            <div style={{ boxShadow: '0 0 2px 0 #28282833' }}>
              <div
                className="font-weight-bold"
                style={{
                  padding: 15,
                  fontSize: 14,
                  backgroundColor: '#ffffff',
                }}
              >
                Pilih Metode Pembayaran
              </div>
              {/* BEGIN Payment Method */}
              <div className="payment__method">
                <Collapse
                  accordion
                  bordered={false}
                  defaultActiveKey={['1']}
                  onChange={this.onChangePaymentMethod}
                >
                  {this.props.paymentMethod.paymentMethods &&
                    this.props.paymentMethod.paymentMethods.map((payment) => (
                      <Panel header={text[payment.id - 1]} key={payment.id}>
                        <div style={{ marginLeft: 25 }}>
                          {/* {payment.paymentCategoryId === 1 && (
                            <img
                              src={constant.payment.image+}
                              alt={payment.name}
                              style={{ maxWidth: 100 }}
                            />
                          )} */}
                          {/* BEGIN Display Bank */}
                          {payment.banks && (
                            <div>
                              {/* BEGIN Payment Image */}
                              <div>
                                {payment.banks.map((bank) => (
                                  <img
                                    key={bank.name}
                                    src={bank.image}
                                    alt={bank.name}
                                    style={{ maxWidth: 80, marginRight: 10 }}
                                  />
                                ))}
                              </div>
                              {/* END Payment Image */}

                              <div className="my-1">
                                <div style={{ marginBottom: 10 }}>
                                  Pilih Bank
                                </div>
                                <Select
                                  // defaultValue=""
                                  value={this.state.bankId}
                                  style={{ width: '100%' }}
                                  onChange={this.onChangeBank}
                                >
                                  {payment.banks.map((bank) => (
                                    <Option value={bank.id}>{bank.name}</Option>
                                  ))}
                                </Select>
                              </div>
                            </div>
                          )}
                          {/* END Display Bank */}

                          {/* BEGIN Display Virtual Account */}
                          {payment.virtualAccount && (
                            <div>
                              <div style={{paddingTop: '15px', paddingBottom: '15px'}}>
                                <div>
                                  <img src={bca} style={{ marginRight: '30px', marginBottom: '15px', maxWidth: 75 }} />
                                  <img
                                    src={mandiri}
                                    style={{ maxWidth: 75, marginBottom: '15px' }}
                                  />
                                </div>
                                <div>
                                  <img src={bni} style={{ marginRight: '30px', maxWidth: 75 }} />
                                  <img src={permata} style={{ maxWidth: 75 }} />
                                </div>
                              </div>
                              <div
                                style={{
                                  marginBottom: 10,
                                  paddingTop: 10,
                                  paddingBottom: 0,
                                }}
                              >
                                Pilih Bank
                              </div>
                              <Select
                                // defaultValue=""
                                value={this.state.bankId}
                                style={{ width: '100%' }}
                                onChange={this.onChangeBank}
                              >
                                {payment.virtualAccount.map(
                                  (virtualAccount) => (
                                    <Option value={virtualAccount.id}>
                                      Internet Banking {virtualAccount.bankName}
                                    </Option>
                                  )
                                )}
                              </Select>
                            </div>
                          )}
                          {/* END Display Virtual Account */}

                          {/* BEGIN Credit Cart Form */}
                          {payment.paymentCategoryId === 3 && (
                            <React.Fragment>
                              <div
                                className="wrap-img"
                                style={{ width: 122, height: 22 }}
                              >
                                <CustomProfileImage
                                  style={{
                                    backgroundImage: `url(${logoVisa})`,
                                    height: '50px',
                                    width: '100%',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                  }}
                                />
                              </div>
                              <Form
                                className="my-3"
                                onSubmit={this.handleSubmit}
                                layout="vertical"
                                noValidate
                              >
                                <FormItem label="Nama Pemilik Kartu">
                                  {getFieldDecorator('name', {
                                    rules: [
                                      {
                                        required: true,
                                        message: validationMessages.REQUIRED,
                                      },
                                    ],
                                  })(<Input type="text" />)}
                                </FormItem>

                                <FormItem label="Nomor Kartu">
                                  {getFieldDecorator('card_number', {
                                    rules: [
                                      {
                                        required: true,
                                        message: validationMessages.REQUIRED,
                                      },
                                    ],
                                  })(<Input type="number" />)}
                                </FormItem>

                                <div className="font-size-small mb-10">
                                  Masa Berlaku Kartu
                                </div>
                                <Row type="flex" gutter={10}>
                                  <Col span={14}>
                                    <FormItem>
                                      {getFieldDecorator('card_exp_month', {
                                        rules: [
                                          {
                                            required: true,
                                            message:
                                              validationMessages.REQUIRED,
                                          },
                                        ],
                                      })(
                                        <Select placeholder="Bulan">
                                          <Option value={1}>Januari</Option>
                                          <Option value={2}>Februari</Option>
                                          <Option value={3}>Maret</Option>
                                          <Option value={4}>April</Option>
                                          <Option value={5}>Mei</Option>
                                          <Option value={6}>Juni</Option>
                                          <Option value={7}>Juli</Option>
                                          <Option value={8}>Agustus</Option>
                                          <Option value={9}>September</Option>
                                          <Option value={10}>Oktober</Option>
                                          <Option value={11}>November</Option>
                                          <Option value={12}>Desember</Option>
                                        </Select>
                                      )}
                                    </FormItem>
                                  </Col>
                                  <Col span={10}>
                                    <FormItem>
                                      {getFieldDecorator('card_exp_year', {
                                        rules: [
                                          {
                                            required: true,
                                            message:
                                              validationMessages.REQUIRED,
                                          },
                                        ],
                                      })(
                                        <Input
                                          type="number"
                                          placeholder="Tahun"
                                        />
                                      )}
                                    </FormItem>
                                  </Col>
                                </Row>

                                <Row type="flex" gutter={10} align="middle">
                                  <Col span={14}>
                                    <FormItem label="Kode Keamanan Kartu">
                                      {getFieldDecorator('card_cvv', {
                                        rules: [
                                          {
                                            required: true,
                                            message:
                                              validationMessages.REQUIRED,
                                          },
                                        ],
                                      })(
                                        <Input
                                          type="number"
                                          placeholder="CVV"
                                        />
                                      )}
                                    </FormItem>
                                  </Col>
                                  <Col span={10}>
                                    <span
                                      className="clickable"
                                      onClick={() =>
                                        this.showDialogInfoCVV(true)
                                      }
                                      style={{
                                        color: '#16b8b2',
                                        textDecoration: 'underline',
                                      }}
                                    >
                                      Apa itu CVV?
                                    </span>
                                  </Col>
                                </Row>
                              </Form>
                            </React.Fragment>
                          )}
                          {/* END Credit Cart Form */}

                          {/* BEGIN Information */}
                          <div className="my-3">
                            <Ketentuan />
                            <div>
                              <ul style={{ paddingLeft: 20 }}>
                                {/* BEGIN Bank Transfer */}
                                {payment.paymentCategoryId === 1 && (
                                  <React.Fragment>
                                    {this.state.bankId === 1 && (
                                      <li>
                                        Metode pembayaran ini dapat dilakukan
                                        melalui ATM BCA, M-BCA atau KlikBCA.
                                      </li>
                                    )}
                                    {this.state.bankId === 2 && (
                                      <li>
                                        Pembayaran hanya dapat dilakukan oleh
                                        nasabah Bank Mandiri melalui ATM,
                                        Internet Banking, Mobile Banking dan
                                        Mandiri Online.
                                      </li>
                                    )}
                                    {this.state.bankId === 3 && (
                                      <li>
                                        Pilih metode pembayaran ini untuk
                                        melakukan pembayaran dengan ATM BRI /
                                        Mobile Banking BRI / Internet Banking
                                        BRI / Bank Lainnya.
                                      </li>
                                    )}
                                  </React.Fragment>
                                )}

                                {/* END Bank Transfer */}
                                {payment.paymentCategoryId === 2 && (
                                  <div>
                                    <li>
                                      Satu nomor virtual account hanya berlaku
                                      untuk satu akun (tidak berubah-ubah).
                                    </li>
                                    <li>
                                      Pembayaran dengan virtual account hanya
                                      berlaku untuk satu tagihan terbaru.
                                    </li>
                                  </div>
                                )}
                                {payment.paymentCategoryId === 3 && (
                                  <li>
                                    Selesaikan pembayaran dalam waktu 1 jam
                                    untuk menghindari pembatalan transaksi
                                    secara otomatis.
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                          {/* END Information */}
                        </div>
                      </Panel>
                    ))}
                </Collapse>
              </div>
              {/* END Payment Method */}
            </div>
          </div>
        </div>
        {/* END Payment Method Wrapper */}

        {/* BEGIN Payment Footer */}
        <div
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: -15,
          }}
        >
          {this.props.isMembership && (
            // Only show if membership, upgrade, renewal
            <div>
              <Row className="my-3" type="flex" justify="space-between">
                <Col>Total Harga</Col>
                <Col>
                  <NumberFormat
                    value={this.props.price}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </Col>
              </Row>
              {!this.props.isRenewal && (
                <Row className="my-3" type="flex" justify="space-between">
                  <Col>Ongkos Kirim</Col>
                  <Col>
                    <NumberFormat
                      value={this.props.shippingCost}
                      displayType={'text'}
                      thousandSeparator
                      prefix={'Rp '}
                    />
                  </Col>
                </Row>
              )}
              {this.state.paymentMethodId === 3 && (
                // Only show if credit card
                <Row className="my-3" type="flex" justify="space-between">
                  <Col>Biaya Layanan</Col>
                  <Col>
                    <NumberFormat
                      value={this.paymentCharge()}
                      displayType={'text'}
                      thousandSeparator
                      prefix={'Rp '}
                    />
                  </Col>
                </Row>
              )}
              {!this.props.isRenewal && (
                <Row className="my-3" type="flex" justify="space-between">
                  <Col>Biaya Admin</Col>
                  <Col>
                    <NumberFormat
                      value={this.state.serviceFee}
                      displayType={'text'}
                      thousandSeparator
                      prefix={'Rp '}
                    />
                  </Col>
                </Row>
              )}
              <Row className="my-3" type="flex" justify="space-between">
                <Col>Total Pembayaran</Col>
                <Col className="font-weight-bold">
                  <NumberFormat
                    value={this.state.totalPrice + this.state.paymentCharge}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </Col>
              </Row>
            </div>
          )}

          {!this.props.isMembership && (
            // Only show if Pruchase
            <div>
              <Row className="my-3" type="flex" justify="space-between">
                <Col>Total Harga</Col>
                <Col>
                  <NumberFormat
                    value={this.state.totalPrice}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </Col>
              </Row>
              {this.state.paymentMethodId === 3 && (
                // Only show if credit card
                <Row className="my-3" type="flex" justify="space-between">
                  <Col>Biaya Layanan</Col>
                  <Col>
                    <NumberFormat
                      value={this.paymentCharge()}
                      displayType={'text'}
                      thousandSeparator
                      prefix={'Rp '}
                    />
                  </Col>
                </Row>
              )}
              <Row className="my-3" type="flex" justify="space-between">
                <Col>Total Pembayaran</Col>
                <Col className="font-weight-bold">
                  <NumberFormat
                    value={this.state.totalPrice + this.state.paymentCharge}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </Col>
              </Row>
            </div>
          )}
          <div className="my-3 text-center">
            Dengan menekan “Bayar Sekarang”, Saya telah setuju dengan{' '}
            <NavLink to="/etika-reseller">
              <span style={{ color: '#16b8b2', textDecoration: 'underline' }}>
                syarat dan ketentuan
              </span>{' '}
            </NavLink>
            di dusdusan.com
          </div>

          <Button
            className="btn-block"
            type="primary"
            disabled={this.state.disableSubmitButton}
            loading={this.props.payment.loading}
            onClick={this.submitPayment}
          >
            Bayar Sekarang
          </Button>
        </div>
        {/* END Payment Footer */}
      </div>
    );
  }
}

const PaymentForm = Form.create()(PaymentPage);

const mapStateToProps = (state) => ({
  formData: state.get('registrationMemberReseller').formData,
  authentication: state.get('authentication'),
  paymentMethod: state.get('paymentMethod'),
  payment: state.get('payment'),
});

const mapDispatchToProps = (dispatch) => ({
  getPaymentMethods: () => dispatch(actions.getPaymentMethods()),
  getPaymentTotalPrice: () => dispatch(actions.getPaymentTotalPrice()),
  postPayment: (data) => dispatch(actions.postPayment(data)),
  storePayment: (data) => dispatch(actions.storePayment(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
