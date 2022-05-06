import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Spin, Row, Col, Divider } from 'antd';
import NumberFormat from 'react-number-format';

import * as actions from '../../../../actions/index';
// import CustomSVG from './../../components/CustomSVG';
import WaitingPayment from './WaitingPayment/index';
import OrderCard from './OrderCard';
import FooterHelper from '../../../../components/FooterHelper';
import OrderGroup from './OrderGroup';
import VAHowToUse from './WaitingPayment/VAHowToUse';

const wrapperStyle = {
  backgroundColor: '#fafafa',
};

const footerStyle = {
  padding: 15,
  boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
  backgroundColor: '#ffffff',
};

class TransactionDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: this.props.match.params.uuid,
    };

    this.props.setToolbarState({
      title: 'Detail Order',
      hideBackButton: false,
      hideBurgerMenu: true,
      showProfile: false,
      showCart: false,
    });
  }

  componentDidMount() {
    if (
      this.props.authentication &&
      this.props.authentication.member &&
      this.props.authentication.member.id
    ) {
      this.getTransactions();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.transaction &&
      this.props.transaction !== prevProps.transaction
    ) {
      if (
        this.props.transaction.orderTypeId === 2 &&
        this.props.transaction.totalPrice === 0
      ) {
        // Get Transaction if Total Price === 0, Only work if Order Type Purchase
        this.getTransactions();
      } else if (this.props.transaction.orderDetail.length > 0) {
        this.props.transaction.orderDetail.map((order) => {
          if (
            order.deliveryMethod === 'Kirim Alamat' &&
            (order.orderStatusId === 4 || order.orderStatusId === 6)
          ) {
            const query = {
              id: order.id,
              resiNumber: order.resiNumber,
              shippingName: order.shippingName,
            };
            this.getShipmentTracking(query);
          }
        });
      }
    } else if (
      !this.props.transaction
      // && this.props.transaction !== prevProps.transaction
    ) {
      // Refresh every 2 second
      this.timer = setTimeout(() => {
        if (!this.props.transaction) {
          this.getTransactions();
        }
        // console.log('Hit');
        clearTimeout(this.timer);
      }, 2000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * On Click 'Konfirmasi Pesanan Sampai'
   * orderStatusId = 6 (Pesanan Diterima)
   * orderStatusId = 9 (Telah Diambil)
   */
  onClickOrderDelivered = (uuid, orderStatusId) => {
    const data = {
      uuid,
      orderStatusId,
    };
    this.props.putOrderStatus(data);
  };

  /**
   * Get Shipment Tracking
   */
  getShipmentTracking = (data) => {
    this.props.getShipmentTracking(data);
  };

  /**
   * Get Transactions
   */
  getTransactions = () => {
    const query = `memberId:${this.props.authentication.member.id},uuid:${
      this.state.uuid
    }`;
    const data = {
      query,
    };
    this.props.getTransactions(data);
  };

  render() {
    const TabPane = Tabs.TabPane;

    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.formSuccess) {
      this.getTransactions();
      this.props.storeTransaction({ formSuccess: false });

      const token = localStorage.getItem('token');
      this.props.getLoginInformation({ token });
    }
    console.log(this.props.transaction);
    if (this.props.loading) {
      return (
        <div className="text-center" style={{ marginTop: '40%' }}>
          <Spin />
        </div>
      );
    }

    return !this.props.transaction ? null : (
      // <Redirect to="/profil/transaksi" />
      <div style={{ marginLeft: -15, marginRight: -15, marginBottom: -15 }}>
        <Spin spinning={this.props.loading}>
          <Tabs
            className="ddc__twoTabs"
            defaultActiveKey="status"
            tabBarGutter={0}
            onChange={this.onChangeTab}
            style={{ minHeight: '40vh' }}
          >
            <TabPane tab="Status" key="status">
              {/* {this.props.transaction.transactions.map((transaction) => (
                <TransactionCard transaction={transaction} />
              ))} */}
              <div style={wrapperStyle}>
                <div style={{}}>
                  {this.props.transaction.orderStatusId === 1 ? (
                    <WaitingPayment transaction={this.props.transaction} />
                  ) : (
                    this.props.transaction.orderDetail.map((order) => (
                      <OrderCard
                        trackings={this.props.trackings}
                        transaction={this.props.transaction}
                        order={order}
                        onClickOrderDelivered={this.onClickOrderDelivered}
                        key={order.id}
                      />
                    ))
                  )}
                </div>
                {this.props.transaction.orderStatusId === 1 &&
                  this.props.transaction.paymentMethodId === 2 && (
                    <div>
                      <div className="bg-white">
                        <VAHowToUse transaction={this.props.transaction} />
                      </div>
                      <Divider style={{ width: '0px' }} className="my-2" />
                    </div>
                  )}
                {this.props.transaction.orderTypeId === 6 && (
                  <div
                    className="font-weight-bold"
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      padding: 15,
                      backgroundColor: '#ffffff',
                      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
                    }}
                  >
                    Renewal
                  </div>
                )}

                <div style={footerStyle}>
                  <FooterHelper />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Rincian" key="detail">
              {this.props.transaction.orderDetail.map((order) => (
                <OrderGroup order={order} key={order.id} />
              ))}

              {/* BEGIN : Total */}
              <div className="p-15 bg-white box-shadow font-size-small">
                {this.props.discount && (
                  <Row className="mb-25" type="flex" justify="space-between">
                    <Col>Ekstra Diskon (0%)</Col>
                    <Col className="font-weight-bold">
                      <NumberFormat
                        value={0}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp '}
                      />
                    </Col>
                  </Row>
                )}

                <Row type="flex" justify="space-between">
                  <Col>Total Belanja</Col>
                  <Col className="font-weight-bold font-size-big">
                    {this.props.transaction.totalPoint > 0 ? (
                      <NumberFormat
                        value={this.props.transaction.totalPoint}
                        displayType={'text'}
                        thousandSeparator
                        suffix={' Poin '}
                      />
                    ) : (
                      <NumberFormat
                        value={this.props.transaction.totalPrice}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp '}
                      />
                    )}
                  </Col>
                </Row>
              </div>
              {/* END : Total */}

              {/* BEGIN : Payment Info */}
              <div className="mt-20 p-15 bg-white box-shadow">
                <div className="font-weight-bold">Metode Pembayaran</div>
                <div className="mt-25 font-size-small">
                  <Row type="flex">
                    <Col span={10}>Pembayaran via</Col>
                    <Col span={14}>
                      :&nbsp;
                      <span className="font-weight-bold">
                        {this.props.transaction.paymentMethodName}
                      </span>
                    </Col>
                  </Row>
                  {this.props.transaction.paymentMethodId === 1 && (
                    // Only show if payment method Bank Transfer
                    <Row type="flex">
                      <Col span={10}>Bank</Col>
                      <Col span={14}>
                        :&nbsp;
                        <span className="font-weight-bold">
                          {this.props.transaction.bankName}
                        </span>
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
              {/* END : Payment Info */}

              <div className="mt-10" style={footerStyle}>
                <FooterHelper />
              </div>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

TransactionDetailPage.propTypes = {
  transaction: PropTypes.object,
  authentication: PropTypes.object,
  // loading: PropTypes.boolean,
  getTransactions: PropTypes.func,
  setToolbarState: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  loading: state.get('transaction').loading,
  transaction: state.get('transaction').transactions
    ? state.get('transaction').transactions[0]
    : null,
  trackings: state.get('transaction').trackings,
  formSuccess: state.get('transaction').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  storeTransaction: (data) => dispatch(actions.storeTransaction(data)),
  putOrderStatus: (data) => dispatch(actions.putOrderStatus(data)),
  getShipmentTracking: (data) => dispatch(actions.getShipmentTracking(data)),
  getTransactions: (data) => dispatch(actions.getTransactions(data)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionDetailPage);
