/**
 *
 * RegistrationMemberNonResellerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Spin,
  Divider,
  Alert,
  Row,
  Col,
  Select,
} from 'antd';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import constant from '../../utils/configs/constant';
import validationMessages from '../../utils/configs/validationMessages';
import * as actions from '../../actions';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
export class RegistrationMemberNonResellerPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      hasToken: false,
      referralCode: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectProvince = this.handleSelectProvince.bind(this);
    this.handleSelectCity = this.handleSelectCity.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Daftar Non Reseller',
      showFooter: false,
    });
    this.props.getDataProvince();

    /**
     * Check query parameter from Social
     */
    const queryParam = queryString.parse(this.props.location.search);
    // console.log(queryParam);
    if (queryParam.token && queryParam.email) {
      // console.log(queryParam);
      /**
       * If social account not registered
       * Fill Registration Form
       */
      // this.setState({ hasToken: true });
      if (!this.state.hasToken) {
        this.setState({ hasToken: true });
      }
      this.props.form.setFieldsValue({
        firstName: queryParam.firstName,
        lastName: queryParam.lastName,
        email: queryParam.email,
      });
    } else if (queryParam.token && !queryParam.email) {
      /**
       * If social account already registered
       * Set to Login
       */
      this.props.history.push({
        pathname: '/login',
        search: `?token=${queryParam.token}`,
      });
    }

    /**
     * If referralCode was set
     */
    // const queryParam = queryString.parse(this.props.location.search);
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
  }

  /**
   * confirm_password onBlur
   */
  handleConfirmPasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  /**
   * Compare confirm_password to password
   */
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(validationMessages.CONFIRM_PASSWORD_NOT_MATCH);
    } else {
      callback();
    }
  };

  /**
   * Compare password to confirm_password
   */
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], { force: true });
    }
    callback();
  };

  /*
   * Check validity of referal code
   * */
  checkReferralCode = (e) => {
    const value = e.target.value;
    this.props.checkReferralCode(value);
  };

  /**
   * Do submit form
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitRegistrationMemberNonReseller(values);
      }
    });
  };
  handleSelectProvince(value) {
    // console.log(value);
    this.props.form.setFieldsValue({
      cityId: null,
      districtId: null,
    });
    this.props.getDataCity(value);
  }

  /**
   * Select City and get Dropdown District
   */
  handleSelectCity(value) {
    // console.log(value);
    this.props.form.setFieldsValue({
      districtId: null,
    });
    this.props.getDataDistrict(value);
  }
  render() {
    // If login
    if (this.props.authentication.isAuthenticated) {
      return <Redirect to="/beranda" />;
    }

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
      } else if (
        this.props.formError.phone === 'The phone number is incorrect'
      ) {
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
      <div>
        <div className="my-4 h5 font-weight-bold text-center">
          Daftar Sebagai Bukan Reseller
        </div>

        {!this.props.formSuccess && (
          <Spin spinning={this.props.loading}>
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <FormItem label="Nama Depan">
                {getFieldDecorator('firstName', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.FIRST_NAME_REQUIRED,
                    },
                  ],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="Nama Belakang">
                {getFieldDecorator('lastName', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.LAST_NAME_REQUIRED,
                    },
                  ],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="Email" {...formError.email}>
                {getFieldDecorator('email', {
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
                  ],
                })(<Input type="number" />)}
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
                label="Kode Referral (Optional)"
                {...formErrorRefferal.referralCode}
              >
                {getFieldDecorator('referralCode')(
                  <Input type="text" onChange={this.checkReferralCode} />
                )}
              </FormItem>
              <FormItem label="Alamat">
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.ADDRESS_REQUIRED,
                    },
                  ],
                })(
                  <TextArea
                    rows={6}
                    placeholder="Masukkan alamat rumah lengkap dengan Rt, Rw, Nomor Rumah..."
                  />
                )}
              </FormItem>
              <FormItem label="Provinsi">
                {getFieldDecorator('provinceId', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.PROVINCE_REQUIRED,
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Pilih Provinsi"
                    onChange={this.handleSelectProvince}
                  >
                    {this.props.province !== null
                      ? this.props.province.map((data) => (
                        <Option key={data.id} value={data.id}>
                          {data.name}
                        </Option>
                        ))
                      : null}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Kota/ Kabupaten">
                {getFieldDecorator('cityId', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.CITY_REQUIRED,
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Pilih Kota/ Kabupaten"
                    onChange={this.handleSelectCity}
                  >
                    {this.props.city !== null
                      ? this.props.city.map((data) => (
                        <Option key={data.id} value={data.id}>
                          {data.name}
                        </Option>
                        ))
                      : null}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Kecamatan">
                {getFieldDecorator('districtId', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.DISTRICT_REQUIRED,
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Pilih Kecamatan"
                  >
                    {this.props.district !== null
                      ? this.props.district.map((data) => (
                        <Option key={data.id} value={data.id}>
                          {data.name}
                        </Option>
                        ))
                      : null}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Kode Pos">
                {getFieldDecorator('postalCode', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.POSTAL_CODE_REQUIRED,
                    },
                  ],
                })(<Input type="number" />)}
              </FormItem>
              <Button
                id="buttonRegistrationMemberNonReseller"
                className="my-1 btn-block"
                type="primary"
                size={'large'}
                htmlType="submit"
              >
                Daftar Sekarang
              </Button>
            </Form>

            {/* Hide Social Login if already clicked */}
            {!this.state.hasToken && (
              <div>
                <Divider className="my-3">Atau</Divider>

                <Row>
                  <Col>
                    <Button
                      className="my-2 btn-block facebook-color"
                      href={`${
                        constant.URL_MASTER_PUBLIC_PATH
                      }socialAuth/facebook/registrasi-member-reseller`}
                    >
                      Daftar dengan Facebook
                    </Button>
                  </Col>
                </Row>

                <div className="text-center copywrite">
                  {constant.COPYRIGHT}
                </div>
              </div>
            )}
          </Spin>
        )}
      </div>
    );
  }
}

const registrationMemberNonResellerForm = Form.create()(
  RegistrationMemberNonResellerPage
);

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  referral: state.get('registrationMemberNonReseller').referral,
  loading: state.get('registrationMemberNonReseller').loading,
  formError: state.get('registrationMemberNonReseller').formError,
  formSuccess: state.get('registrationMemberNonReseller').formSuccess,
  formData: state.get('registrationMemberReseller').formData,
  province: state.get('registrationMemberReseller').dataProvince,
  city: state.get('registrationMemberReseller').dataCity,
  district: state.get('registrationMemberReseller').dataDistrict,
});

const mapDispatchToProps = (dispatch) => ({
  checkReferralCode: (referralCode) =>
    dispatch(actions.checkReferralCode(referralCode)),
  submitRegistrationMemberNonReseller: (form) =>
    dispatch(actions.submitRegistrationMemberNonReseller(form)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  getDataProvince: () => dispatch(actions.getDataProvince()),
  getDataCity: (provinceId) => dispatch(actions.getDataCity(provinceId)),
  getDataDistrict: (cityId) => dispatch(actions.getDataDistrict(cityId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registrationMemberNonResellerForm);
