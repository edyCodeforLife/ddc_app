import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Button, Checkbox, InputNumber, Form } from 'antd';

import * as actions from '../../../../actions/index';
import DarkTitle from './../../../../components/UI/DarkTitle';
import TarikSaldoOTP from './TarikSaldoOTP';

const wrapperStyle = {
  margin: -15,
};

const FormItem = Form.Item;

class TarikSaldoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOTP: false,
      isConfirm: false,
      withdrawAmount: 0,
      withdrawAmountFormInput: null,
    };
  }

  componentDidMount() {
    this.props.setToolbarState({
      title: 'Tarik Saldo',
      hideBurgerMenu: false,
      showCart: false,
      showProfile: false,
      showFooter: false,
    });
  }

  /**
   * On Change Checkbox Confirm
   */
  onChangeConfirm = (e) => {
    this.setState({
      isConfirm: e.target.checked,
    });
  };

  /**
   * On Change Withdraw Amount
   */
  onChangeWithdrawAmount = (value) => {
    let withdrawAmountFormInput = null;
    if (value < 15000) {
      // Validate minimum withdraw 15000
      withdrawAmountFormInput = {
        validateStatus: 'error',
        help: 'Minimum penarikan saldo sebesar Rp 15,000.',
      };
    } else if (value > this.props.member.totalBalance) {
      withdrawAmountFormInput = {
        validateStatus: 'error',
        help: 'Saldo anda tidak mencukupi untuk melakukan penarikan.',
      };
    }
    this.setState({
      withdrawAmount: value,
      withdrawAmountFormInput,
    });
  };

  /**
   * On Click Show OTP
   */
  onClickShowOTP = (flag) => {
    // console.log(flag);
    this.setState({
      showOTP: flag,
    });
  };

  render() {
    let disableButton = true;

    if (this.state.isConfirm) {
      if (
        this.state.withdrawAmountFormInput === null &&
        this.state.withdrawAmount > 0
      ) {
        disableButton = false;
      }
    }

    if (this.props.authentication.isAuthenticated) {
      if (!this.props.member.memberBankAccount.accountNumber) {
        return <Redirect to="/profil/akun/edit-bank" />;
      }
    }

    return this.props.isAuthenticated ? (
      <div style={wrapperStyle}>
        <DarkTitle>
          Saldo Anda :{' '}
          <span className="font-weight-bold">
            <NumberFormat
              value={this.props.member.totalBalance}
              displayType={'text'}
              thousandSeparator
              prefix={'Rp. '}
            />
          </span>
        </DarkTitle>

        <div className="p-15" style={{ minHeight: '75vh' }}>
          <Form layout="vertical" noValidate>
            <FormItem
              label="Jumlah Penarikan"
              {...this.state.withdrawAmountFormInput}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="0"
                min={0}
                onChange={this.onChangeWithdrawAmount}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Form>

          <div className="mt-20">
            <div className="mb-10 text-label">Rekening Tujuan</div>
            <div
              className="p-15 bg-gray"
              style={{ borderRadius: 3, border: 'solid 1px #dcdcdc' }}
            >
              <div>
                <div className="text-label font-color-gray">Nama Bank</div>
                <div className="font-weight-bold">
                  {this.props.member.memberBankAccount.bankName}
                </div>
              </div>
              <div className="mt-15">
                <div className="text-label font-color-gray">No. Rekening</div>
                <div className="font-weight-bold">
                  {this.props.member.memberBankAccount.accountNumber}
                </div>
              </div>
              <div className="mt-15">
                <div className="text-label font-color-gray">
                  Nama Pemilik Rekening
                </div>
                <div className="font-weight-bold">
                  {this.props.member.memberBankAccount.accountName}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p>
              Demi kelancaran proses pencairan, mohon pastikan kembali nama dan
              nomor rekening yang dicantumkan sudah sesuai dengan buku tabungan
              Anda.
            </p>
          </div>

          <div className="mt-30">
            <Checkbox
              checked={this.state.isConfirm}
              onChange={this.onChangeConfirm}
            >
              Data yang saya masukan sudah benar
            </Checkbox>
          </div>
        </div>
        <div className="p-15">
          <Button
            className="btn-block"
            type="primary"
            htmlType="button"
            disabled={disableButton}
            onClick={() => this.onClickShowOTP(true)}
          >
            Cairkan Saldo Sekarang
          </Button>
        </div>

        {this.state.showOTP && (
          <TarikSaldoOTP
            balance={this.state.withdrawAmount}
            onClickShowOTP={() => this.onClickShowOTP()}
          />
        )}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  isAuthenticated: state.get('authentication').isAuthenticated,
  saldo: state.get('saldo'),
  authentication: state.get('authentication'),
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getSaldoIns: () => dispatch(actions.getSaldoIns()),
  getSaldoOuts: (data) => dispatch(actions.getSaldoOuts(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TarikSaldoPage)
);
