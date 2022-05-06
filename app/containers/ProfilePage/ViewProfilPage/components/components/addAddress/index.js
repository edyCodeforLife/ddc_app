import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, message } from 'antd';
import { Redirect } from 'react-router-dom';
import constant from '../../../../../../utils/configs/constant';

import validationMessages from '../../../../../../utils/configs/validationMessages';
import * as actions from '../../../../../../actions/index';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      labelAlamat: [
        {
          id: '1',
          name: 'Kantor',
        },
        {
          id: '2',
          name: 'Rumah',
        },
        {
          id: '3',
          name: 'Tempat Usaha',
        },
      ],
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
      title: 'Tambah Alamat',
      hideBurgerMenu: true,
      showFooter: false,
    });
    this.props.getDataProvince();
  }

  /**
   * Select Province and get Dropdown City
   */
  handleSelectProvince(value) {
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
    this.props.form.setFieldsValue({
      districtId: null,
    });
    this.props.getDataDistrict(value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.default = 0;
        if (
          this.props.memberDeliveryAddress &&
          this.props.memberDeliveryAddress.memberDeliveryAddress.length > 0
        ) {
          this.props.submitAddAddress(values, this.props.token);
        } else {
          values.default = 1;
          this.props.submitAddAddress(values, this.props.token);
        }
      }
    });
  };

  render() {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    if (this.props.formSuccess) {
      message.success('Alamat Berhasil ditambahkan');
      this.props.addAddressReset();
      this.props.history.goBack();
    }

    return (
      <div className="registrasi">
        <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
          <FormItem label="Label Alamat">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: validationMessages.LABEL_ADDRESS_REQUIRED,
                },
              ],
            })(<Input type="text" />)}
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
          <FormItem label="Nama Penerima">
            {getFieldDecorator('receiverName', {
              rules: [
                {
                  required: true,
                  message: validationMessages.RECEIVER_NAME_REQUIRED,
                },
              ],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="No.Handphone">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: validationMessages.PHONE_NUMBER_REQUIRED,
                },
                {
                  pattern: constant.REGEX_PHONE_NUMBER,
                  message: validationMessages.PHONE_INVALID,
                },
                {
                  pattern: constant.REGEX_NUMBER_ONLY,
                  message: validationMessages.PHONE_NUMBER_ONLY,
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
            })(<Input />)}
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
          <FormItem>
            <Button
              className="btn-block"
              type="primary"
              size={'large'}
              htmlType="submit"
              loading={this.props.loading}
            >
              Tambah
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const addAddress = Form.create()(AddAddress);

const mapStateToProps = (state) => ({
  formData: state.get('registrationMemberReseller').formData,
  province: state.get('registrationMemberReseller').dataProvince,
  city: state.get('registrationMemberReseller').dataCity,
  district: state.get('registrationMemberReseller').dataDistrict,
  token: state.get('authentication').token,
  authentication: state.get('authentication'),
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  loading: state.get('updateProfil').loading,
  memberDeliveryAddress: state.get('updateProfil').formData,
});

const mapDispatchToProps = (dispatch) => ({
  submitAddAddress: (form, token) =>
    dispatch(actions.submitAddAddress(form, token)),
  getDataProvince: () => dispatch(actions.getDataProvince()),
  getDataCity: (provinceId) => dispatch(actions.getDataCity(provinceId)),
  getDataDistrict: (cityId) => dispatch(actions.getDataDistrict(cityId)),
  addAddressReset: () => dispatch(actions.addAddressReset()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addAddress);
