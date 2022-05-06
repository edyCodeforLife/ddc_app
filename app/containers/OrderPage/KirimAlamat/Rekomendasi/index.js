import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Button, Col } from 'antd';

import * as actions from '../../../../actions/index';
import ShippingInformation from '../ShippingInformation';
import AddToCart from './../../AddToCart';

class Rekomendasi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originBranch: {},
      courier: {},
      shippingRecommendation: null,
      shippingCost: 0,
      ...this.props.order,
    };
    this.getBranchRecommendation();
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.order.isDropship !== prevProps.order.isDropship) {
      this.setState({
        isDropship: this.props.order.isDropship,
      });
    }
    if (
      this.props.order.orderQuantity !== prevProps.order.orderQuantity ||
      this.props.order.destinationBranch !== prevProps.order.destinationBranch
    ) {
      this.setState({
        originBranch: {},
        courier: {},
        shippingRecommendation: null,
        shippingCost: 0,
        ...this.props.order,
      });
      this.getBranchRecommendation();
    }

    // If TDS not exist, show branch
    if (this.props.branchRecommendation !== prevProps.branchRecommendation) {
      if (this.props.branchRecommendation) {
        if (this.props.branchRecommendation.byDistance === '') {
          this.getBranchRecommendation();
        }
      }
    }
  }

  /**
   * Select Shipping Recommendation
   */
  onSelectShippingRecommendation = (value) => {
    let courier = null;
    if (value === 'Terdekat') {
      courier = this.props.branchRecommendation.byDistance;
    } else if (value === 'Termurah') {
      courier = this.props.branchRecommendation.byPrice;
    } else if (value === 'TDS Rating Tertinggi') {
      courier = this.props.branchRecommendation.byRating;
    } else if (value === 'TDS Terakhir') {
      courier = this.props.branchRecommendation.byLastOrder;
    }

    this.setState({
      originBranch: {
        id: courier.id,
        name: courier.name,
        isTds: courier.isTds ? 1 : 0,
      },
      courier,
      shippingRecommendation: value,
      shippingCost: courier.fee,
    });
  };

  getBranchRecommendation = () => {
    // console.log(this.props);
    let buyFromTDS = false;
    if (this.props.order.subtotalPrice < 1500000) {
      buyFromTDS = true;
    }
    if (this.props.member.memberTypeName === 'TDS') {
      buyFromTDS = false;
    }
    // If TDS not exist, show branch
    if (this.props.branchRecommendation) {
      if (this.props.branchRecommendation.byDistance === '') {
        buyFromTDS = false;
      }
    }
    const data = {
      buyFromTDS,
      // origin: this.state.originBranch.districtId,
      // latlng: '-6.226046,107.026136',
      latlng: `${this.props.order.destinationBranch.latitude},${
        this.props.order.destinationBranch.longitude
      }`,
      destination: this.props.order.destinationBranch.districtId,
      weight: Math.ceil(this.props.order.totalWeight), // gram
      // senderPosCode: this.state.originBranch.districtId,
      // receiverPosCode: this.props.order.destinationBranch.districtId,
      // itemValue: 0,
      // Tambahan
      productId: this.props.order.product.id,
      memberId: this.props.authentication.member.id,
      quantity: this.props.order.orderQuantity,
    };
    if (this.props.order.destinationBranch.id) {
      this.props.getBranchRecommendation(data);
    }
  };

  render() {
    let recommendationDeliveries = [];
    if (this.props.order.subtotalPrice >= 1500000) {
      recommendationDeliveries = ['Termurah', 'Terdekat'];
    }
    if (this.props.member.memberTypeName === 'TDS') {
      recommendationDeliveries = ['Termurah', 'Terdekat'];
    } else {
      recommendationDeliveries = [
        'Termurah',
        'Terdekat',
        'TDS Rating Tertinggi',
        'TDS Terakhir',
      ];
    }

    let disableOrderButton = true;
    if (this.state.originBranch.id) {
      disableOrderButton = false;
    }

    return (
      <div>
        <div className="my-1" style={{ fontSize: 12 }}>
          Rekomendasi
        </div>
        <Row type="flex">
          {recommendationDeliveries.map((delivery) => (
            <Col span={12} style={{ padding: 5 }} key={delivery}>
              <Button
                className="btn-block"
                disabled={
                  !this.props.branchRecommendation || delivery.fee === 0
                }
                type={
                  this.state.shippingRecommendation === delivery
                    ? 'primary'
                    : ''
                }
                style={
                  delivery === 'TDS Rating Tertinggi'
                    ? { fontSize: 'smaller' }
                    : null
                }
                onClick={() => this.onSelectShippingRecommendation(delivery)}
              >
                {delivery}
              </Button>
            </Col>
          ))}
        </Row>

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
      </div>
    );
  }
}

Rekomendasi.propTypes = {
  order: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  branchRecommendation: state.get('order').branchRecommendation,
  member: state.get('authentication').member,
});

const mapDispatchToProps = (dispatch) => ({
  getBranchRecommendation: (data) =>
    dispatch(actions.getBranchRecommendation(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rekomendasi);
