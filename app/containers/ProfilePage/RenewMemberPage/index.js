import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

import constant from '../../../utils/configs/constant';
import * as actions from '../../../actions/index';
import LevelMember from './components/levelMember';
import RenewalPayment from './components/RenewalPayment';

// Testing CI CD

class RenewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      failedModal: false,
      paymentMethodId: 5,
      modalTop: false,
      renewalConfirmation: null,
      token: null,
    };
  }

  componentDidMount() {
    this.props.setToolbarState({
      hideBackButton: true,
      showCart: true,
      showProfile: true,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  // componentWillUpdate() {
  //   const token = localStorage.getItem('token');
  //   this.props.getLoginInformation(token);
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.formError !== prevProps.formError) {
      if (this.props.formError.formError === true) {
        this.setState({
          failedModal: true,
        });
      }
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModalTop = () => {
    this.setState({
      modalTop: true,
    });
  };
  //  showFailed = () =>{
  //    this.setState({
  //     showVisible:,
  //    });
  //  }
  confirmationHandle = () => {
    this.setState({
      visible: false,
      paymentMethodId: this.state.paymentMethodId,
    });
    this.props.orderRenewalByPoin(this.state.paymentMethodId);
  };

  confirmationHandleTop = () => {
    this.props.orderRenewalTop(this.props.authentication.token);
    this.setState({
      modalTop: false,
    });
  };

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
  onClickSelectProduct = () => {
    // console.log('Hit');
    this.setState({
      showPayment: true,
    });
  };

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancelTop = (e) => {
    // console.log(e);
    this.setState({
      modalTop: false,
    });
  };
  handleOkTop = (e) => {
    // console.log(e);
    this.setState({
      modalTop: false,
    });
  };
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      failedModal: false,
    });
  };

  render() {
    const styleButton = {
      fontSize: '14px',
      fontweight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'right',
      color: 'rgb(22, 184, 178)',
      border: 'none',
    };

    return (
      <div>
        {this.state.showPayment && (
          <div style={{ marginLeft: -15, marginRight: -15 }}>
            <RenewalPayment onClickShowPayment={this.onClickShowPayment} />
          </div>
        )}

        <Modal
          title="Informasi"
          className="styleTitle"
          visible={this.state.failedModal}
          onOk={this.onOk}
          footer={[
            <Button key="ok" onClick={this.handleOk} style={styleButton}>
              OK, Saya Mengerti
            </Button>,
          ]}
        >
          <p className="styleContain">
            Poin yang Anda miliki kurang dari{' '}
            {constant.CONFIG_PAYMENT.RENEWAL_POIN}, Anda tidak bisa menggunakan
            Poin untuk memperpanjang keanggotaan.
          </p>
        </Modal>
        <Modal
          title="Konfirmasi"
          className="styleTitle"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="ok"
              onClick={() => this.confirmationHandle()}
              style={styleButton}
            >
              Ya, Saya Setuju
            </Button>,
          ]}
        >
          <p className="styleContain">
            Total poin yang Anda miliki akan di potong{' '}
            {constant.CONFIG_PAYMENT.RENEWAL_POIN} untuk memperpanjang
            keanggotaan Anda.
          </p>
        </Modal>
        <Modal
          title="Konfirmasi"
          className="styleTitle"
          visible={this.state.modalTop}
          onCancel={this.handleCancelTop}
          footer={[
            <Button
              key="ok"
              onClick={() => this.confirmationHandleTop()}
              style={styleButton}
            >
              Ok
            </Button>,
          ]}
        >
          <p className="styleContain">
            Anda melakukan Renewal dengan biaya 0 Rupiah.
          </p>
        </Modal>
        <div style={{ marginBottom: '10px' }}>
          {this.props.member !== null && (
            <LevelMember
              member={this.props.member}
              sukses={this.props.formSuccess}
              renewalSuccessReset={this.props.renewalSuccessReset}
              // storeRenewalTopReset={this.props.storeRenewalTopReset}
              onClickSelectProduct={this.onClickSelectProduct}
              showModal={() => this.showModal()}
              showModalTop={() => this.showModalTop()}
            />
          )}
        </div>
        <div>{/* <HistoryTransaksiMember member={this.props.member} /> */}</div>
      </div>
      // ) : (
      //   <Redirect to="/" />
      // )
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  member: state.get('authentication').member,
  formError: state.get('renewalByPoin').formError,
  formSuccess: state.get('renewalByPoin').renewal,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  orderRenewalByPoin: (data) => dispatch(actions.orderRenewalByPoin(data)),
  orderRenewalTop: (data) => dispatch(actions.orderRenewalTop(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  renewalSuccessReset: () => dispatch(actions.renewalSuccessReset()),
  storeRenewalTopReset: () => dispatch(actions.storeRenewalTopReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenewPage);
