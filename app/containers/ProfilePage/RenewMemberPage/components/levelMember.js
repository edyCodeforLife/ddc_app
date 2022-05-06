import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, message } from 'antd';
import moment, { now } from 'moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import constant from '../../../../utils/configs/constant';
import * as actions from '../../../../actions/index';

moment.locale('id');

export class LevelMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment(new Date()).format('DD/MM/YYYY'),
      startDate: moment(this.props.member.expiredDate).format('DD/MM/YYYY'),
      endDate: moment(this.props.member.expiredDate)
        .add(1, 'M')
        .format('DD/MM/YYYY'),
    };
  }
  render() {
    if (this.props.formSuccess !== null && this.props.formSuccess) {
      // Promo 12.12 Lock User from Renewal

      message.success('Terima Kasih Telah Melakukan Renewal');
      this.props.renewalSuccessReset();
      return <Redirect to="/beranda" />;
    }

    // if (this.props.formSuccess && this.props.formSuccess.formSuccess) {
    //   message.success('Terima Kasih Telah Melakukan Renewal');
    //   this.props.storeRenewalTopReset();
    //   return <Redirect to="/beranda" />;
    // }
    const currentDate = new Date();
    const expiredDate = moment(this.props.member.expiredDate);
    return (
      <div className="view__level-member">
        <Row>
          <Row
            type="flex"
            justify="start"
            align="middle"
            className="header__level-class"
          >
            <Col span={24}>
              <span className="saldo__page-member-label">Level Anda :</span>{' '}
              <span className="saldo__page-member">
                {this.props.member.memberLevelName}
              </span>
            </Col>
          </Row>
          <div className="status__member-now">Status Member</div>
          <div style={{ overflowX: 'auto', padding: '0px 15px' }}>
            <div className="level__table">
              <table>
                <tr>
                  <th>Bergabung</th>
                  <th>Berakhir</th>
                </tr>
                <tr>
                  <td>{moment(this.props.member.createAt).format('LL')}</td>
                  <td>{moment(this.props.member.expiredDate).format('LL')}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="status__member-now">Masa Aktif Diskon</div>
          <div style={{ overflowX: 'auto', padding: '0px 15px' }}>
            <div className="level__table">
              <table>
                <tr>
                  <th>Berlaku</th>
                  <th>Berakhir</th>
                </tr>
                <tr>
                  <td>
                    {moment(this.props.member.memberLevelStartDate).format(
                      'LL'
                    )}
                  </td>
                  <td>
                    {moment(this.props.member.memberLevelEndDate).format('LL')}
                  </td>
                </tr>
              </table>
            </div>
            <div style={{ paddingTop: 15 }}>{}</div>
            <div className="methode__renew">
              Perpanjang Membership Anda melalui salah satu cara dibawah ini.
            </div>
            <React.Fragment>
              {(this.props.member.memberLevelName === 'REGULER' ||
                this.props.member.memberLevelName === 'UPRISING') && (
                <Row
                  type="flex"
                  align="middle"
                  justify="space-between"
                  gutter={16}
                  style={{ paddingBottom: 30, paddingTop: 30 }}
                >
                  <Col span={12}>
                    <Button
                      className="btn-block"
                      type="default"
                      htmlType="button"
                      onClick={() => this.props.showModal()}
                    >
                      Potong {constant.CONFIG_PAYMENT.RENEWAL_POIN} poin
                    </Button>
                    {/* <div className="text-center font-size-smaller">
                      Kuota Promo Renewal 12 poin hari ini sudah full terpakai.
                      Silahkan datang lagi besok pada jam 9:00 WIB jika mau
                      perpanjang menggunakan promo 12 poin.
                    </div> */}
                    {/* <div className="text-center font-size-smaller">
                      Promo Renewal 12 poin saat ini sudah penuh, silahkan coba beberapa
                      menit lagi.
                    </div> */}
                  </Col>
                  <Col span={12}>
                    <Button
                      className="btn-block"
                      type="default"
                      htmlType="button"
                      onClick={this.props.onClickSelectProduct}
                    >
                      <NumberFormat
                        value={constant.CONFIG_PAYMENT.RENEWAL_PRICE}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp '}
                      />
                      /Thn
                    </Button>
                  </Col>
                </Row>
              )}
              {this.props.member.memberLevelName === 'TOP' && (
                <Row
                  type="flex"
                  align="middle"
                  justify="space-between"
                  gutter={16}
                  style={{ paddingBottom: 30, paddingTop: 30 }}
                >
                  <Col span={12}>
                    {currentDate > expiredDate ? (
                      <Button
                        className="btn-block"
                        type="default"
                        htmlType="button"
                        onClick={() => this.props.showModalTop()}
                      >
                        Bayar 0 Rupiah
                      </Button>
                    ) : (
                      <Button
                        className="btn-block"
                        type="default"
                        htmlType="button"
                        onClick={() => this.props.showModalTop()}
                        disabled="disabled"
                      >
                        Bayar 0 Rupiah
                      </Button>
                    )}
                  </Col>
                </Row>
              )}
            </React.Fragment>
            <Row
              type="flex"
              align="middle"
              justify="space-between"
              style={{ padding: '10px 0px' }}
            >
              <div className="label__point-sum">
                Point yang Anda miliki saat ini {this.props.member.memberPoint}
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  formSuccess: state.get('renewalByPoin').formSuccess,
  formSuccesss: state.get('renewalByPoin').renewal,
});

const mapDispatchToProps = (dispatch) => ({
  renewalSuccessReset: () => dispatch(actions.renewalSuccessReset()),
  storeRenewalTopReset: () => dispatch(actions.storeRenewalTopReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelMember);
