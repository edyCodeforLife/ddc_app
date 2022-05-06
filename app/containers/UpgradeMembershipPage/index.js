import React from 'react';
import { connect } from 'react-redux';
import { Modal, Row } from 'antd';
import MainCard from './component/containerCard';
import constant from './../../utils/configs/constant';
import * as actions from '../../actions/index';
import RegistrationPayment from '../RegistrationMemberResellerPage/RegistrationPayment';
import ResellerThankYou from '../RegistrationMemberResellerPage/ResellerThankYou';

const confirm = Modal.confirm;
class UpgradeMembershipPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: false,
      product: null,
      showThankYou: false,
    };
  }

  componentDidMount() {
    this.props.setToolbarState({
      showWishlist: false,
      showCart: true,
      showProfile: true,
      showFooter: false,
    });
    if (this.props.member) {
      const canBuyTrial = this.canBuyTrial();
      let query = 'type_starter_kit:1,is_trial:0';
      if (canBuyTrial) {
        query = 'type_starter_kit:1';
      }
      this.props.getStaterKitProducts({
        query,
        offset: 0,
        limit: 50,
        sortby: 'typePriceStarterKit',
        order: 'asc',
      });
    }
  }

  /**
   * On Click Show Payment
   */
  onClickShowPayment = (flag) => {
    // console.log(flag);
    this.setState({
      showPayment: flag,
    });
  };

  /**
   * On Click Select Product
   */
  onClickSelectProduct = (product, isVoucher = false) => {
    // console.log(product);
    if (product.isTrial === 1) {
      // const data = {
      //   isMembership: true,
      //   productId: product.id,
      // };
      // this.props.postPayment(data);

      confirm({
        title: 'Aktifkan Trial?',
        content: 'Nikmati fitur Reseller Trial selama 14 hari.',
        onOk: () => {
          // console.log('Tes');
          const data = {
            isMembership: true,
            productId: product.id,
          };
          this.props.postPayment(data);

          this.setState({
            product,
          });
        },
        onCancel() { },
        cancelText: 'Batal',
      });
    } else {
      // console.log(product);
      if (isVoucher) {
        if (product.id === constant.CONFIG_ORDER.PAKET_DAFTAR_ID) {
          product.typePriceStarterKit = 99000;
        } if (product.id === 2215) {
          product.typePriceStarterKit = 299000;
        } else if (
          product.id === 2224 ||
          product.id === 2225
        ) {
          product.typePriceStarterKit = 99000;
        }
      }
      this.setState({
        product,
        showPayment: true,
      });
    }
  };

  isVoucher = (product) => {
    if (product.id === constant.CONFIG_ORDER.PAKET_DAFTAR_ID) {
      product.typePriceStarterKit = 99000;
    } if (product.id === 2215) {
      product.typePriceStarterKit = 299000;
    } else if (
      product.id === 2224 ||
      product.id === 2225
    ) {
      product.typePriceStarterKit = 99000;
    }
    this.setState({
      product
    });
  }

  /**
   * Check if user can buy trial
   */
  canBuyTrial = () => {
    let canBuyTrial = true;
    if (
      this.props.member.trialStartDate === '0001-01-01T00:00:00Z' ||
      !this.props.member.trialStartDate
    ) {
      // If Null
      canBuyTrial = true;
    } else {
      canBuyTrial = false;
    }
    return canBuyTrial;
  };

  render() {
    const style = {
      marginLeft: -15,
      marginRight: -15,
      marginTop: -15,
    };

    const bodyTag = document.getElementsByTagName('BODY')[0];
    if (this.state.showPayment) {
      bodyTag.classList.add('no-overflow');
    } else {
      bodyTag.classList.remove('no-overflow');
    }

    if (this.props.payment.formSuccess && this.state.product.isTrial === 1) {
      this.setState({ showThankYou: true });
      this.props.storePayment({ formSuccess: false });
    }

    if (this.state.showThankYou) {
      return (
        <div style={{ marginLeft: -15 }}>
          <ResellerThankYou
            title="Terima Kasih"
            content="Anda telah mengaktifkan fitur trial."
            redirectTo="/beranda"
            buttonText="Beranda"
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Row style={style}>
          <MainCard
            member={this.props.member}
            starterKitProducts={this.props.starterKitProducts}
            onClickSelectProduct={this.onClickSelectProduct}
            refresh={this.isVoucher}
          />
        </Row>

        {this.state.showPayment &&
          this.state.product && (
            <div style={{ marginLeft: -15, marginRight: -15 }}>
              <RegistrationPayment
                isUpgrade
                product={this.state.product}
                formData={{
                  districtId: this.props.member.memberDeliveryAddress[0]
                    .districtId,
                }}
                onClickShowPayment={() => this.onClickShowPayment()}
              />
            </div>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  payment: state.get('payment'),
  member: state.get('authentication').member,
  starterKitProducts: state.get('registrationMemberReseller')
    .starterKitProducts,
});

const mapDispatchToProps = (dispatch) => ({
  postPayment: (data) => dispatch(actions.postPayment(data)),
  storePayment: (data) => dispatch(actions.storePayment(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getStaterKitProducts: (data) => dispatch(actions.getStaterKitProducts(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpgradeMembershipPage);
