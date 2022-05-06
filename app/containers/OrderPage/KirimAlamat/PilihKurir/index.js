import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Button, Col } from 'antd';

import * as actions from '../../../../actions/index';
import ShippingInformation from '../ShippingInformation';
import AddToCart from './../../AddToCart';

class PilihKurir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courier: {},
      shippingCost: 0,
      ...this.props.order,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.getShippingCost();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.order.isDropship !== prevProps.order.isDropship) {
      this.setState({
        ...this.props.order,
      });
    }
    if (
      this.props.order.subtotalPrice !== prevProps.order.subtotalPrice ||
      this.props.order.orderQuantity !== prevProps.order.orderQuantity ||
      this.props.order.originBranch !== prevProps.order.originBranch
    ) {
      //   console.log(this.props);
      this.setState({
        courier: {},
        shippingCost: 0,
        ...this.props.order,
      });
      if (this.props.order.originBranch.id) {
        this.getShippingCost();
      }
    }
  }

  /**
   * Select Courier
   */
  onSelectCourier = (courier) => {
    // console.log(courier);
    this.setState({
      courier,
      shippingCost: courier.fee,
    });
  };

  /**
   * Get List Shipping Cost
   */
  getShippingCost = () => {
    const data = {
      origin: this.props.order.originBranch.districtId,
      destination: this.props.order.destinationBranch.districtId,
      weight: Math.ceil(this.props.order.totalWeight), // gram
      senderPosCode: this.props.order.originBranch.districtId,
      receiverPosCode: this.props.order.destinationBranch.districtId,
      itemValue: 0,
    };
    this.props.getShippingCost(data);
  };

  render() {
    let disableOrderButton = true;
    if (this.state.courier.id) {
      disableOrderButton = false;
    }

    return (
      <React.Fragment>
        <div style={{ minHeight: 70 }}>
          <div className="mt-4" style={{ fontSize: 12 }}>
            Kurir
          </div>
          <Row type="flex">
            {this.props.order.originBranch.id &&
              this.props.shippingCost &&
              this.props.shippingCost.map(
                (data) =>
                  data.shippingName && (
                    <Col
                      span={12}
                      style={{ padding: 5 }}
                      key={data.shippingName}
                    >
                      <Button
                        className="btn-block"
                        type={this.state.courier === data ? 'primary' : ''}
                        onClick={() => this.onSelectCourier(data)}
                      >
                        {data.shippingName}
                      </Button>
                    </Col>
                  )
              )}
          </Row>
        </div>

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
    );
  }
}

PilihKurir.propTypes = {
  order: PropTypes.object,
  shippingCost: PropTypes.array,
  // getShippingCost: PropTypes.function,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  shippingCost: state.get('order').shippingCost,
});

const mapDispatchToProps = (dispatch) => ({
  getShippingCost: (data) => dispatch(actions.getShippingCost(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PilihKurir);
