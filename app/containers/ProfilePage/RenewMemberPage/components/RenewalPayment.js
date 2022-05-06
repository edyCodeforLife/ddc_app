import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col } from 'antd';

import * as actions from '../../../../actions/index';
import PaymentPage from '../../../PaymentPage';
import constant from '../../../../utils/configs/constant';
import ResellerThankYou from '../../../RegistrationMemberResellerPage/ResellerThankYou';

class RegistrationPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showThankYou: false,
      price: constant.CONFIG_PAYMENT.RENEWAL_PRICE,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    // If Form Success
    if (this.props.payment.formSuccess) {
      this.setState({ showThankYou: true });
      this.props.storePayment({ formSuccess: false });
    }

    if (this.state.showThankYou) {
      return (
        <ResellerThankYou
          title="Terima Kasih Telah Melakukan Renewal"
          content="Silahkan melakukan pembayaran dan konfirmasi."
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

    // console.log(this.props);
    return (
      <div className="curtain" style={{ backgroundColor: '#fafafa' }}>
        <div className="toolbar">
          <Row type="flex" justify="center">
            <Icon
              type="close"
              className="clickable"
              style={{ fontSize: 24, marginLeft: 10 }}
              onClick={() => this.props.onClickShowPayment(false)}
            />
            <span
              className="font-weight-bold"
              style={{ marginTop: 2, marginLeft: 10, fontSize: 18 }}
            >
              Pembayaran
            </span>
          </Row>
        </div>

        <div
          className="bg-white"
          style={{ marginTop: 65, marginLeft: 15, marginRight: 15 }}
        >
          <PaymentPage
            isMembership
            isRenewal
            price={this.state.price}
            shippingCost={0}
            shippingName={null}
            productId={null}
            totalWeight={null}
          />
        </div>
      </div>
    );
  }
}

RegistrationPayment.propTypes = {};

const mapStateToProps = (state) => ({
  payment: state.get('payment'),
});

const mapDispatchToProps = (dispatch) => ({
  storePayment: (data) => dispatch(actions.storePayment(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPayment);
