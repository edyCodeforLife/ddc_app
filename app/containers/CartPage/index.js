/**
 *
 * CartPage
 *
 */

import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, Modal } from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

import * as actions from '../../actions/index';
import ProductGroupCart from './ProductGroupCart/index';
import CustomSVG from '../../components/CustomSVG';
import { Spin } from 'antd';

const FormItem = Form.Item;
export class CartPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      disableCheckoutButton: true,
      showModalVoucher: false,
      showModalCustomDelivery: false,
      voucherCode: '',
      redirect: false,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Keranjang',
      hideBurgerMenu: true,
      showFooter: false,
    });

    this.props.getCarts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.carts && this.props.carts !== prevProps.carts) {
      if (this.props.carts.length > 0) {
        // Sum Prices
        // const totalPrice = this.props.carts.reduce(
        //   (sum, current) =>
        //     current.isWaitingShippingFee === 0 ? sum + current.totalPrice : sum,
        //   0
        // );
        // Disable Checkout Button if prices 0
        // const totalPrice = this.props.carts.reduce(
        //   (sum, current) =>
        //     current.isWaitingShippingFee === 0 ? sum + current.totalPrice : sum,
        //   0
        // );
        // this.setState({
        //   totalPrice,
        // });
      }
    }
  }

  /**
   * On Click Open Modal Voucher
   */
  onClickOpenModalVoucher = () => {
    this.setState({
      showModalVoucher: true,
    });
  };

  /**
   * On Click Open Modal Voucher
   */
  onClickCancelModalVoucher = () => {
    this.setState({
      showModalVoucher: false,
    });
  };

  /**
   * On Change Form value
   */
  onChangeForm = (event) => {
    this.setState({ voucherCode: event.target.value });
  };

  /**
   * Show Modal Custom Delivery
   */
  showModalVoucher = () => {
    this.setState({
      showModalCustomDelivery: true,
    });
  };

  /**
   * Submit Cart
   */
  submitCart = () => {
    const isWaitingShippingFee = this.props.carts.find(
      (cart) => cart.isWaitingShippingFee === 1
    );
    if (isWaitingShippingFee) {
      const hasPendingCustomDelivery = this.props.carts.find(
        (cart) => cart.isCustomDelivery === 1 && cart.customDeliveryId === 0
      );
      if (hasPendingCustomDelivery) {
        // If has pending custom delivery
        this.props.postCustomDelivery();
      }
      this.setState({
        showModalCustomDelivery: true,
      });
    } else {
      this.setState({
        redirect: true,
      });
    }
  };

  /**
   * On Click close Modal Custom Delivery
   */
  onClickCloseModalCustomDelivery = () => {
    this.props.getCarts();
    if (this.props.cart.totalPrice !== 0) {
      // Only Redirect Page to Payment if totalPrice !== 0
      this.setState({
        redirect: true,
      });
    } else {
      this.setState({
        showModalCustomDelivery: false,
      });
    }
  };

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/pembayaran" />;
    }

    return this.props.cartQuantity === 0 ? (
      <div className="text-center" style={{ marginTop: '30%' }}>
        {/* BEGIN Empty Cart */}
        <CustomSVG name={'ic-keranjang-kosong'} />
        <div className="my-3">Keranjang belanja Kamu masih Kosong :(</div>
        <NavLink to={'katalog'}>
          <Button type="primary">Mulai Belanja</Button>
        </NavLink>
        {/* END Empty Cart */}
      </div>
    ) : (
      <div
        style={{
          marginLeft: -15,
          marginRight: -15,
          fontSize: 12,
        }}
      >
        {/* BEGIN Modal Voucher */}
        <Modal
          visible={this.state.showModalVoucher}
          width={320}
          footer={null}
          bodyStyle={{ paddingBottom: 15 }}
          onCancel={this.onClickCancelModalVoucher}
        >
          <div>
            Masukkan kode voucher dan dapatkan potongan harga spesial dari Kami.
          </div>
          <div style={{ marginTop: 20 }}>
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <FormItem
                label="Kode Voucher"
                hasFeedback
                validateStatus="success"
              >
                <Input
                  type="text"
                  value={this.state.voucherCode}
                  onChange={this.onChangeForm}
                  placeholder="Masukkan Kode Voucher"
                />
              </FormItem>
            </Form>
          </div>
          <div>
            <Button
              className="btn-block"
              type="primary"
              disabled={!this.state.voucherCode}
              style={{ marginTop: 20 }}
              // onClick={this.onClickCloseRequestTDS}
              // loading={this.props.requestTDS.loading}
            >
              Gunakan
            </Button>
          </div>
        </Modal>
        {/* END Modal Voucher */}

        {/* BEGIN Modal >= 5 Mio */}
        <Modal
          visible={this.state.showModalCustomDelivery}
          closable={false}
          width={320}
          footer={null}
          bodyStyle={{ paddingBottom: 15 }}
        >
          <div className="text-center" style={{ marginTop: 25 }}>
            <p>
              Anda mempunyai nominal pembelanjaan 6 juta keatas, yang dimana
              Anda akan dikenakan custom delivery. Hal tersebut akan membutuhkan
              waktu max 1 hari kerja untuk penghitungan ongkirnya.
            </p>
            <p>
              Untuk memudahkan Anda berbelanja, Anda dapat menyelesaikan
              pembelanjaan yang lain terlebih dahulu.
            </p>
          </div>
          <div>
            <Button
              className="btn-block"
              type="primary"
              style={{ marginTop: 20 }}
              onClick={this.onClickCloseModalCustomDelivery}
            >
              Saya Mengerti
            </Button>
          </div>
        </Modal>
        {/* END Modal >= 5 Mio */}

        {/* BEGIN : Cart Content */}
        <div style={{ minHeight: '65vh' }}>
          <Spin spinning={this.props.loading}>
            {this.props.carts.map((cart) => (
              <ProductGroupCart cart={cart} key={cart.id} />
            ))}
          </Spin>
        </div>
        {/* END : Cart Content */}

        {/* BEGIN : Next to Payment Button */}
        <div
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: -15,
            backgroundColor: '#ffffff',
          }}
        >
          {/* <Row className="my-2" type="flex" justify="space-between">
            <Col>Ada Kode Voucher?</Col>
            <Col className="font-weight-bold">
              <u onClick={this.onClickOpenModalVoucher}>Pakai Voucher</u>
            </Col>
          </Row>
          {this.props.cart.discountPrice > 0 && (
          </Row> */}
          {this.props.cart.discountPrice > 0 && (
            <Row className="my-2" type="flex" justify="space-between">
              <Col>Extra Diskon ({this.props.cart.discountLabel})</Col>
              <Col className="font-weight-bold">
                <NumberFormat
                  value={this.props.cart.discountPrice}
                  displayType={'text'}
                  thousandSeparator
                  prefix={'Rp '}
                />
              </Col>
            </Row>
          )}
          <Row className="my-2" type="flex" justify="space-between">
            <Col>Total Belanja</Col>
            <Col className="font-weight-bold" style={{ fontSize: 16 }}>
              <NumberFormat
                value={this.props.cart.totalPrice}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
              />
            </Col>
          </Row>

          <Button
            className="btn-block"
            type="primary"
            disabled={this.props.carts.length === 0 || this.props.loading}
            onClick={this.submitCart}
          >
            Lanjut ke Pembayaran
          </Button>
        </div>
        {/* END : Next to Payment Button */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  loading: state.get('cart').loading,
  carts: state.get('cart').carts,
  cart: state.get('cart'),
  cartQuantity: state.get('cart').cartQuantity,
});

const mapDispatchToProps = (dispatch) => ({
  getCarts: () => dispatch(actions.getCarts()),
  postCustomDelivery: () => dispatch(actions.postCustomDelivery()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
