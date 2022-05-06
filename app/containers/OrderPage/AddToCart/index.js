/**
 *
 * AddToCart
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Row, Col, message, Modal } from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

import * as actions from '../../../actions/index';

export class AddToCart extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
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
    // console.log(this.props.order.originBranch);
    if (this.props.order.originBranch !== prevProps.order.originBranch) {
      this.props.storePurchaseProduct({
        originBranch: this.props.order.originBranch,
      });
    }
  }

  onClickCloseDialog = (e) => {
    this.setState({
      showDialog: false,
    });
    this.addToCart();
  };

  onClickAddToCart = () => {
    /**
     * Save Default Branch for Ambil Sendiri
     */
    // console.log(this.props);
    // console.log(this.props.deliveryMethod);
    // console.log(this.props.defaultBranchForAmbilSendiri);
    if (
      this.props.deliveryMethod === 'Ambil Sendiri' &&
      this.props.defaultBranchForAmbilSendiri
    ) {
      // console.log('Add To Cart, Ambil Sendiri');
      let defaultBranch = null;
      let data = null;
      if (this.props.defaultBranchForAmbilSendiri) {
        if (this.props.defaultBranchForAmbilSendiri.setDefault) {
          defaultBranch = this.props.defaultBranchForAmbilSendiri;
          // Submit Save Branch as Default for Ambil Sendiri
          data = {
            uuid: this.props.member.uuid, // Member uuid
            branchId: defaultBranch.branch.id,
          };
        } else if (this.props.setDefaultBranchForAmbilSendiri) {
          defaultBranch = this.props.order.originBranch;
          data = {
            uuid: this.props.member.uuid, // Member uuid
            branchId: this.props.order.originBranch.id,
          };
        }
      }

      // Submit Save Branch as Default for Ambil Sendiri
      if (data && data.branchId) {
        this.props.submitDefaultBranchForAmbilSendiri(data);
      }
    }

    if (
      this.props.order.subtotalPrice >= 6000000 &&
      this.props.order.deliveryMethod === 'Kirim Alamat'
    ) {
      // Show dialog if subtotalPrice >= 5 Mio
      this.setState({
        showDialog: true,
      });
    } else {
      this.addToCart();
    }
  };

  addToCart = () => {
    // console.log(this.props);

    const order = {
      memberDeliveryAddressId:
        this.props.deliveryMethod === 'Kirim Alamat'
          ? this.props.order.destinationBranch.id
          : null,
      isDropship:
        this.props.deliveryMethod === 'Kirim Alamat'
          ? this.props.order.isDropship
            ? 1
            : 0
          : 0,
      branchId: this.props.order.originBranch.id,
      productId: this.props.order.product.id,
      quantity: this.props.order.orderQuantity,
      weight: this.props.order.totalWeight / this.props.order.orderQuantity,
      totalWeight: this.props.order.totalWeight,
      deliveryMethod: this.props.deliveryMethod,
      recommendType: this.props.order.shippingRecommendation,
      isFreeShipping: this.props.order.isFreeShipping ? 1 : 0,
      isCustomDelivery: this.props.order.isCustomDelivery ? 1 : 0,
      isWaitingShippingFee: this.props.order.isWaitingShippingFee ? 1 : 0,
      shippingName:
        this.props.deliveryMethod === 'Kirim Alamat'
          ? this.props.order.courier.shippingName
          : '',
      shippingFee:
        this.props.deliveryMethod === 'Kirim Alamat'
          ? this.props.order.courier.fee
          : 0,
      shippingEtd:
        this.props.deliveryMethod === 'Kirim Alamat'
          ? this.props.order.courier.etd
          : '',
    };
    // console.log(order);
    if (this.props.order.isEdit) {
      order.uuid = this.props.order.cart.uuid;
      // console.log(this.props.order.cart);
      this.props.editCart(order);
    } else {
      this.props.addToCart(order);
    }
  };

  render() {
    // console.log(this.props);
    if (this.props.cart.formSuccess) {
      this.props.storeCart({ formSuccess: false });
      message.success('Produk telah ditambahkan dalam keranjang.', 1);
      return <Redirect to="/keranjang" />;
    }

    return (
      <div className="addToCart__toolbar__bottom">
        {/* BEGIN Modal */}
        <Modal
          footer={null}
          closable={false}
          visible={this.state.showDialog}
          width={350}
          bodyStyle={{ padding: 15 }}
        >
          <div className="text-center">
            <p>
              Untuk pembelanjaan diatas Rp 6 juta, Kami akan mencarikan jasa
              pengiriman yang sesuai dengan permintaan Anda.
            </p>
            <p>
              Dalam 1 x 24 jam, Kami akan menginformasikan Anda mengenai metode
              pengiriman ini.
            </p>
            <Button
              className="btn-block"
              type="primary"
              onClick={this.onClickCloseDialog}
            >
              Saya Mengerti
            </Button>
          </div>
        </Modal>
        {/* END Modal */}
        <div className="order__total_price">
          <Row type="flex" align="middle" justify="space-between">
            <Col>
              <div className="my-1" style={{ fontSize: 12 }}>
                Total
              </div>
              <div className="font-weight-bolder" style={{ fontSize: 18 }}>
                <NumberFormat
                  value={this.props.totalPrice}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp. '}
                  suffix={''}
                />
              </div>
            </Col>
            <Col>
              <Button
                id="ButtonOrderNow"
                type="primary"
                disabled={
                  this.props.disableOrderButton ||
                  this.props.totalPrice === 0 ||
                  !this.props.totalPrice
                }
                onClick={this.onClickAddToCart}
              >
                Order Sekarang
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  defaultBranchForAmbilSendiri: state.get('order').defaultBranchForAmbilSendiri,
  member: state.get('authentication').member,
  product: state.get('product').product,
  cart: state.get('cart'),
  purchaseProduct: state.get('purchaseProduct'),
});

const mapDispatchToProps = (dispatch) => ({
  submitDefaultBranchForAmbilSendiri: (data) =>
    dispatch(actions.submitDefaultBranchForAmbilSendiri(data)),
  addToCart: (data) => dispatch(actions.addToCart(data)),
  editCart: (data) => dispatch(actions.editCart(data)),
  storeCart: (data) => dispatch(actions.storeCart(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  storePurchaseProduct: (data) => dispatch(actions.storePurchaseProduct(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCart);
