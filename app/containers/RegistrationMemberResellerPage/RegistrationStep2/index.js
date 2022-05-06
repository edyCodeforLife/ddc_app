import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';

import validationMessages from '../../../utils/configs/validationMessages';
import * as actions from '../../../actions/index';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class RegistrationStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectProvince = this.handleSelectProvince.bind(this);
    this.handleSelectCity = this.handleSelectCity.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    if (this.props.formData) {
      this.props.form.setFieldsValue(this.props.formData);
    }
    if (!this.props.formData.provinceId) {
      this.props.getDataProvince();
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
        this.props.storeRegistrationStep2(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="registrasi">
        <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
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
          <FormItem>
            <Button
              className="btn-block"
              type="primary"
              size={'large'}
              htmlType="submit"
            >
              Selanjutnya
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const registrationStep2 = Form.create()(RegistrationStep2);

const mapStateToProps = (state) => ({
  formData: state.get('registrationMemberReseller').formData,
  province: state.get('registrationMemberReseller').dataProvince,
  city: state.get('registrationMemberReseller').dataCity,
  district: state.get('registrationMemberReseller').dataDistrict,
});

const mapDispatchToProps = (dispatch) => ({
  storeRegistrationStep2: (form) =>
    dispatch(actions.storeRegistrationStep2(form)),
  getDataProvince: () => dispatch(actions.getDataProvince()),
  getDataCity: (provinceId) => dispatch(actions.getDataCity(provinceId)),
  getDataDistrict: (cityId) => dispatch(actions.getDataDistrict(cityId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registrationStep2);
