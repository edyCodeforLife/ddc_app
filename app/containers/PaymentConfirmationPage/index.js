/**
 *
 * PaymentConfirmationPage
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  Icon,
  Select,
  message,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import validationMessages from '../../utils/configs/validationMessages';
import * as actions from '../../actions/index';
import { InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

export class PaymentConfirmationPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      image: null,
      date: '',
      isLoading: false,
      name: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      showProfile: true,
      showCart: true,
      showFooter: false,
    });
    this.props.getPaymentMethods();

    // Get Dropdown Order, Manual Transfer, Waiting Payment
    const data = {
      query: 'paymentMethodId:1,orderStatusId:1',
    };
    this.props.getTransactions(data);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.imageUrl) {
  //     if (
  //       this.paymentConfirmation.data !== prevProps.paymentConfirmation.data
  //     ) {
  //       this.handleUpload();
  //     }
  //   }
  // }

  // componentWillReceiveProps(newProps, nextProps) {
  //   console.log(newProps);
  //   console.log(nextProps);
  //   if (newProps.upload) {
  //     if (newProps.upload.imagePath === null && this.props.loading) {
  //       this.setState({
  //         isLoading: true,
  //       });
  //     }
  //   }
  // }

  /**
   * Can not select tommorow days
   * @param {*} current
   */
  disabledDate = (current) => current > moment().endOf('day');

  /**
   * Upload Image and Preview
   */
  onChangeUpload = (info) => {
    if (!this.state.name) {
      console.log('coba cek');
      this.props.postUploadImage(info.file.originFileObj);
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          image: info.file.originFileObj,
          isLoading: false,
          name: info.file.originFileObj.name,
        })
      );
    } else {
      if (this.state.name !== info.file.originFileObj.name) {
        console.log('Manggil Lagi');
        this.props.postUploadImage(info.file.originFileObj);
        // Get this url from response in real world.
        this.setState({
          name: info.file.originFileObj.name,
        });
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            imageUrl,
            image: info.file.originFileObj,
            isLoading: false,
          })
        );
        console.log(info.file.originFileObj);
      }
    }
  };

  onChangeDate = (values) => {
    this.setState({
      date: values,
    });
  }

  // range = (start, end) => {
  //   const result = [];
  //   for (let i = start; i < end; i++) {
  //     result.push(i);
  //   }
  //   return result;
  // }

  // disabledTime = () => {
  //   return {
  //     disabledHours: () => range(0, 24).splice(4, 20),
  //     disabledMinutes: () => range(30, 60),
  //     disabledSeconds: () => [55, 56],
  //   };
  // }
  /**
   * Encode Image
   */
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  /**
   * Validate Upload
   */
  beforeUpload = (file) => {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const isValid = fileTypes.includes(file.type);

    if (!isValid) {
      message.error('Hanya dapat upload format JPG, JPEG dan PNG');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Ukuran maksimal foto 5MB');
    }
    return isValid && isLt5M;
  };

  handleSubmit = (e) => {
    // console.log('Submit');
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.image = this.props.upload.imagePath;
        values.transferDate = this.state.date.toISOString().split('T')[0];
        console.log(values.transferDate);
        this.props.postPaymentConfirmation(values);
      }
    });
  };

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    // const buttonPayment = document.getElementById('buttonPaymentConfirmation');
    // if (this.props.upload.imagePath) {
    //   buttonPayment.removeAttribute('disabled');
    // }

    if (this.props.paymentConfirmation.formSuccess) {
      this.props.storePaymentConfirmation({ formSuccess: false });
      message.success('Konfirmasi Pembayaran berhasil, harap menunggu.', 3);
      return <Redirect to="/beranda" />;
    }

    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="camera-o" style={{ fontSize: 20, color: '#DCDCDC' }} />
      </div>
    );
    const imageUrl = this.state.imageUrl;

    const banks = [
      'BCA',
      'MANDIRI',
      'BRI',
      'CIMB',
      'BNI',
      'BII / MAYBANK',
      'CIMB NIAGA',
      'BRI SYARIAH',
      'MUAMALAT',
      'DANAMON',
      'PERMATA',
      'NISP',
      'CITIBANK N.A',
      'BANK DKI',
      'BANK JABAR',
      'BANK MEGA',
      'BUKOPIN',
      'BANK SYARIAH MANDIRI',
      'BTN',
      'BANK LAINNYA',
    ];

    return (
      <div
        style={{
          marginTop: -15,
          marginLeft: -15,
          marginRight: -15,
          marginBottom: -15,
          fontSize: 12,
        }}
      >
        {/* BEGIN Header */}
        <div style={{ padding: 15 }}>
          <div className="font-weight-bold" style={{ fontSize: 14 }}>
            Konfirmasi Pembayaran
          </div>
          <div>
            Pastikan Anda sudah melakukan pembayaran/transfer tunai dengan benar
            sebelum konfirmasi.
          </div>
        </div>
        {/* END Header */}

        {/* BEGIN FORM */}
        <div
          style={{
            padding: 15,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 2px 0 #28282833',
          }}
        >
          <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
            <FormItem label="No. Order Pembayaran">
              {getFieldDecorator('orderId', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(
                <Select style={{ width: '100%' }} placeholder="Pilih">
                  {this.props.transactions &&
                    this.props.transactions.map((transaction) => (
                      <Option key={transaction.id} value={transaction.id}>
                        {transaction.paymentNumber}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="Nama Pemegang Rekening">
              {getFieldDecorator('fullname', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>

            {/* BEGIN Upload Image */}
            <div>
              <div className="text-label">Lampirkan Bukti Transfer</div>
              <div className="text-label">
                <i>* Ukuran maksimal foto 5MB.</i>
              </div>
              <div className="my-2">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.onChangeUpload}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ maxWidth: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
            {/* END Upload Image */}

            <FormItem label="Rekening Tujuan">
              {getFieldDecorator('bankAccountId', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(
                <Select style={{ width: '100%' }} placeholder="Pilih">
                  {this.props.paymentMethods
                    ? this.props.paymentMethods[0].banks.map((bank) => (
                      <Option key={bank.id} value={bank.id}>
                        {bank.name}
                      </Option>
                      ))
                    : null}
                </Select>
              )}
            </FormItem>

            <FormItem label="Transfer dari Bank">
              {getFieldDecorator('bankTransferFrom', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(
                <Select style={{ width: '100%' }} placeholder="Pilih">
                  {banks.map((bank) => (
                    <Option key={bank} value={bank}>
                      {bank}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="Jumlah yang ditransfer">
              {getFieldDecorator('totalPayment', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              )}
            </FormItem>

            <FormItem label="Tanggal Transfer">
              {getFieldDecorator('transferDate', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(
                <DatePicker
                  id="date"
                  onChange={this.onChangeDate}
                  placeholder="Pilih"
                  disabledDate={this.disabledDate}
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </FormItem>
          </Form>

          <FormItem>
            <Button
              id="buttonPaymentConfirmation"
              className="btn-block"
              type="primary"
              htmlType="submit"
              disabled={!this.state.imageUrl ? true : false }
              loading={this.props.loading || this.props.upload.loading}
              onClick={this.handleSubmit}
            >
              Konfirmasi
            </Button>
          </FormItem>
        </div>
        {/* END FORM */}
      </div>
    );
  }
}

const PaymentConfirmationForm = Form.create()(PaymentConfirmationPage);

const mapStateToProps = (state) => ({
  upload: state.get('upload'),
  authentication: state.get('authentication'),
  paymentMethods: state.get('paymentMethod').paymentMethods,
  paymentConfirmation: state.get('paymentConfirmation'),
  loading: state.get('paymentConfirmation').loading,
  transactions: state.get('transaction').transactions,
});

const mapDispatchToProps = (dispatch) => ({
  postUploadImage: (data) => dispatch(actions.postUploadImage(data)),
  getTransactions: (data) => dispatch(actions.getTransactions(data)),
  getPaymentMethods: () => dispatch(actions.getPaymentMethods()),
  postPaymentConfirmation: (data) =>
    dispatch(actions.postPaymentConfirmation(data)),
  storePaymentConfirmation: (data) =>
    dispatch(actions.storePaymentConfirmation(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentConfirmationForm);
