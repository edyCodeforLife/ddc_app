import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Checkbox, message, Row } from 'antd';
import constant from '../../../../../../utils/configs/constant';

import validationMessages from '../../../../../../utils/configs/validationMessages';
import * as actions from '../../../../../../actions/index';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class RegistrationStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      index: this.props.match.params.index,
      checkValueCondition: false,
      checkValue: 0,
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
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Edit Alamat',
      hideBurgerMenu: true,
      showFooter: false,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
    if (this.props.formData) {
      this.props.form.setFieldsValue(this.props.formData);
    }
    this.props.getDataProvince();
    this.props.getDataCity(
      this.props.memberDeliveryAddress &&
        this.props.memberDeliveryAddress.memberDeliveryAddress &&
        this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index]
          .provinceId
    );
    this.props.getDataDistrict(
      this.props.memberDeliveryAddress &&
        this.props.memberDeliveryAddress.memberDeliveryAddress &&
        this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index]
          .cityId
    );

    if (
      this.props.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index]
        .default === 1
    ) {
      this.setState({
        checkValueCondition: true,
        checkValue: 1,
      });
    }
    if (
      this.props.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index]
        .default === 0
    ) {
      this.setState({
        checkValueCondition: false,
        checkValue: 0,
      });
    }
  }

  componentDidUpdate (prevProps, prevState){
    if (this.props.memberDeliveryAddress !== prevProps.memberDeliveryAddress )
     {
      this.props.getDataCity(
        this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index]
          .provinceId
      );
      this.props.getDataDistrict(
        this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index]
          .cityId
      );
    }
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
      if ((this.state.checkValue === 1)) {
        values.default = 1;
      }
      if ((this.state.checkValue === 0)) {
        values.default = 0;
      }
      console.log(values.default);
      if (!err) {
        this.props.submitUpdateAddress(
          values,
          this.props.token,
          this.props.memberDeliveryAddress.memberDeliveryAddress[
            this.state.index
          ].id
        );
      }
    });
  };
  handleSelect = (id) => {
    let checkValue = 0;
    if (!this.state.checkValueCondition) {
      checkValue = 1;
    }
    this.setState({
      checkValueCondition: !this.state.checkValueCondition,
      checkValue,
    });
  };
  render() {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const checked = !this.state.checkValueCondition ? 'true' : 'false';

    const style = {
      background: '#fff',
      marginLeft: '-15px',
      marginRight: '-15px',
      marginTop: '-15px',
    };
    const paddingRow = {
      padding: '15px',
    };
    const paddingRows = {
      padding: '20px',
    };

    if (this.props.formSuccess) {
      message.success('Alamat berhasil diperbaharui');
      this.props.updateAddressReset();
      this.props.history.goBack();
    }
    const { getFieldDecorator } = this.props.form;

    return (
      this.props.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress && (
        <div className="registrasi" style={style}>
          <Row style={paddingRow}>
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <FormItem label="Label Alamat">
                {getFieldDecorator('name', {
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].name,
                  rules: [
                    {
                      required: true,
                      message: validationMessages.LABEL_ADDRESS_REQUIRED,
                    },
                  ],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="Nama Penerima">
                {getFieldDecorator('receiverName', {
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].receiverName,
                  rules: [
                    {
                      required: true,
                      message: validationMessages.LAST_NAME_REQUIRED,
                    },
                  ],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="No.Handphone">
                {getFieldDecorator('phone', {
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].phone,
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
              <FormItem label="Alamat">
                {getFieldDecorator('Address', {
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].Address,
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
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].provinceId,
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
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].cityId,
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
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].districtId,
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
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].postalCode,
                  rules: [
                    {
                      required: true,
                      message: validationMessages.POSTAL_CODE_REQUIRED,
                    },
                    {
                      pattern: constant.REGEX_NUMBER_ONLY,
                      message: validationMessages.POSTAL_CODE_REQUIRED_NUMBER,
                    },
                  ],
                })(<Input type="number" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('default', {
                  initialValue: this.state.checkValue,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Checkbox
                    onChange={() =>
                      this.handleSelect(
                        this.props.memberDeliveryAddress.memberDeliveryAddress[
                          this.state.index
                        ].default
                      )
                    }
                    checked={this.state.checkValue}
                  >
                    Jadikan sebagai default alamat Pengiriman
                  </Checkbox>
                )}
              </FormItem>
              {/* <Form.Item>

                <Checkbox
                  value={this.state.checkValue}
                  onChange={() =>
                    this.handleSelect(
                      this.props.memberDeliveryAddress.memberDeliveryAddress[
                        this.state.index
                      ].default
                    )
                  }
                  checked={this.state.checkValue === 1}
                >
                  Jadikan sebagai default alamat Pengiriman
                </Checkbox>
              </Form.Item> */}
              <FormItem>
                <Button
                  className="btn-block"
                  type="primary"
                  size={'large'}
                  htmlType="submit"
                  loading={this.props.loading}
                >
                  Simpan
                </Button>
              </FormItem>
            </Form>
          </Row>
        </div>
      )
    );
  }
}

const registrationStep2 = Form.create()(RegistrationStep2);

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
  submitUpdateAddress: (form, token, id) =>
    dispatch(actions.submitUpdateAddress(form, token, id)),
  updateAddressReset: () => dispatch(actions.updateAddressReset()),
  getDataProvince: () => dispatch(actions.getDataProvince()),
  getDataCity: (provinceId) => dispatch(actions.getDataCity(provinceId)),
  getDataDistrict: (cityId) => dispatch(actions.getDataDistrict(cityId)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registrationStep2);
