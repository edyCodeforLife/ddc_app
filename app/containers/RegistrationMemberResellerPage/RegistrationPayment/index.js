import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col } from 'antd';

import * as actions from '../../../actions/index';
import PaymentPage from '../../PaymentPage';
import constant from '../../../utils/configs/constant';
import ResellerThankYou from '../ResellerThankYou';

class RegistrationPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showThankYou: false,
      courier: null,
      shippingCost: 0,
      price: this.props.product.typePriceStarterKit,
      isFreeShippingAndService: false,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    // this.props.getPaymentMethods();
    this.getShippingCost();
  }

  componentDidUpdate(prevProps, prevState) {}

  /**
   * Get List Shipping Cost
   */
  getShippingCost = () => {
    const data = {
      origin: constant.CONFIG_ORDER.BASE_BRANCH_DISTRICT_ID,
      destination: this.props.formData.districtId,
      weight:
        this.props.product.grossWeight === 0
          ? 10
          : Math.ceil(this.props.product.grossWeight), // gram
      // origin: 3173030,
      // destination: 3173030,
      // weight: 900,
      itemValue: 0,
    };
    // console.log(data);
    this.props.getShippingCost(data);
  };

  /**
   * Select Courier
   */
  onSelectCourier = (courier) => {
    // console.log(courier);
    let isFreeShippingAndService = false;
    // Check if Product Free Shipping
    if (this.props.product.freeShipping === 1) {
      courier.fee = 0;
      isFreeShippingAndService = true;
    }
    this.setState({
      courier,
      shippingCost: courier.fee,
      isFreeShippingAndService,
    });
  };

  render() {
    // If Form Success
    if (this.props.payment.formSuccess) {
      this.setState({ showThankYou: true });
      this.props.storePayment({ formSuccess: false });
      if (!this.props.isUpgrade) {
        // Dont Reload if Upgrade
        this.props.logout({ enableReload: false });
      }
    }

    if (this.state.showThankYou) {
      if (!this.props.isUpgrade) {
        return (
          <ResellerThankYou
            title="Terima Kasih Telah Mendaftar"
            content="Rincian login Anda telah kami kirimkan ke alamat email Anda. Silahkan melakukan pembayaran dan lakukan konfirmasi pembayaran apabila menggunakan transfer manual."
            redirectTo="/login"
            buttonText="Login"
          />
        );
      }
      return (
        <ResellerThankYou
          title="Terima Kasih Telah Upgrade"
          content="Lakukan konfirmasi pembayaran apabila menggunakan transfer manual."
          redirectTo="/beranda"
          buttonText="Beranda"
        />
      );
    }

    /**
     * Add class no-overflow if show curtain
     */
    const bodyTag = document.getElementsByTagName('BODY')[0];
    if (this.state.showPayment) {
      bodyTag.classList.add('no-overflow');
    } else {
      bodyTag.classList.remove('no-overflow');
    }

    let textShipping = 'Metode Pengiriman';
    if (!this.props.isUpgrade) {
      textShipping =
        'Pilih kurir, Metode pembayaran (Bank Transfer atau Virtual Account), Dan pencet tombol BAYAR SEKARANG';
    }
    // console.log(this.props);
    return (
      <div className="curtain" style={{ backgroundColor: '#fafafa' }}>
        <div className="toolbar">
          <Row type="flex" justify="center">
            {/* <Icon
              type="close"
              className="clickable"
              style={{ fontSize: 24, marginLeft: 10 }}
              onClick={() => this.props.onClickShowPayment(false)}
            /> */}
            <span
              className="font-weight-bold"
              style={{ marginTop: 2, marginLeft: 10, fontSize: 18 }}
            >
              Pengiriman dan Pembayaran
            </span>
          </Row>
        </div>

        <div className="bg-white box-shadow p-15" style={{ marginTop: 65 }}>
          <div className="font-weight-bold">{textShipping}</div>
          <div className="font-size-small mt-20">Kurir</div>
          <Row type="flex">
            {this.props.shippingCost &&
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

        {this.state.courier && (
          <div className="p-15">
            <PaymentPage
              isMembership
              isFreeShippingAndService={this.state.isFreeShippingAndService}
              price={this.state.price}
              shippingCost={this.state.shippingCost}
              shippingName={this.state.shippingName}
              productId={this.props.product.id}
              totalWeight={this.props.product.grossWeight}
            />
          </div>
        )}
      </div>
    );
  }
}

RegistrationPayment.propTypes = {};

const mapStateToProps = (state) => ({
  voucher: state.get('registrationMemberReseller').formData,
  shippingCost: state.get('order').shippingCost,
  paymentMethod: state.get('paymentMethod'),
  payment: state.get('payment'),
});

const mapDispatchToProps = (dispatch) => ({
  storePayment: (data) => dispatch(actions.storePayment(data)),
  getShippingCost: (data) => dispatch(actions.getShippingCost(data)),
  logout: (data) => dispatch(actions.logout(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPayment);
