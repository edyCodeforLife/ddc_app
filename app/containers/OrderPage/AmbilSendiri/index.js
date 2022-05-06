import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select, Checkbox, Button, Row, Icon } from 'antd';

import * as actions from '../../../actions/index';
import AddToCart from '../AddToCart';

const { Option, OptGroup } = Select;
class AmbilSendiri extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.isChange) {
      // console.log('Ambil Sendiri, Change Branch');
      this.state = {
        provinces: null,
        cities: null,
        originBranch: null,
        provinceId: null,
        cityId: null,
        branchId: null,
        setDefaultBranchForAmbilSendiri: false,
        isFreeShipping: true,
        disableSubmitButton: true,
        disableOrderButton: true,
        ...this.props.order,
      };
    } else {
      // console.log('Ambil Sendiri, Default Branch');
      this.state = {
        provinces: null,
        cities: null,
        originBranch: {},
        provinceId: null,
        cityId: null,
        branchId: null,
        isFreeShipping: true,
        disableOrderButton: true,
        setDefaultBranchForAmbilSendiri: false,
        ...this.props.order,
      };
    }

    this.onSubmitAmbilSendiri = this.onSubmitAmbilSendiri.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.getProvinces();
    this.props.getTdsCity({ productid: this.props.productId });

    if (this.props.isChange) {
      // Change default branch
      // this.props.getCities(this.state.provinceId);
      // const data = {
      //   query: `cityId:${this.state.cityId}`,
      // };
      // this.props.getBranches(data);
      // this.selectBranches(this.state.branchId);
    } else if (this.props.authentication.isAuthenticated) {
      // Get Default Branch
      const memberUuid = this.props.authentication.member.uuid;
      this.props.getDefaultBranchForAmbilSendiri(memberUuid);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.order !== prevProps.order) {
      this.setState({
        ...this.props.order,
      });

      // Store to Redux
      this.props.storePurchaseProduct({ order: this.props.order });
    }

    /**
     * Only Show Provinces with TDS
     */
    if (this.props.provinces && this.props.tdsByCity !== prevProps.tdsByCity) {
      const provinces = this.props.provinces.map((province) => {
        const cektds = this.props.tdsByCity.filter(
          (tds) =>
            tds.provinceId === province.id &&
            tds.productQuantity >=
              this.props.purchaseProduct.order.orderQuantity
        );
        province.countBranch = cektds.length;
        return province;
      });
      // && tds.productQuantity >= this.props.purchaseProduct.order.orderQuantity
      this.setState({
        provinces,
      });
    }

    /**
     * Only Show Cities with TDS
     */
    if (this.props.tdsByCity && this.props.cities !== prevProps.cities) {
      if (this.props.cities !== null) {
        const cities = this.props.cities.map((city) => {
          const cektds = this.props.tdsByCity.filter(
            (tds) =>
              tds.cityId === city.id &&
              tds.productQuantity >=
                this.props.purchaseProduct.order.orderQuantity
          );
          city.countBranch = cektds.length;
          // && tds.productQuantity >= this.props.purchaseProduct.order.orderQuantity
          return city;
        });
        this.setState({
          cities,
        });
      }
    }

    /**
     * Check if Branch is TDS or Gudang
     * Reseller can't get cheapest Tier Price if Buy from TDS
     * Store purchase data to Redux
     */
    if (this.state.originBranch !== prevState.originBranch) {
      this.props.storePurchaseProduct({
        originBranch: this.state.originBranch,
      });
    }

    /**
     * Get Default Branch For Ambil Sendiri
     */
    if (
      this.props.defaultBranchForAmbilSendiri.branch !==
        prevProps.defaultBranchForAmbilSendiri.branch &&
      !this.props.isChange
    ) {
      if (this.props.defaultBranchForAmbilSendiri.branch) {
        // console.log(this.props.defaultBranchForAmbilSendiri.branch.provinceId);
        this.setState({
          originBranch: this.props.defaultBranchForAmbilSendiri.branch,
          provinceId: this.props.defaultBranchForAmbilSendiri.branch.provinceId,
          cityId: this.props.defaultBranchForAmbilSendiri.branch.cityId,
          branchId: this.props.defaultBranchForAmbilSendiri.branch.id,
          setDefaultBranchForAmbilSendiri: this.props
            .defaultBranchForAmbilSendiri.setDefault,
        });
      }
    }
  }

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
      disableSubmitButton: true,
      disableOrderButton: true,
    });
  };

  /**
   * Select cityId from dropdown
   * @param {number} cityId
   */
  selectCity = (cityId) => {
    // console.log(cityId);
    const data = {
      productid: this.props.productId,
      query: `cityId:${cityId}`,
    };
    this.props.getBranches(data);

    this.setState({
      cityId,
      branchId: null,
      disableSubmitButton: true,
      disableOrderButton: true,
    });
  };

  /**
   * Select Branches from dropdown
   * @param {number} branchId
   */
  selectBranches = (branchId) => {
    // console.log(branchId);
    let originBranch = null;
    // console.log(this.props.branches);
    if (this.props.branches.Gudang) {
      // Find object branch in Gudang by branchId
      // console.log('Check Gudang');
      originBranch = this.props.branches.Gudang.find(
        (branch) => branch.id === branchId
      );
    }
    // console.log(originBranch);
    if (!originBranch && this.props.branches.TDS) {
      // Find object branch in TDS by branchId
      // console.log('Check TDS');
      originBranch = this.props.branches.TDS.find(
        (branch) => branch.id === branchId
      );
    }
    // console.log(originBranch);
    this.setState({
      branchId,
      originBranch,
      disableSubmitButton: false,
      disableOrderButton: false,
    });
  };

  /**
   * Checkbox Set Branch As Default for Ambil Sendiri
   */
  onCheckSetDefaultBranchForAmbilSendiri = (e) => {
    // console.log(e.target.checked);
    this.setState({
      setDefaultBranchForAmbilSendiri: e.target.checked,
    });
  };

  /**
   * Toggle show curtain
   * @param {string} title
   */
  onClickCurtain(title) {
    const data = {
      show: true,
      title,
    };
    this.props.toggleCurtain(data);
  }

  /**
   * Pass data to OrderPage Component
   * New or Edit
   */
  onSubmitAmbilSendiri() {
    const originBranch = this.state.originBranch;
    // console.log(this.state.setDefaultBranchForAmbilSendiri);
    if (this.state.setDefaultBranchForAmbilSendiri) {
      originBranch.setDefault = true;
    } else {
      originBranch.setDefault = false;
    }
    // console.log(originBranch);
    this.props.getDefaultBranchForAmbilSendiriSuccess(originBranch);

    // console.log(this.state);

    /**
     * Close Curtain
     */
    const data = {
      show: false,
      title: null,
    };
    this.props.toggleCurtain(data);
  }

  showAmbilSendiri = () => {
    // console.log(this.props.defaultBranchForAmbilSendiri);
    // console.log(this.props.defaultBranchForAmbilSendiri);
    if (
      this.props.defaultBranchForAmbilSendiri &&
      this.props.defaultBranchForAmbilSendiri.branch &&
      !this.props.isChange
    ) {
      if (this.state.disableOrderButton) {
        if (
          this.state.branchId !==
          this.props.defaultBranchForAmbilSendiri.branch.id
        ) {
          /**
           * If Order Button disabled AND
           * defaultBranchForAmbilSendiri exist
           */
          this.setState({
            branchId: this.props.defaultBranchForAmbilSendiri.branch.id,
            disableOrderButton: false,
          });
        }
      }
      // Show Default Branch
      return this.showDefaultBranchForAmbilSendiri();
    }
    // Show Form Select Branch
    return this.showBranchForm();
  };

  /**
   * If Default Branch Exist
   */
  showDefaultBranchForAmbilSendiri = () => (
    <div>
      <div className="order__delivery__branch__address">
        <div>
          <div className="font-weight-bold">
            {this.props.defaultBranchForAmbilSendiri.branch.name}
          </div>
          <div>{this.props.defaultBranchForAmbilSendiri.branch.phone}</div>
          <br />
          <div>{this.props.defaultBranchForAmbilSendiri.branch.address}</div>
        </div>
      </div>
      <Row className="mt-3 font-weight-bold" type="flex" align="middle">
        <Icon
          type="edit"
          className="clickable"
          style={{
            fontSize: 20,
            marginRight: 10,
          }}
          onClick={() => this.onClickCurtain('Ubah Alamat Pengambilan')}
        />
        <span
          className="clickable"
          style={{
            fontSize: 12,
          }}
          onClick={() => this.onClickCurtain('Ubah Alamat Pengambilan')}
        >
          Ubah Alamat Pengambilan
        </span>
      </Row>

      <div
        style={{
          marginLeft: -15,
          marginRight: -15,
          marginBottom: -20,
          marginTop: 15,
        }}
      >
        <AddToCart
          deliveryMethod="Ambil Sendiri"
          disableOrderButton={this.state.disableOrderButton}
          order={this.state}
          totalPrice={this.props.order.subtotalPrice}
          setDefaultBranchForAmbilSendiri={
            this.state.setDefaultBranchForAmbilSendiri
          }
        />
      </div>
    </div>
  );

  /**
   * If Default Branch not Exist
   */
  showBranchForm = () => (
    <div style={this.props.isChange ? { padding: 15, marginTop: 40 } : null}>
      {/* BEGIN Provinces */}
      <div className="my-3">
        <div className="order__label">Pilih Provinsi</div>
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
        <div className="order__label">Pilih Kota/Kabupaten</div>
        <div className="my-2">
          <Select
            // showSearch
            value={this.state.cityId}
            disabled={!this.state.provinceId}
            style={{ width: '100%' }}
            placeholder="Kota/Kabupaten"
            // optionFilterProp="children"
            onChange={this.selectCity}
            // filterOption={(input, option) =>
            //   option.props.children
            //     .toLowerCase()
            //     .indexOf(input.toLowerCase()) >= 0
            // }
          >
            {this.state.cities &&
              this.state.cities.map(
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

      {/* BEGIN Branches */}
      <div className="my-3">
        <div className="order__label">Ambil Barang di</div>
        <div className="my-2">
          <Select
            // showSearch
            value={this.state.branchId}
            disabled={!this.state.cityId}
            style={{ width: '100%' }}
            placeholder="Pilih"
            // optionFilterProp="children"
            onChange={this.selectBranches}
            // filterOption={(input, option) =>
            //   option.props.children
            //     .toLowerCase()
            //     .indexOf(input.toLowerCase()) >= 0
            // }
          >
            {this.props.member.memberTypeName !== 'TDS' && (
              <OptGroup label="TDS">
                {this.props.branches &&
                  this.props.branches.TDS &&
                  this.props.branches.TDS.map((branch) => (
                    <Option
                      value={branch.id}
                      key={branch.id}
                      disabled={
                        branch.productQuantity <
                        this.props.purchaseProduct.order.orderQuantity
                      }
                    >
                      {branch.name}
                    </Option>
                  ))}
              </OptGroup>
            )}
            <OptGroup label="Gudang">
              {this.props.branches &&
                this.props.branches.Gudang &&
                this.props.branches.Gudang.map((branch) => (
                  <Option
                    value={branch.id}
                    key={branch.id}
                    disabled={
                      branch.productQuantity <
                      this.props.purchaseProduct.order.orderQuantity
                    }
                  >
                    {branch.name}
                  </Option>
                ))}
            </OptGroup>
          </Select>
        </div>
      </div>
      {/* END Branches */}

      <div className="order__delivery__branch__address">
        {this.state.originBranch && (
          <div>
            <div className="font-weight-bold">
              {this.state.originBranch.name}
            </div>
            <div>{this.state.originBranch.phone}</div>
            <br />
            <div>{this.state.originBranch.address}</div>
          </div>
        )}
      </div>

      <Checkbox
        className="my-4"
        onChange={this.onCheckSetDefaultBranchForAmbilSendiri}
      >
        Jadikan alamat pengambilan favorit
      </Checkbox>

      {this.props.isChange ? (
        <div className="mt-3">
          <Button
            className="btn-block"
            type="primary"
            disabled={this.state.disableSubmitButton}
            onClick={() => this.onSubmitAmbilSendiri()}
          >
            Ubah Sekarang
          </Button>
        </div>
      ) : (
        <div
          style={{
            marginLeft: -15,
            marginRight: -15,
            marginBottom: -20,
            marginTop: 15,
          }}
        >
          <AddToCart
            deliveryMethod="Ambil Sendiri"
            disableOrderButton={this.state.disableOrderButton}
            order={this.state}
            totalPrice={this.props.order.subtotalPrice}
            setDefaultBranchForAmbilSendiri={
              this.state.setDefaultBranchForAmbilSendiri
            }
          />
        </div>
      )}
    </div>
  );

  render() {
    // console.log(this.props);
    return (
      <div>
        <this.showAmbilSendiri />
      </div>
    );
  }
}

AmbilSendiri.propTypes = {
  isChange: PropTypes.bool,
  defaultBranchForAmbilSendiri: PropTypes.object,
  order: PropTypes.object,
  authentication: PropTypes.object,
  getProvinces: PropTypes.func,
  getCities: PropTypes.func,
  getBranches: PropTypes.func,
  getDefaultBranchForAmbilSendiri: PropTypes.func,
  storePurchaseProduct: PropTypes.func,
  toggleCurtain: PropTypes.func,
  getDefaultBranchForAmbilSendiriSuccess: PropTypes.func,
  getTdsCity: PropTypes.func,
  branches: PropTypes.object,
  member: PropTypes.object,
  provinces: PropTypes.array,
  cities: PropTypes.array,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  member: state.get('authentication').member,
  provinces: state.get('order').provinces,
  cities: state.get('order').cities,
  branches: state.get('order').branches,
  defaultBranchForAmbilSendiri: state.get('order').defaultBranchForAmbilSendiri,
  tdsByCity: state.get('ListTdsByCity').tdsNearby,
  productId: state.get('product').product.id,
  purchaseProduct: state.get('purchaseProduct'),
});

const mapDispatchToProps = (dispatch) => ({
  getProvinces: () => dispatch(actions.getProvinces()),
  getCities: (provinceId) => dispatch(actions.getCities(provinceId)),
  getBranches: (data) => dispatch(actions.getBranches(data)),
  getTdsCity: (data) => dispatch(actions.getTdsCity(data)),
  getDefaultBranchForAmbilSendiri: (data) =>
    dispatch(actions.getDefaultBranchForAmbilSendiri(data)),
  getDefaultBranchForAmbilSendiriSuccess: (data) =>
    dispatch(actions.getDefaultBranchForAmbilSendiriSuccess(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  storePurchaseProduct: (data) => dispatch(actions.storePurchaseProduct(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmbilSendiri);
