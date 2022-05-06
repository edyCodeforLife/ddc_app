import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Row } from 'antd';

import validationMessages from '../../../../utils/configs/validationMessages';
import * as actions from '../../../../actions/index';
import SearchResult from './components/searchResult';
import ReviewTDS from './components/ReviewsTDS';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

class searchTds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      cityName: null,
      provinceName: null,
      name: null,
      showReview: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectProvince = this.handleSelectProvince.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      hideBurgerMenu: false,
      showFooter: false,
      showCart: true,
      showProfile: true,
    });
    if (this.props.formData) {
      this.props.form.setFieldsValue(this.props.formData);
    }
    this.props.getDataProvince();
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getReviewsTDS(token);
    }
  }
  /**
   * Select Province and get Dropdown City
   */
  handleSelectProvince(value) {
    this.props.form.setFieldsValue({
      cityId: null,
    });
    this.props.getDataCity(value);
  }

  /**
   * Select City and get Dropdown District
   */
  // handleSelectCity(value) {
  //   this.props.form.setFieldsValue({
  //     districtId: null,
  //   });
  // }
  // let data = {};
  // if (values.name.length > 0) {
  //   data = {
  //     query: `managerName:${values.name}`,
  //   };
  // }
  onClickShowReview = (flag, id) => {
    this.setState({
      showReview: flag,
      id,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          query: `cityId:${values.cityId}`,
        };
        this.props.searchTds(data);
        const province = this.props.provinces.find(
          (data) => data.id === values.provinceId
        );
        const city = this.props.cities.find(
          (data) => data.id === values.cityId
        );
        this.setState({
          provinceName: province.name,
          cityName: city.name,
        });
      }
    });
  };

  handleChange = (e) => {
    if (e.length > 0) {
      const data = {
        query: `name__icontains:${e}`,
      };
      this.setState({
        name: e,
      });
      this.props.searchTds(data);
    }
    this.props.form.setFieldsValue({
      provinceId: null,
      cityId: null,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.isAuthenticated ? (
      <React.Fragment>
        <div className="search__cari-tds">
          <div>
            <div className="top__search--tds" style={{ paddingBottom: '15px' }}>
              <div className="titip__dropship-title">Titip Dropship</div>
              <div className="font-weight-bold">
                Cari Member Terdekat dengan Customer Anda
              </div>
              <div className="titip__dropship-title--desc mt-10">
                Ongkir kemahalan ? jangan khawatir Anda bisa pesan dari reseller
                yang melayani Titip Dropship yang sudah tersebar diberbagai kota
                besar diseluruh indonesia. Lakukan pesanan via jalur pribadi
                dengan kontak langsung ke reseller Titip Dropship.
              </div>
            </div>
            <div className="bottom__search--tds" style={{ background: '#fff' }}>
              <div style={{ padding: '15px' }}>
                <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
                  <FormItem label="Provinsi Tujuan Pengiriman">
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
                        {this.props.provinces !== null
                          ? this.props.provinces.map((data) => (
                            <Option key={data.id} value={data.id}>
                              {data.name}
                            </Option>
                            ))
                          : null}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem label="Kota Tujuan Pengiriman">
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
                      >
                        {this.props.cities !== null
                          ? this.props.cities.map((data) => (
                            <Option key={data.id} value={data.id}>
                              {data.name}
                            </Option>
                            ))
                          : null}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem>
                    <Button
                      className="btn-block"
                      type="primary"
                      size={'large'}
                      htmlType="submit"
                      loading={this.props.loading}
                    >
                      Cari
                    </Button>
                  </FormItem>
                </Form>
              </div>
              <Row style={{ marginTop: -25 }}>
                <div className="searchByName--tds">
                  <div className="title__search-tds mb-10">
                    Atau bisa cari dengan mengetik nama langganan Titip Dropship
                    Anda.
                  </div>
                  <Search
                    placeholder="Cari Nama Langganan Anda"
                    onSearch={this.handleChange}
                  />
                </div>
              </Row>
            </div>
          </div>
        </div>
        {(this.state.cityName !== null || this.state.name !== null) && (
          <React.Fragment>
            <Row type="flex" align="middle">
              <div className="view__result-search">
                <React.Fragment>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      paddingBottom: 15,
                    }}
                  >
                    Hasil untuk :
                    {this.state.cityName !== null && this.state.name == null ? (
                      <span
                        className="label__result-tds"
                        style={{ paddingLeft: 10 }}
                      >
                        {this.state.cityName}, {this.state.provinceName}
                      </span>
                    ) : (
                      this.state.cityName === null &&
                      this.state.name !== null && (
                        <span
                          className="label__result-tds"
                          style={{ paddingLeft: 10 }}
                        >
                          {`"${this.state.name}"`}
                        </span>
                      )
                    )}
                  </div>
                </React.Fragment>
              </div>
            </Row>
            {this.props.tdsNearby &&
              this.props.tdsNearby.map((tds) => (
                <Row style={{ marginTop: '-15px' }}>
                  <div style={{ padding: '0px 0px' }}>
                    <SearchResult
                      list={tds}
                      onClickShowReview={this.onClickShowReview}
                    />
                  </div>
                </Row>
              ))}
          </React.Fragment>
        )}
        {this.state.showReview && (
          <Row style={{ marginRight: '-15px', marginLeft: '-15px' }}>
            {
              <ReviewTDS
                id={this.state.id}
                member={this.props.member}
                onClickShowReview={() => this.onClickShowReview()}
              />
              // ))
            }
          </Row>
        )}
      </React.Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

const SearchTds = Form.create()(searchTds);

const mapStateToProps = (state) => ({
  formData: state.get('registrationMemberReseller').formData,
  provinces: state.get('registrationMemberReseller').dataProvince,
  cities: state.get('registrationMemberReseller').dataCity,
  isAuthenticated: state.get('authentication').isAuthenticated,
  member: state.get('authentication').member,
  district: state.get('registrationMemberReseller').dataDistrict,
  tdsNearby: state.get('searchtds').tdsNearby,
  formSuccess: state.get('searchtds').formSuccess,
  memberStore: state.get('updateProfil').formData,
  reviewTDS: state.get('reviewTDS').data,
});

const mapDispatchToProps = (dispatch) => ({
  getReviewsTDS: (data) => dispatch(actions.getReviewsTDS(data)),
  searchTds: (form) => dispatch(actions.getTdsNearby(form)),
  getDataProvince: () => dispatch(actions.getDataProvince()),
  getDataCity: (provinceId) => dispatch(actions.getDataCity(provinceId)),
  getDataDistrict: (cityId) => dispatch(actions.getDataDistrict(cityId)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTds);
