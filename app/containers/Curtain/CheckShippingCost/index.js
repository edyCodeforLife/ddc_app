import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Col, Row, InputNumber, Select } from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PerfectScrollbar from 'react-perfect-scrollbar';

import * as actions from '../../../actions';
import constant from './../../../utils/configs/constant';

const { Option, OptGroup } = Select;
export class CheckShippingCost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      orderQuantity: 1,
      totalWeight: 0,
      destinationBranch: {},
      provinces: null,
      district: null,
      city: null,
      provinceId: null,
      cityId: null,
      branchId: null,
      destinationDistrictId: null,
      provinceName: null,
      cityName: null,
      districtName: null,
      shippingCost: null,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.getProvinces();
    this.props.getTdsCity();
    if (
      this.props.product.grossWeight !=
      this.state.totalWeight / this.state.orderQuantity
    ) {
      /**
       * Gross Weight
       * If Volume is Bigger dan Weight, use Volume
       */
      let grossWeight =
        (this.props.product.packageDimensionsLength *
          this.props.product.packageDimensionsWidth *
          this.props.product.packageDimensionsHeight) /
        constant.CONFIG_ORDER.GROSS_WEIGHT_FACTOR;

      if (this.props.product.grossWeight > grossWeight) {
        grossWeight = this.props.product.grossWeight;
      }
      this.setState({
        totalWeight: grossWeight * this.state.orderQuantity,
      });
    }
    this.props.getTdsCity({ productId: this.props.product.id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.success !== prevProps.success) {
      if (this.props.provinces && this.props.tdsByCity) {
        // if(this.props.provinces == prevProps.tdsNearby){
        const provinces = this.props.provinces.map((province) => {
          const cektds = this.props.tdsByCity.filter(
            (tds) => tds.provinceId === province.id
          );
          province.countBranch = cektds.length;
          return province;
        });
        this.setState({
          provinces,
        });
      }
    }
    if (this.props.cities !== prevProps.cities) {
      if (this.props.cities !== null) {
        const city = this.props.cities.map((city) => {
          const cektds = this.props.tdsByCity.filter(
            (tds) => tds.cityId === city.id
          );
          city.countBranch = cektds.length;
          return city;
        });
        this.setState({
          city,
        });
      }
    }
    if (this.props.districts !== prevProps.districts) {
      if (this.props.districts !== null) {
        const district = this.props.districts.map((district) => {
          const cektds = this.props.tdsByCity.filter(
            (tds) => tds.districtId === district.id
          );
          district.countBranch = cektds.length;
          return district;
        });
        this.setState({
          district,
        });
      }
      // console.log(this.state.district.id);
    }
    // if(this.props.provinces == prevProps.tdsNearby){
  }
  /**
   * Order Quantity onChange
   * @param {number} orderQuantity
   */
  changeOrderQuantity = (orderQuantity) => {
    /**
     * Gross Weight
     * If Volume is Bigger dan Weight, use Volume
     */
    let grossWeight =
      (this.props.product.packageDimensionsLength *
        this.props.product.packageDimensionsWidth *
        this.props.product.packageDimensionsHeight) /
      constant.CONFIG_ORDER.GROSS_WEIGHT_FACTOR;

    if (this.props.product.grossWeight > grossWeight) {
      grossWeight = this.props.product.grossWeight;
    }

    this.setState(
      {
        orderQuantity,
        totalWeight: grossWeight * orderQuantity,
      },
      () => {
        if (this.state.destinationDistrictId) {
          this.getShippingCost();
        }
      }
    );
  };

  /**
   * Select provinceId from dropdown
   * @param {number} provinceId
   */
  selectProvince = (provinceId) => {
    // console.log(provinceId);
    this.props.getCities(provinceId);
    this.setState({
      provinceId,
      cityId: null,
      branchId: null,
    });
  };

  /**
   * Select cityId from dropdown
   * @param {number} cityId
   */
  selectCity = (cityId) => {
    // console.log(cityId);
    this.props.getDistricts(cityId);

    this.setState({
      cityId,
      districtId: null,
      branchId: null,
    });
  };

  /**
   * Select districtId from dropdown
   * @param {number} districtId
   */
  selectDistrict = (districtId) => {
    // console.log(cityId);

    // Get Object
    const province = this.props.provinces.find(
      (data) => data.id === this.state.provinceId
    );
    const city = this.props.cities.find(
      (data) => data.id === this.state.cityId
    );
    const district = this.props.districts.find(
      (data) => data.id === districtId
    );

    const data = {
      provinceName: province.name,
      cityName: city.name,
      districtName: district.name,
      cityId: this.state.cityId,
    };
    this.props.getBranchesNearby(data);

    this.setState({
      districtId,
      provinceName: province.name,
      cityName: city.name,
      districtName: district.name,
      branchId: null,
    });
  };

  /**
   * Select Branch index from dropdown
   * @param {number} value // Kilometer
   */
  selectBranch = (branchId) => {
    // console.log(branchId);
    // Get Object
    let destinationBranch = null;
    if (this.props.tdsByCity) {
      destinationBranch = this.props.tdsByCity.find(
        (data) => data.id === branchId
      );
    }
    // console.log(destinationBranch);

    // let destinationBranch = null;
    // if (this.props.branches.byDistance) {
    //   destinationBranch = this.props.branches.byDistance.find(
    //     (data) => data.id === branchId
    //   );
    // }
    // if (this.props.branches.byCity && !destinationBranch) {
    //   destinationBranch = this.props.branches.byCity.find(
    //     (data) => data.id === branchId
    //   );
    // }

    this.setState(
      {
        branchId,
        destinationBranch,
        destinationDistrictId: destinationBranch.districtId,
      },
      () => {
        this.getShippingCost();
      }
    );
  };

  /**
   * Get List Shipping Cost
   */
  getShippingCost = () => {
    const data = {
      origin: this.state.districtId,
      destination: this.state.destinationDistrictId,
      weight: Math.ceil(this.state.totalWeight), // gram
      senderPosCode: this.state.districtId,
      receiverPosCode: this.state.destinationDistrictId,
      itemValue: 0,
    };
    this.props.getShippingCost(data);
  };

  render() {
    console.log(this.state.district);
    const disabled = this.state.disabled ? 'none' : '';
    const perfectScrollbarOption = { suppressScrollX: true };
    return (
      <PerfectScrollbar option={perfectScrollbarOption}>
        <div
          className=""
          style={{
            backgroundColor: '#fafafa',
            paddingTop: 70,
            height: 'inherit',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: 15,
              boxShadow: '0 0 2px 0 #28282833',
            }}
          >
            <div className="font-weight-bold">
              {this.props.product !== null && this.props.product.name}
            </div>
            {/* BEGIN Quantity */}
            <Row className="my-2" type="flex" align="bottom">
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 10 }}>
                  Jumlah Barang
                </div>
                <InputNumber
                  min={1}
                  max={1000}
                  value={this.state.orderQuantity}
                  onChange={this.changeOrderQuantity}
                />
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12 }}>Berat Total</div>
                <div className="font-weight-bold">
                  <NumberFormat
                    value={this.state.totalWeight / 1000}
                    displayType={'text'}
                    thousandSeparator
                  />{' '}
                  kg
                </div>
              </Col>
            </Row>
            {/* END Quantity */}
          </div>

          {/* BEGIN Destination */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: 15,
              boxShadow: '0 0 2px 0 #28282833',
              marginTop: 15,
            }}
          >
            <div className="font-weight-bold">Tujuan Pengiriman</div>

            {/* BEGIN Provinces */}
            <div className="my-3">
              <div className="order__label">Provinsi</div>
              <div className="my-2">
                <Select
                  showSearch
                  value={this.state.provinceId}
                  style={{ width: '100%' }}
                  placeholder="Provinsi"
                  optionFilterProp="children"
                  onChange={this.selectProvince}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.provinces &&
                    this.state.provinces.map(
                      (province) =>
                        province.countBranch > 0 && (
                          <Option value={province.id} key={province.id}>
                            {province.name}
                          </Option>
                        )
                    )}
                </Select>
              </div>
            </div>
            {/* END Provinces */}

            {/* BEGIN Cities */}
            <div className="my-3">
              <div className="order__label">Kota/Kabupaten</div>
              <div className="my-2">
                <Select
                  showSearch
                  value={this.state.cityId}
                  disabled={!this.state.provinceId}
                  style={{ width: '100%' }}
                  placeholder="Kota/Kabupaten"
                  optionFilterProp="children"
                  onChange={this.selectCity}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.city &&
                    this.state.city.map(
                      (city) =>
                        city.countBranch > 0 && (
                          <Option value={city.id} key={city.id}>
                            {city.name}
                          </Option>
                        )
                    )}
                </Select>
              </div>
            </div>
            {/* END Cities */}

            {/* BEGIN Districts */}
            <div className="my-3">
              <div className="order__label">Kecamatan</div>
              <div className="my-2">
                <Select
                  showSearch
                  value={this.state.districtId}
                  disabled={!this.state.cityId}
                  style={{ width: '100%' }}
                  placeholder="Kecamatan"
                  optionFilterProp="children"
                  onChange={this.selectDistrict}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.district &&
                    this.state.district.map(
                      (district) =>
                        district.countBranch > 0 && (
                          <Option value={district.id} key={district.id}>
                            {district.name}
                          </Option>
                        )
                    )}
                </Select>
              </div>
            </div>
            {/* END Districts */}

            {/* BEGIN Branches */}
            <div className="my-3">
              <div className="order__label">Dikirim Oleh</div>
              <div className="my-2">
                <Select
                  // showSearch
                  // value={this.state.districtId}
                  onChange={this.selectBranch}
                  disabled={!this.state.districtId}
                  style={{ width: '100%' }}
                  placeholder="Pilih"
                  // optionFilterProp="children"
                  // onChange={this.selectBranch}
                  // filterOption={(input, option) =>
                  //   option.props.children
                  //     .toLowerCase()
                  //     .indexOf(input.toLowerCase()) >= 0
                  // }
                >
                  {this.props.tdsByCity &&
                    this.state.district &&
                    this.props.tdsByCity.map(
                      (branch) =>
                        branch.districtId === this.state.districtId && (
                          <Option value={branch.id}>{branch.name}</Option>
                        )
                    )}
                  {/* {this.props.branchesNearby && (
                    <OptGroup label="Terdekat">
                      {this.props.branchesNearby.byDistance &&
                        this.props.branchesNearby.byDistance
                          .slice(0, 10)
                          .map((branch) => (
                            <Option value={branch.id}>
                              {branch.name} (
                              <NumberFormat
                                value={branch.value / 1000}
                                displayType={'text'}
                                thousandSeparator
                                decimalScale={1}
                                suffix={' km'}
                              />
                              )
                            </Option>
                          ))}
                    </OptGroup>
                  )}
                  {this.props.branchesNearby && (
                    <OptGroup label="Berdasarkan Kota (Area)">
                      {this.props.branchesNearby.byCity &&
                        this.props.branchesNearby.byCity
                          .slice(0, 10)
                          .map((branch) => (
                            <Option value={branch.id}>{branch.name}</Option>
                          ))}
                    </OptGroup>
                  )} */}
                </Select>
              </div>
            </div>
            {/* END Branches */}

            <div className="order__delivery__branch__address">
              {this.state.destinationBranch && (
                <div>
                  <div className="font-weight-bold">
                    {this.state.destinationBranch.name}
                  </div>
                  <div>{this.state.destinationBranch.managerPhone}</div>
                  <br />
                  <div>{this.state.destinationBranch.address}</div>
                </div>
              )}
            </div>
            <div className="mt-4 font-weight-bold">Estimasi Biaya</div>
          </div>
          {/* END Destination */}

          {/* BEGIN SHOW SHIPPING */}
          <div style={{ minHeight: 200 }}>
            {this.props.shippingCost && (
              <table className="font-weight-bold table__ongkir">
                {this.props.shippingCost.map(
                  (data) =>
                    data.fee && (
                      <tr key={data.image}>
                        <td>
                          <img
                            src={data.image}
                            style={{ maxWidth: 150, maxHeight: 50 }}
                          />
                        </td>
                        <td>{data.etd}</td>
                        <td>
                          <NumberFormat
                            value={data.fee}
                            displayType={'text'}
                            thousandSeparator
                            prefix={'Rp. '}
                          />
                        </td>
                      </tr>
                    )
                )}
              </table>
            )}
          </div>
          {/* END SHOW SHIPPING */}
        </div>
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.get('product').product,
  provinces: state.get('order').provinces,
  cities: state.get('order').cities,
  districts: state.get('order').districts,
  branchesNearby: state.get('order').branches,
  branches: state.get('order').branchesNearby,
  shippingCost: state.get('order').shippingCost,
  tdsNearby: state.get('searchtds').tdsNearby,
  success: state.get('ListTdsByCity'),
  tdsByCity: state.get('ListTdsByCity').tdsNearby,
});

const mapDispatchToProps = (dispatch) => ({
  getTdsCity: (form) => dispatch(actions.getTdsCity(form)),
  searchTds: (form) => dispatch(actions.getTdsNearby(form)),
  getProvinces: () => dispatch(actions.getProvinces()),
  getCities: (provinceId) => dispatch(actions.getCities(provinceId)),
  getDistricts: (cityId) => dispatch(actions.getDistricts(cityId)),
  getBranchesNearby: (data) => dispatch(actions.getBranchesNearby(data)),
  getShippingCost: (data) => dispatch(actions.getShippingCost(data)),
  getTdsNearbyReset: () => dispatch(actions.getTdsNearbyReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckShippingCost);
