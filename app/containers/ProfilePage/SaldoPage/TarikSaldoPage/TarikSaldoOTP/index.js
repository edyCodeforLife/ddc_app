import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col, Select, Spin, message } from 'antd';
import OtpInput from 'react-otp-input';
import Countdown from 'react-countdown-now';

import * as actions from '../../../../../actions/index';
import { Redirect } from 'react-router-dom';

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => (
  <span>
    {minutes}
    <span style={{ margin: '0px 6.5px' }}>:</span>
    {seconds}
  </span>
);

class TarikSaldoOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completions: 0,
      disableButton: true,
      countdown: null,
      otp: null,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.sendOTP();
  }

  componentDidUpdate(prevProps, prevState) {}

  sendOTP = () => {
    this.setState({
      completions: this.state.completions + 1,
      disableButton: true,
      countdown: Date.now() + 60 * 1000,
    });
    this.disableButton();
    this.props.postOTPTarikSaldo({
      number: this.props.member.internationalPhone,
    });
  };

  /**
   * Disable Button for 60 second
   * and Reset Countdown
   */
  disableButton = () => {
    setTimeout(() => {
      this.setState({
        disableButton: false,
      });
    }, 60 * 1000);
  };

  /**
   * On Change OTP
   */
  onChangeOTP = (value) => {
    this.setState({
      otp: parseInt(value, 0),
    });
  };

  /**
   * Submit OTP
   */
  submitOTP = () => {
    if (this.state.otp >= 1000) {
      this.props.postTarikSaldo({
        balance: this.props.balance,
        otp: parseInt(this.state.otp, 0),
      });
    }
  };

  render() {
    if (this.props.formSuccess) {
      return <Redirect to="/profil/saldo" />;
    }

    if (this.props.formError) {
      if (
        this.props.formError === 'Penarikan sebelumnya dalam proses verifikasi'
      ) {
        message.error('Penarikan sebelumnya dalam proses verifikasi');
        return <Redirect to="/profil/saldo" />;
      }
      this.props.storeSaldo({ formError: null });
      this.props.onClickShowOTP(false);
      message.error('Kode yang anda masukan salah.');
    }

    return (
      <div className="curtain" style={{ backgroundColor: '#fafafa' }}>
        <Spin spinning={this.props.loading}>
          <div className="text-center" style={{ padding: 20 }}>
            <div className="font-size-small" style={{ marginTop: '20%' }}>
              Masukkan kode verifikasi yang Kami SMS ke nomor handphone Kamu
              yang terdaftar di bawah ini.
            </div>
            <div className="mt-20 font-color-orange font-weight-bold font-size-bigger">
              {this.props.member.phone}
            </div>
            <div style={{ marginTop: 30 }}>Masukkan Kode</div>
            <div style={{ marginTop: 30 }}>
              <OtpInput
                onChange={this.onChangeOTP}
                numInputs={4}
                containerStyle={{ justifyContent: 'center' }}
                inputStyle={{
                  width: 50,
                  height: 80,
                  fontSize: 40,
                  margin: 10,
                  borderWidth: '0 0 1px 0',
                  borderColor: '#282828',
                  backgroundColor: 'transparent',
                  color: '#f5821f',
                  borderRadius: 0,
                }}
              />
            </div>
            <div style={{ marginTop: 30 }}>
              Kirim ulang kode dalam{' '}
              <Countdown
                key={this.state.completions}
                date={this.state.countdown}
                renderer={renderer}
              />
            </div>
            <div style={{ marginTop: 30 }}>
              {this.state.otp &&
              this.state.otp >= 1000 &&
              this.state.disableButton ? (
                <Button type="primary" onClick={() => this.submitOTP()}>
                  Submit Kode
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={this.state.disableButton}
                  onClick={() => this.sendOTP()}
                >
                  Kirim Ulang Kode
                </Button>
              )}
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

TarikSaldoOTP.propTypes = {};

const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  loading: state.get('saldo').loading,
  formSuccess: state.get('saldo').formSuccess,
  formError: state.get('saldo').formError,
});

const mapDispatchToProps = (dispatch) => ({
  postOTPTarikSaldo: (data) => dispatch(actions.postOTPTarikSaldo(data)),
  postTarikSaldo: (data) => dispatch(actions.postTarikSaldo(data)),
  storeSaldo: (data) => dispatch(actions.storeSaldo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TarikSaldoOTP);
