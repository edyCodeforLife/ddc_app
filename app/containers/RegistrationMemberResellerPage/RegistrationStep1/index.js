import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Mention, Modal } from 'antd';
import queryString from 'query-string';
import NumberFormat from 'react-number-format';

import validationMessages from '../../../utils/configs/validationMessages';
import * as actions from '../../../actions/index';
import constant from './../../../utils/configs/constant';
import BenefitCard from './../../UpgradeMembershipPage/component/benefitCard';
import moment from 'moment';

const FormItem = Form.Item;

class RegistrationStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      referralCode: null,
      hasToken: false,
      voucherCode: '',
      voucherForm: {
        validateStatus: null,
      },
      showModalVoucher: false,
      showModalSuccess: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    if (this.props.formData) {
      this.props.form.setFieldsValue(this.props.formData);
    }
    this.props.getMemberCount({ memberCount: this.props.app.memberCount });

    /**
     * If referralCode was set
     */
    const queryParam = queryString.parse(this.props.location.search);
    // console.log(queryParam);
    if (queryParam.ref) {
      const e = {
        target: {
          value: queryParam.ref,
        },
      };
      this.checkReferralCode(e);
      this.props.form.setFieldsValue({
        referralCode: queryParam.ref,
      });
    }

    if (queryParam.token) {
      if (!this.state.hasToken) {
        this.setState({ hasToken: true });
      }
    }
  }

  /**
   * On Change Voucher Code
   */
  onChangeVoucher = (event) => {
    let validateStatus = null;
    const startDate = moment(constant.CONFIG_PROMO.PROMO_START_DATE);
    const endDate = moment(constant.CONFIG_PROMO.PROMO_END_DATE);
    const currentDate = new Date();

    if (
      currentDate >= startDate &&
      currentDate <= endDate &&
      constant.CONFIG_ORDER.REGISTRATION_VOUCHER.includes(event.target.value)
    ) {
      validateStatus = 'success';
    } else if (event.target.value.length > 0) {
      validateStatus = 'error';
    }
    this.setState({
      voucherCode: event.target.value,
      voucherForm: { validateStatus },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.voucherEnable =
          this.state.voucherForm.validateStatus === 'success';
        this.props.storeRegistrationStep1(values);
      }
    });
  };

  /*
   * Check validity of referal code
   * */
  checkReferralCode = (e) => {
    const value = e.target.value;
    this.props.checkReferralCode(value);
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Kata Sandi yang Anda masukan tidak sama');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], { force: true });
    }
    callback();
  };

  handleConfirmPasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  showModalSuccess = () => {
    this.setState({
      showModalVoucher: false,
      showModalSuccess: true,
    });
  };

  onClickOpenModalVoucher = () => {
    this.setState({
      showModalVoucher: true,
    });
  };

  handleConfirmSuccess = () => {
    this.setState({
      showModalSuccess: false,
    });
  };

  showModalVoucher = () => {
    this.setState({
      showModalCustomDelivery: true,
    });
  };
  /**
   * On Click Open Modal Voucher
   */
  onClickCancelModalVoucher = () => {
    this.setState({
      showModalVoucher: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let formError = {};
    let formErrorRefferal = {};

    /**
     * Server Validation, get data from redux
     */
    if (this.props.formError) {
      // Validate Email
      if (this.props.formError.email === 'Email has already been registered') {
        formError = {
          email: {
            validateStatus: 'error',
            help: validationMessages.EMAIL_REGISTERED,
          },
        };
      }

      // Validate Phone
      if (this.props.formError.phone === 'Phone has already been registered') {
        formError = {
          phone: {
            validateStatus: 'error',
            help: validationMessages.PHONE_NUMBER_REGISTERED,
          },
        };
      } else if (this.props.formError.phone === 'Phone number is incorrect') {
        formError = {
          phone: {
            validateStatus: 'error',
            help: validationMessages.PHONE_NUMBER_INVALID,
          },
        };
      }
    }

    // Validate Referral Code
    if (this.props.referral) {
      let validateStatus = null;
      let help = null;
      if (!this.props.referral.error) {
        if (this.props.referral.loading) {
          validateStatus = 'validating';
        } else if (this.props.referral.referralName) {
          validateStatus = 'success';
          help =
            validationMessages.REFERRAL_CODE_SUCCESS +
            this.props.referral.referralName;
        }
      } else {
        validateStatus = 'error';
        help = validationMessages.REFERRAL_CODE_FAILED;
      }
      formErrorRefferal = {
        referralCode: {
          validateStatus,
          help,
        },
      };
    }
    return (
      <React.Fragment>
        <Modal
          visible={this.state.showModalVoucher}
          width={320}
          footer={null}
          bodyStyle={{ paddingBottom: 15 }}
          onCancel={this.onClickCancelModalVoucher}
        >
          <div className="mt-10 text-center">
            Masukkan kode voucher dan dapatakan potongan harga spesial dari Kami.
          </div>
          <div style={{ marginTop: 20 }}>
            <FormItem
              label="Kode Voucher"
              hasFeedback
              validateStatus={this.state.voucherForm.validateStatus}
            >
              <Input
                type="text"
                value={this.state.voucherCode}
                onChange={this.onChangeVoucher}
                placeholder="Masukkan Kode Voucher"
              />
            </FormItem>
          </div>
          <div>
            <Button
              className="btn-block"
              type="primary"
              disabled={this.state.voucherForm.validateStatus !== 'success'}
              onClick={this.showModalSuccess}
            >
              Gunakan
            </Button>
          </div>
        </Modal>
        <Modal
          visible={this.state.showModalSuccess}
          width={320}
          footer={null}
          bodyStyle={{ paddingBottom: 15 }}
          onCancel={this.onClickConfirmation}
          onClick={this.showModalSuccess}
        >
          <Row style={{ marginTop: '10px', padding: '14px 2px' }}>
            <div className="getVoucherRegister">
              Selamat anda mendapatkan promo paket event yang bisa anda pilih
              nanti.
            </div>
            <div style={{ paddingTop: 20 }}>
              <Button
                className="btn-block"
                htmlType="button"
                type="primary"
                onClick={this.handleConfirmSuccess}
              >
                <span className="confirmGetVoucher">Saya Mengerti</span>
              </Button>
            </div>
          </Row>
        </Modal>
        <div className="registrasi">
          {/* <div className="title text-center">
            <h4>
              Bersama Dusdusan.com, jadilah bagian dari komunitas Reseller
              terbesar di Indonesia.
            </h4>
          </div> */}
          <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
            <FormItem label="Nama depan">
              {getFieldDecorator('firstName', {
                initialValue: this.props.formData.firstName,
                rules: [
                  {
                    required: true,
                    message: validationMessages.FIRST_NAME_REQUIRED,
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="Nama belakang">
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.LAST_NAME_REQUIRED,
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="E-mail" {...formError.email}>
              {getFieldDecorator('email', {
                initialValue: this.props.formData.email,
                rules: [
                  {
                    type: 'email',
                    message: validationMessages.EMAIL_INVALID,
                  },
                  {
                    required: true,
                    message: validationMessages.EMAIL_REQUIRED,
                  },
                ],
              })(<Input type="email" disabled={this.state.hasToken} />)}
            </FormItem>
            <FormItem label="No. Handphone" {...formError.phone}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.PHONE_NUMBER_FILL,
                  },
                  {
                    pattern: constant.REGEX_PHONE_NUMBER,
                    message: validationMessages.PHONE_INVALID,
                  },
                  {
                    min: 8,
                    message: 'Min 8 karakter',
                  },
                  {
                    max: 13,
                    message: 'Max 13 karakter',
                  },
                ],
              })(<Input type="tel" />)}
            </FormItem>
            <FormItem label="Kata Sandi">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.PASSWORD_REQUIRED,
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                  {
                    min: 6,
                    message: `Kata Sandi ${validationMessages.TOO_SHORT}`,
                  },
                ],
              })(<Input type="password" />)}
            </FormItem>
            <FormItem label="Ketik Ulang Kata Sandi">
              {getFieldDecorator('confirm_password', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.CONFIRM_PASSWORD_REQUIRED,
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmPasswordBlur}
                />
              )}
            </FormItem>
            <FormItem
              hasFeedback
              label="Kode Referral (Kosongkan jika tidak ada)"
              {...formErrorRefferal.referralCode}
            >
              {getFieldDecorator('referralCode')(
                <Input type="text" onChange={this.checkReferralCode} />
              )}
            </FormItem>
            {/* <Row
              type="flex"
              align="middle"
              justify="space-between"
              style={{ paddingBottom: 24 }}
            >
              <Col span={16} className="labelVaucherEvent"> */}
                {/* <Row style={{ paddingBottom: 10 }}> */}
                {/* Ada Kode Voucher ? */}
                {/* </Row> */}
                {/* <Row className="Rectangle" type="flex">
                  <Col className="VoucherTitle">Keterangan</Col>
                  <Col style={{ lineHeight: 1.5, margin: '15px', marginTop: '-5px' }}>Masukkan Voucher 99aja agar pendaftaran Dusdusan.com menjadi Rp 99.000
                  <span style={{ marginLeft: '5px' }} className="vaucherEvent">
                    {this.state.voucherForm.validateStatus === 'success' ? (
                      <u
                        className="clickable"
                        onClick={this.onClickOpenModalVoucher}
                      >
                        {this.state.voucherCode}
                      </u>
                    ) : (
                      <u
                        className="clickable"
                        onClick={this.onClickOpenModalVoucher}
                      >
                        Pakai Voucher
                      </u>
                      )}
                    </span>
                  </Col>
                </Row> */}
              {/* </Col> */}
              {/* <Col span={8} style={{ lineHeight: '1.5', textAlign: 'right' }}>
                <span className="vaucherEvent">
                  {this.state.voucherForm.validateStatus === 'success' ? (
                    <u
                      className="clickable"
                      onClick={this.onClickOpenModalVoucher}
                    >
                      {this.state.voucherCode}
                    </u>
                  ) : (
                      <u
                        className="clickable"
                        onClick={this.onClickOpenModalVoucher}
                      >
                        Pakai Voucher
                      </u>
                    )}
                </span>
              </Col> */}
            {/* </Row> */}
            <FormItem>
              <Button
                className="btn-block"
                type="primary"
                size={'large'}
                htmlType="submit"
              >
                Simpan dan Lanjutkan
              </Button>
            </FormItem>
          </Form>
          <div>
            <BenefitCard />
            {/* END Benefit */}

            <h4 className="mt-5 mb-3 font-weight-bold">
              Lebih dari
              <NumberFormat
                style={{ marginLeft: '5px', marginRight: '5px' }}
                value={this.props.app.memberCount}
                displayType={'text'}
                thousandSeparator
              />
              Reseller Telah Bergabung dan Menikmati Keuntungannya.
            </h4>

            <p>
              Dusdusan.com didesain untuk memberikan kesempatan bagi para Ibu
              Rumah Tangga, Karyawan kantoran dan para pemilik usaha untuk dapat
              mendapatkan penghasilan tambahan TANPA menambah beban.
            </p>
            <p>
              Dusdusan.com bukan MLM, tidak ada upline/downline. Tidak ada
              target dan tidak ada yang namanya dikejar2 tutup poin. Saatnya
              Anda memiliki dan merintis bisnis yang mudah dan menghasilkan.
            </p>
            <small>
              <i>
                * Jumlah Reseller terus dibatasi tiap kota/Kabupaten. Segera
                amankan akses anda, sebelum ditutup di area kota anda.
              </i>
            </small>
          </div>
          <div className="my-5 text-center">
            Jika kamu hanya ingin mendaftar sebagai anggota member kami dahulu
            (bukan reseller), kamu bisa &nbsp;
            <u className="font-weight-bold">
              <NavLink to={'/registrasi-member-non-reseller'}>
                daftar disini
              </NavLink>
            </u>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const registrationStep1 = Form.create()(RegistrationStep1);

const mapStateToProps = (state) => ({
  referral: state.get('registrationMemberNonReseller').referral,
  formData: state.get('registrationMemberReseller').formData,
  formError: state.get('registrationMemberReseller').formError,
  app: state.get('app'),
});

const mapDispatchToProps = (dispatch) => ({
  getMemberCount: (data) => dispatch(actions.getMemberCount(data)),
  checkReferralCode: (referralCode) =>
    dispatch(actions.checkReferralCode(referralCode)),
  storeRegistrationStep1: (form) =>
    dispatch(actions.storeRegistrationStep1(form)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(registrationStep1)
);
