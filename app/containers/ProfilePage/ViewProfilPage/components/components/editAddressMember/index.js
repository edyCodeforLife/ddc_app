import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Checkbox, message, Row } from 'antd';
import { Redirect } from 'react-router-dom';
import constant from '../../../../../../utils/configs/constant';
import validationMessages from '../../../../../../utils/configs/validationMessages';
import * as actions from '../../../../../../actions/index';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class EditMemberAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      provinceId: null,
      default: 1,
      checkValueCondition: false,
      checkValue: 0,
      a: null,
      index: this.props.match.params.index,
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
    if(
      this.props.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index].default === 1 
    ) {
        this.setState({
          checkValueCondition:!this.state.checkValueCondition,
          checkValue:true,
        });
    }else if( this.props.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress[this.state.index].default === 0 )
      {
        this.setState({
          checkValueCondition:!this.state.checkValueCondition,
          checkValue:true,
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
    // console.log(value);
    this.props.form.setFieldsValue({
      cityId: null,
      districtId: null,
    });
    this.props.getDataCity(value);
  }

  handleAlamatKirim = (e) => {
    this.setState({
      cheked: e.target.value,
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.default = 1;
        values.name,
        values.receiverName,
        this.props.submitUpdateMemberAddress(
          values,
          this.props.token,
          this.props.memberDeliveryAddress.memberDeliveryAddress[
            this.state.index
          ].id
        );
      }
    });
  };

  render() {
    const checked = !this.state.checkValueCondition ? 'true' : 'false';
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const provinceId = this.state.provinceId;
    if (this.props.formSuccess) {
      console.log(this.props.formSuccess);
      message.success('Edit alamat sukses');
      this.props.updateMemberAddressReset();
      this.props.history.goBack();
    }
    const { getFieldDecorator } = this.props.form;

    return (
      this.props.memberDeliveryAddress &&
      this.props.memberDeliveryAddress.memberDeliveryAddress && (
        <Row style={{ marginTop: -50 }}>
          <div className="registrasi">
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <FormItem>
                {getFieldDecorator('name', {
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].name,
                })(<Input type="hidden" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('receiverName', {
                  initialValue: this.props.memberDeliveryAddress
                    .memberDeliveryAddress[this.state.index].receiverName,
                })(<Input type="hidden" />)}
              </FormItem>
              <FormItem label="Alamat">
                {getFieldDecorator('address', {
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
                  ],
                })(<Input type="number" />)}
              </FormItem>
              {/* <div>
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
                          this.props.memberDeliveryAddress
                            .memberDeliveryAddress[this.state.index].default
                        )
                      }
                      checked={this.state.checkValue}
                    >
                      alamat Pengiriman sama dengan diatas
                    </Checkbox>
                  )}
                </FormItem>
              </div> */}
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
          </div>
        </Row>
      )
    );
  }
}

const editMemberAddress = Form.create()(EditMemberAddress);

const mapStateToProps = (state) => ({
  formData: state.get('registrationMemberReseller').formData,
  province: state.get('registrationMemberReseller').dataProvince,
  city: state.get('registrationMemberReseller').dataCity,
  district: state.get('registrationMemberReseller').dataDistrict,
  token: state.get('authentication').token,
  member: state.get('authentication').member,
  authentication: state.get('authentication'),
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  loading: state.get('updateProfil').loading,
  memberDeliveryAddress: state.get('updateProfil').formData,
});

const mapDispatchToProps = (dispatch) => ({
  submitUpdateMemberAddress: (form, token, id) =>
    dispatch(actions.submitUpdateMemberAddress(form, token, id)),
  updateMemberAddressReset: () => dispatch(actions.updateMemberAddressReset()),
  getDataProvince: () => dispatch(actions.getDataProvince()),
  getDataCity: (provinceId) => dispatch(actions.getDataCity(provinceId)),
  getDataDistrict: (cityId) => dispatch(actions.getDataDistrict(cityId)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editMemberAddress);
