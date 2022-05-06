/**
 *
 * OrderPage
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Divider,
  Button,
  Row,
  Col,
  Spin,
  Rate,
  InputNumber,
  message,
} from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import * as actions from '../../actions/index';
import constant from './../../utils/configs/constant';
import AmbilSendiri from './AmbilSendiri';
import KirimAlamat from './KirimAlamat';
import ResellerPrices from '../../components/Product/ResellerPrices';
import ModalBranchPrice from './components/ModalBranchPrice';

export class OrderPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isEdit: !!this.props.match.params.cartUuid,
      cart: null, // Edit Only
      product: {},
      orderQuantity: 1,
      subtotalProfit: 0,
      subtotalPrice: 0, // Exclude Shipping
      shippingCost: 0, // Ongkir
      totalPrice: 0, // Include Shipping
      totalWeight: 0,
      deliveryMethod: 'Ambil Sendiri',
      showModalBranchPrice: false,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Order Produk',
      showFooter: false,
      hideBurgerMenu: true,
    });
    const productUuid = this.props.match.params.productUuid;
    const cartUuid = this.props.match.params.cartUuid;
    if (productUuid) {
      // New
      this.props.getProduct({ uuid: productUuid });
    } else if (cartUuid) {
      // Edit
      this.props.getCartByUuid({ uuid: cartUuid });
    }

    const token = localStorage.getItem('token');
    if (token) {
      this.props.getLoginInformation({ token });
    }
  }

  componentWillReceiveProps(newProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (newProps.product && newProps.product !== this.state.product) {
      const activePrice = this.getActiveTierPrice(
        this.state.orderQuantity,
        newProps.product
      );

      // BEGIN If Member get Discount
      const hasDiscount =
        newProps.product.productDiscountPrice &&
        newProps.product.productDiscountPrice.length != 0;
      if (hasDiscount) {
        if (activePrice.priceAfter) {
          activePrice.minimumPurchasePrice = activePrice.priceAfter;
        }
      }
      // END If Member get Discount
      const subtotalPrice =
        activePrice.minimumPurchasePrice * this.state.orderQuantity;

      /**
       * Gross Weight
       * If Volume is Bigger dan Weight, use Volume
       */
      let grossWeight =
        (newProps.product.packageDimensionsLength *
          newProps.product.packageDimensionsWidth *
          newProps.product.packageDimensionsHeight) /
        constant.CONFIG_ORDER.GROSS_WEIGHT_FACTOR;

      // console.log('Berat Ukuran '+grossWeight);
      // console.log('Berat Timbangan '+newProps.product.grossWeight);

      if (newProps.product.grossWeight > grossWeight) {
        grossWeight = newProps.product.grossWeight;
      }
      this.setState({
        product: newProps.product,
        subtotalProfit:
          (newProps.product.standardRetailPrice -
            activePrice.minimumPurchasePrice) *
          this.state.orderQuantity,
        subtotalPrice,
        totalPrice: subtotalPrice + this.state.shippingCost,
        totalWeight: grossWeight * this.state.orderQuantity,
      });
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    // BEGIN Edit
    if (
      this.props.cart.cart &&
      this.props.cart.cart !== prevProps.cart.cart &&
      this.state.isEdit
    ) {
      const cart = this.props.cart.cart;
      this.setState({
        cart,
        orderQuantity: cart.quantity,
        deliveryMethod: cart.deliveryMethod,
      });
      this.props.getProduct({ uuid: cart.slug });
    }
    // END Edit

    /**
     * Check if Branch is TDS or Gudang
     * Reseller can't get cheapest Tier Price if Buy from TDS
     */
    if (this.props.purchaseProduct.originBranch) {
      if (
        this.props.purchaseProduct.originBranch !==
        prevProps.purchaseProduct.originBranch
      ) {
        if (!prevProps.purchaseProduct.originBranch) {
          const isTds = this.props.purchaseProduct.originBranch.isTds === 1;
          this.changeOrderQuantity(this.state.orderQuantity);
          if (isTds) {
            this.setState({ showModalBranchPrice: isTds });
          }
        } else if (
          this.props.purchaseProduct.originBranch.isTds !==
          prevProps.purchaseProduct.originBranch.isTds
        ) {
          const isTds = this.props.purchaseProduct.originBranch.isTds === 1;
          this.changeOrderQuantity(this.state.orderQuantity);
          if (isTds) {
            this.setState({ showModalBranchPrice: isTds });
          }
        }
      }
    }
  }

  // Before DOM removal
  componentWillUnmount() {
    this.props.removeDefaultBranchForAmbilSendiri();
  }

  /**
   * Get Active Tier Price
   * @param {number} orderQuantity
   * @param {object} product
   */
  getActiveTierPrice = (orderQuantity, product) => {
    let activePrice = {};
    let productResellerPrice = product.productResellerPrice;
    const hasDiscount =
      product.productDiscountPrice && product.productDiscountPrice.length != 0;
    if (hasDiscount) {
      // Overide Normal Price with Discount
      productResellerPrice = product.productDiscountPrice;
    } else {
      /**
       * Reseller can't get cheapest Tier Price if Buy from TDS
       */
      if (
        this.props.purchaseProduct.originBranch &&
        this.props.purchaseProduct.originBranch.isTds === 1
      ) {
        if (productResellerPrice.length > 1) {
          // productResellerPrice.splice(0, -1);
          productResellerPrice = productResellerPrice.slice(0, -1);
        }
      }
    }
    // console.log(product);
    if (!this.props.authentication.getTierPrice) {
      // Get Normal Price
      if (hasDiscount) {
        activePrice = { minimumPurchasePrice: product.promotion.priceAfter };
      } else {
        activePrice = { minimumPurchasePrice: product.standardRetailPrice };
      }
    } else if (this.props.authentication.getCheapestTierPrice) {
      // Get Cheapest Tier Price
      activePrice = productResellerPrice.reduce((prev, curr) =>
        prev.minimumPurchase > curr.minimumPurchase ? prev : curr
      );
    } else {
      // Get Tier Price
      activePrice = productResellerPrice.reduce((prev, curr) =>
        orderQuantity >= prev.minimumPurchase &&
        orderQuantity < curr.minimumPurchase
          ? prev
          : curr
      );
    }
    // console.log(activePrice);
    return activePrice;
  };

  /**
   * Order Quantity onChange
   * @param {number} orderQuantity
   */
  changeOrderQuantity = (orderQuantity) => {
    if (orderQuantity >= 1) {
      const product = this.props.product;
      const activePrice = this.getActiveTierPrice(orderQuantity, product);

      // BEGIN If Member get Discount
      const hasDiscount =
        product.productDiscountPrice &&
        product.productDiscountPrice.length != 0;
      if (hasDiscount) {
        if (activePrice.priceAfter) {
          activePrice.minimumPurchasePrice = activePrice.priceAfter;
        }
      }
      // END If Member get Discount

      const subtotalPrice = activePrice.minimumPurchasePrice * orderQuantity;

      // Profit Calculation
      let subtotalProfit = product.standardRetailPrice * orderQuantity;
      subtotalProfit -= subtotalPrice;

      const totalPrice = subtotalPrice + this.state.shippingCost;
      let grossWeight =
        (product.packageDimensionsLength *
          product.packageDimensionsWidth *
          product.packageDimensionsHeight) /
        constant.CONFIG_ORDER.GROSS_WEIGHT_FACTOR;
      if (product.grossWeight > grossWeight) {
        grossWeight = product.grossWeight;
      }
      const totalWeight = grossWeight * orderQuantity;
      // console.log(totalPrice);
      this.setState({
        orderQuantity,
        subtotalProfit,
        subtotalPrice,
        totalPrice,
        totalWeight,
      });
    }
  };

  /**
   * Select Delivery Method
   * Ambil Sendiri or Kirim Alamat
   * @param {string} deliveryMethod
   */
  selectDeliveryMethod = (deliveryMethod) => {
    this.setState({
      deliveryMethod,
    });
  };

  /**
   * Close Modal Branch Price
   */
  onClickCloseModalBranchPrice = () => {
    this.setState({
      showModalBranchPrice: false,
    });
  };

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    // Forced to Add Member Delivery Address
    if (
      this.props.authentication.member.memberDeliveryAddress &&
      this.props.authentication.member.memberDeliveryAddress.length === 0
    ) {
      message.warning('Daftarkan alamat anda terlebih dahulu.');
      return <Redirect to="/profil/buku-alamat/tambah-alamat" />;
    }

    if (this.props.authentication.isAuthenticated) {
      if (
        this.props.authentication.member.BranchReview &&
        this.props.authentication.member.BranchReview.length > 0 &&
        this.props.authentication.member.memberTypeName !== 'TDS'
      ) {
        // Review TDS
        const reviewTDS = this.props.authentication.member.BranchReview[0];
        return <Redirect to={`/beri-ulasan-tds/${reviewTDS.id}`} />;
      } else if (
        this.props.authentication.member.productUnreview &&
        this.props.authentication.member.productUnreview.length > 0
      ) {
        // Review Product
        // const reviewProduct = this.props.authentication.member
        //   .productUnreview[0];
        // return <Redirect to={`/beri-ulasan-produk/${reviewProduct.id}`} />;
      }
    }

    return (
      <div>
        {this.props.product ? (
          <Spin spinning={this.props.cart.loading}>
            <ModalBranchPrice
              visible={this.state.showModalBranchPrice}
              onClickCloseModalBranchPrice={this.onClickCloseModalBranchPrice}
            />
            <div style={{ paddingBottom: 70 }}>
              <div className="order">
                <div className="order__product">
                  <div className="font-weight-bold" style={{ fontSize: 12 }}>
                    {this.props.product.name}
                  </div>
                  <div>
                    <Rate
                      className="ddc__rate"
                      disabled
                      allowHalf
                      defaultValue={this.props.product.rating}
                    />
                  </div>

                  {/* BEGIN Price */}
                  <div className="productCard__description__price">
                    <div className="productCard__description__label">
                      Harga Normal
                    </div>
                    <div className="font-weight-bolder">
                      {this.props.product.promotion.id === 0 ? (
                        // If not discount
                        <NumberFormat
                          value={this.props.product.standardRetailPrice}
                          displayType={'text'}
                          thousandSeparator
                          prefix={'Rp. '}
                        />
                      ) : (
                        // If discount
                        <React.Fragment>
                          <div className="font-weight-bolder font-size-small font-color-gray text-decoration-strike">
                            <NumberFormat
                              value={this.props.product.promotion.priceBefore}
                              displayType={'text'}
                              thousandSeparator
                              prefix={'Rp. '}
                            />
                            <span>/pc</span>
                          </div>
                          <NumberFormat
                            value={this.props.product.promotion.priceAfter}
                            displayType={'text'}
                            thousandSeparator
                            prefix={'Rp. '}
                          />
                        </React.Fragment>
                      )}

                      <span>/pc</span>
                    </div>
                  </div>

                  {/* BEGIN Reseller Price */}
                  {this.props.authentication.getTierPrice && (
                    <ResellerPrices product={this.props.product} />
                  )}
                  {/* END Reseller Price */}
                  {/* END Price */}

                  {/* BEGIN Quantity */}
                  <Row className="my-2" type="flex" align="bottom">
                    <Col span={12}>
                      <div style={{ fontSize: 12, marginBottom: 10 }}>
                        Jumlah Barang
                      </div>
                      <InputNumber
                        min={1}
                        max={1000}
                        defaultValue={1}
                        value={this.state.orderQuantity}
                        onChange={this.changeOrderQuantity}
                      />
                    </Col>
                    <Col span={12}>
                      <div style={{ fontSize: 12 }}>Berat Total</div>
                      <div className="font-weight-bold">
                        <NumberFormat
                          value={this.state.totalWeight / 1000}
                          decimalScale={1}
                          displayType={'text'}
                          thousandSeparator
                        />{' '}
                        kg
                      </div>
                    </Col>
                  </Row>
                  {/* END Quantity */}

                  <Divider className="my-3 deviderLine" />

                  {/* BEGIN Profit Estimation */}
                  <div>
                    <div style={{ fontSize: 10, color: '#505050' }}>
                      Estimasi Keuntungan Anda
                    </div>
                    <div className="font-weight-bold">
                      <NumberFormat
                        value={this.state.subtotalProfit}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp. '}
                        suffix={''}
                      />
                    </div>
                  </div>
                  {/* END Profit Estimation */}
                </div>
                {/* BEGIN Total Price */}
                <div className="order__total_price">
                  <div style={{ fontSize: 10 }}>
                    Total belum termasuk Ongkir
                  </div>
                  <div className="font-weight-bold">
                    <NumberFormat
                      value={this.state.subtotalPrice}
                      displayType={'text'}
                      thousandSeparator
                      prefix={'Rp. '}
                      suffix={''}
                    />
                  </div>
                </div>
                {/* END Total Price */}

                {/* BEGIN Delivery Method */}
                <div className="order__delivery">
                  <div className="my-2 font-weight-bold">Metode Pengiriman</div>
                  <div className="order__label">
                    Pilih metode yang diinginkan
                  </div>

                  <Row className="my-2" gutter={8}>
                    <Col span={12}>
                      <Button
                        className="btn-block"
                        type={
                          this.state.deliveryMethod === 'Ambil Sendiri'
                            ? 'primary'
                            : ''
                        }
                        onClick={() =>
                          this.selectDeliveryMethod('Ambil Sendiri')
                        }
                      >
                        Ambil Sendiri
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        className="btn-block"
                        type={
                          this.state.deliveryMethod === 'Kirim Alamat'
                            ? 'primary'
                            : ''
                        }
                        onClick={() =>
                          this.selectDeliveryMethod('Kirim Alamat')
                        }
                      >
                        Kirim Alamat
                      </Button>
                    </Col>
                  </Row>

                  <Divider className="my-3 deviderLine" />

                  {this.state.deliveryMethod === 'Ambil Sendiri' ? (
                    <AmbilSendiri order={this.state} />
                  ) : (
                    <KirimAlamat order={this.state} />
                  )}
                </div>
                {/* END Shipping Method */}
              </div>
            </div>
          </Spin>
        ) : (
          <div className="text-center" style={{ marginTop: '40%' }}>
            {this.props.loading ? <Spin /> : <div>Halaman tidak ditemukan</div>}
          </div>
        )}
      </div>
    );
  }
}

OrderPage.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
  cart: PropTypes.object,
};

OrderPage.defaultProps = {
  product: null,
  provinces: [],
  cities: [],
  loading: false,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  product: state.get('product').product,
  loading: state.get('product').loading,
  cart: state.get('cart'),
  purchaseProduct: state.get('purchaseProduct'),
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (data) => dispatch(actions.getProduct(data)),
  getCartByUuid: (data) => dispatch(actions.getCartByUuid(data)),
  removeDefaultBranchForAmbilSendiri: () =>
    dispatch(actions.removeDefaultBranchForAmbilSendiri()),
  storePurchaseProduct: (data) => dispatch(actions.storePurchaseProduct(data)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage);
