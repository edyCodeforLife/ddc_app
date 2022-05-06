import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Button, Col, Select } from 'antd';

import * as actions from '../../../../actions/index';
import ShippingInformation from '../ShippingInformation';
import AddToCart from './../../AddToCart';
import PilihKurir from '../PilihKurir';
import constant from '../../../../utils/configs/constant';

const Option = Select.Option;

class PilihGudangAtauTDS extends React.Component {
  constructor(props) {
    super(props);

    let orderFrom = null;
    let showGudang = false;
    let showTDS = false;
    if (
      this.props.order.subtotalPrice < 1500000 &&
      this.props.member.memberTypeName !== 'TDS'
    ) {
      orderFrom = 'TDS';
      showTDS = true;
    } else {
      orderFrom = 'Gudang';
      showGudang = true;
    }

    this.state = {
      showGudang,
      showTDS,
      orderFrom,
      originBranch: {},
      courier: {},
      shippingRecommendation: null,
      shippingCost: 0,
      isCustomDelivery: false,
      isWaitingShippingFee: false,
      ...this.props.order,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    /**
     * Check if Branch is TDS or Gudang
     * Reseller can't get cheapest Tier Price if Buy from TDS
     * Store purchase data to Redux
     */
    if (this.props.order.subtotalPrice !== prevProps.order.subtotalPrice) {
      this.setState({
        ...this.props.order,
      });
    }

    if (
      this.props.order.orderQuantity !== prevProps.order.orderQuantity ||
      this.props.order.destinationBranch !== prevProps.order.destinationBranch
    ) {
      let orderFrom = null;
      let showGudang = false;
      let showTDS = false;
      if (
        this.props.order.subtotalPrice < 1500000 &&
        this.props.member.memberTypeName !== 'TDS'
      ) {
        orderFrom = 'TDS';
        showTDS = true;
      } else {
        orderFrom = 'Gudang';
        showGudang = true;
      }
      this.setState({
        showGudang,
        showTDS,
        orderFrom,
        originBranch: {},
        courier: {},
        shippingRecommendation: null,
        shippingCost: 0,
        ...this.props.order,
      });
    }
  }

  /**
   * Select Order From
   * Gudang or TDS
   * @param {string} orderFrom
   */
  selectOrderFrom = (orderFrom) => {
    // console.log(orderFrom);
    let showGudang = false;
    let showTDS = false;
    if (orderFrom === 'Gudang') {
      showGudang = true;
    } else {
      showTDS = true;
    }
    this.setState({
      orderFrom,
      showGudang,
      showTDS,
      originBranch: {}, // Reset
      courier: {}, // Reset
    });
  };

  /**
   * Select Branch from dropdown
   * @param {number} originBranchId
   */
  onSelectBranch = (originBranchId) => {
    let originBranch = {};
    let isFreeShipping = false;
    let isCustomDelivery = 0;
    let isWaitingShippingFee = 0;
    if (this.props.branches.Gudang) {
      // Find object branch in Gudang by branchId
      originBranch = this.props.branches.Gudang.find(
        (branch) => branch.id === originBranchId
      );
    }
    if (!originBranch && this.props.branches.TDS) {
      // Find object branch in TDS by branchId
      originBranch = this.props.branches.TDS.find(
        (branch) => branch.id === originBranchId
      );
    }
    // console.log(originBranch);

    // Ongkir >= 3000000, Free Ongkir for same Depart and Destination City
    let shippingCost = this.state.shippingCost;
    if (
      this.props.order.subtotalPrice >= 3000000 &&
      this.props.order.subtotalPrice < 6000000
    ) {
      if (originBranch.isTds === 0) {
        if (originBranch.cityId === this.props.order.destinationBranch.cityId) {
          shippingCost = 0;
          isFreeShipping = true;
        } else if (originBranch.freeShipping.length > 0) {
          const foundBranch = originBranch.freeShipping.find(
            (branch) =>
              branch.districtId ===
              this.props.order.destinationBranch.districtId
          );
          isFreeShipping = !!foundBranch;
        }
      }
    } else if (this.props.order.subtotalPrice > 6000000) {
      // Free Ongkir if Origin = Cikarang and Destination Address is Member Default Address
      // console.log(originBranch);
      const memberDeliveryAddress = this.props.authentication.member
        .memberDeliveryAddress;
      // Find member default address
      const defaultMemberDeliveryAddress = memberDeliveryAddress.find(
        (address) => address.default === 1
      );
      // console.log(defaultMemberDeliveryAddress.id);
      // console.log(this.props.order.destinationBranch.id);
      if (
        originBranch.id === constant.CONFIG_ORDER.FREE_SHIPPING_BRANCH_ID &&
        defaultMemberDeliveryAddress.id ===
          this.props.order.destinationBranch.id
      ) {
        // console.log('Free Ongkir');
        // shippingCost = 0;
        // isFreeShipping = true; // This Unused Cikarang Free Shipping dimatiin
        isCustomDelivery = true;
        isWaitingShippingFee = true;
      } else {
        isCustomDelivery = true;
        isWaitingShippingFee = true;
      }
    }

    // console.log(originBranch);
    this.setState({
      originBranch,
      shippingCost,
      isFreeShipping,
      isCustomDelivery,
      isWaitingShippingFee,
      courier: {}, // Reset Courier
    });
  };

  render() {
    let disableOrderButton = true;
    if (
      (this.state.originBranch.id &&
        this.state.originBranch.isTds == 0 &&
        this.props.order.subtotalPrice >= 6000000) ||
      this.state.isFreeShipping
    ) {
      disableOrderButton = false;
    }

    return (
      <div>
        {this.props.order.subtotalPrice < 6000000 && (
          <div>
            <div className="my-1" style={{ fontSize: 12 }}>
              Pesanan dari
            </div>

            <Row gutter={8}>
              <Col span={12}>
                <Button
                  className="btn-block"
                  type={this.state.orderFrom === 'Gudang' ? 'primary' : ''}
                  onClick={() => this.selectOrderFrom('Gudang')}
                >
                  Gudang
                </Button>
              </Col>
              {this.props.member.memberTypeName !== 'TDS' && (
                <Col span={12}>
                  <Button
                    className="btn-block"
                    type={this.state.orderFrom === 'TDS' ? 'primary' : ''}
                    onClick={() => this.selectOrderFrom('TDS')}
                  >
                    TDS
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        )}

        <div className="mt-4" style={{ fontSize: 12 }}>
          Dikirim oleh
        </div>
        <div className="my-2">
          <Select
            showSearch
            value={this.state.originBranch.id}
            style={{ width: '100%' }}
            placeholder="Pilih"
            optionFilterProp="children"
            onChange={this.onSelectBranch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {/* BEGIN Show Gudang */}
            {this.props.branches &&
              this.state.showGudang &&
              this.props.branches.Gudang.map((branch) => (
                <Option
                  value={branch.id}
                  key={branch.id}
                  disabled={branch.productQuantity <= 0}
                >
                  {branch.name}
                </Option>
              ))}
            {/* END Show Gudang */}
            {/* BEGIN Show TDS */}
            {this.props.branches &&
              this.state.showTDS &&
              this.props.branches.TDS.map((branch) => (
                <Option
                  value={branch.id}
                  key={branch.id}
                  disabled={branch.productQuantity <= 0}
                >
                  {branch.name}
                </Option>
              ))}
            {/* END Show TDS */}
          </Select>
        </div>

        {this.props.order.subtotalPrice < 6000000 &&
        !this.state.isFreeShipping ? (
          <PilihKurir order={this.state} />
        ) : (
          <React.Fragment>
            <ShippingInformation order={this.state} />

            <div
              style={{
                marginLeft: -15,
                marginRight: -15,
                marginBottom: -20,
                // marginTop: 15,
              }}
            >
              <AddToCart
                deliveryMethod="Kirim Alamat"
                authentication={this.props.authentication}
                disableOrderButton={disableOrderButton}
                order={this.state}
                totalPrice={
                  this.props.order.subtotalPrice + this.state.shippingCost
                }
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

PilihGudangAtauTDS.propTypes = {
  order: PropTypes.object,
  branches: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  member: state.get('authentication').member,
  branchRecommendation: state.get('order').branchRecommendation,
  branches: state.get('order').branches,
});

const mapDispatchToProps = (dispatch) => ({
  getShippingCost: (data) => dispatch(actions.getShippingCost(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PilihGudangAtauTDS);
