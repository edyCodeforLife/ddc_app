import React from 'react';
import { Row, Icon, Modal, Input, Button, Form } from 'antd';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import * as actions from '../../../actions/index';
import BenefitCard from './benefitCard';
import PaketCard from './paketCard';
import FooterHelper from '../../../components/FooterHelper';
import constant from './../../../utils/configs/constant';
import background from '../../../../assets/images/img-upgrade-reseller@2x.png';
import backgroundTrial from '../../../../assets/images/img-trial-reseller@2x.png';

// Renderer callback with condition
const renderer = ({ total, days, hours, minutes, seconds, completed }) => {
  // const totalHours = days * 24 + hours;
  const totalHours = Math.round(total / 1000 / (60 * 60));
  return (
    <span>
      <div className="ddc_coundown__block--trial">{totalHours}</div>
      <span style={{ margin: '0px 6.5px' }}>:</span>
      <div className="ddc_coundown__block--trial">{minutes}</div>
      <span style={{ margin: '0px 6.5px' }}>:</span>
      <div className="ddc_coundown__block--trial">{seconds}</div>
    </span>
  );
};
const FormItem = Form.Item;
export class ContainerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBenefitandPaket: false,
      showModalVoucher: false,
      voucherCode: '',
      voucherForm: {
        validateStatus: null,
      },
      showModalVoucher: true,
      showModalSuccess: false,
    };
  }
  showBenefitandPaket = () => {
    this.setState({ showBenefitandPaket: !this.state.showBenefitandPaket });
  };

  onChangeVoucher = (event) => {
    let validateStatus = null;
    const startDate = moment(constant.CONFIG_PROMO.PROMO_START_DATE);
    const endDate = moment(constant.CONFIG_PROMO.PROMO_END_DATE);
    const currentDate = new Date();

    if (
      currentDate >= startDate &&
      currentDate <= endDate &&
      constant.CONFIG_ORDER.REGISTRATION_VOUCHER.includes(event.target.value)
    ) {
      validateStatus = 'success';
      const _this = this
      this.props.starterKitProducts.map(x => {
        _this.props.refresh(x);
      })
     
    } else if (event.target.value.length > 0) {
      validateStatus = 'error';
    }
    this.setState({
      voucherCode: event.target.value,
      voucherForm: { validateStatus },
    });
  };

  showModalSuccess = () => {
    this.setState({
      showModalVoucher: false,
      showModalSuccess: true,
    });
  };

  onClickOpenModalVoucher = () => {
    this.setState({
      showModalVoucher: true,
    });
  };

  handleConfirmSuccess = () => {
    this.setState({
      showModalSuccess: false,
    });
  };

  showModalVoucher = () => {
    this.setState({
      showModalCustomDelivery: true,
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


  render() {
    const upDown = {
      backgroundColor: 'rgb(255, 255, 255)',
      boxShadow: '0 2px 5px 0 rgba(40, 40, 40, 0.2)',
      color: '#8c8c8c',
      width: 40,
      height: 40,
      marginTop: '-33px',
      borderRadius: '50%',
      zIndex: 9,
    };
    return (
      <React.Fragment>
        {this.props.member.trial ? (
          <Row
            className="Membership__page-container"
            style={{
              backgroundImage: `url(${backgroundTrial})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div
              className="campaign__upgrade-member"
              style={{ marginTop: '30%' }}
            >
              Sisa Waktu Paket Trial Anda
            </div>
            <div className="text-center">
              <Countdown
                date={moment(this.props.member.trialEndDate)}
                renderer={renderer}
              />
            </div>
          </Row>
        ) : (
            <Row
              className="Membership__page-container"
              style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div className="campaign__upgrade-member">
                Upgrade Akunmu Sekarang! Nikmati Keuntungan Berbelanja Dengan
                Harga Murah!
            </div>
            </Row>
          )}
        <Row type="flex" justify="center">
          <div style={upDown}>
            <Icon
              className="clickable"
              type={this.state.showBenefitandPaket ? 'up' : 'down'}
              onClick={this.showBenefitandPaket}
              style={{ padding: '13px 14px', color: 'rgb(40, 40, 40)' }}
            />
          </div>
        </Row>
        {/* <React.Fragment>
          <Modal
            visible={this.state.showModalVoucher}
            width={320}
            footer={null}
            bodyStyle={{ paddingBottom: 15 }}
            onCancel={this.onClickCancelModalVoucher}
          >
            <div className="mt-10 text-center">
              Masukkan kode voucher dan dapatakan potongan harga spesial dari Kami.
          </div>
            <div style={{ marginTop: 20 }}>
              <FormItem
                label="Kode Voucher"
                hasFeedback
                validateStatus={this.state.voucherForm.validateStatus}
              >
                <Input
                  type="text"
                  value={this.state.voucherCode}
                  onChange={this.onChangeVoucher}
                  placeholder="Masukkan Kode Voucher"
                />
              </FormItem>
            </div>
            <div>
              <Button
                className="btn-block"
                type="primary"
                disabled={this.state.voucherForm.validateStatus !== 'success'}
                onClick={this.showModalSuccess}
              >
                Gunakan
            </Button>
            </div>
          </Modal>
          <Modal
            visible={this.state.showModalSuccess}
            width={320}
            footer={null}
            bodyStyle={{ paddingBottom: 15 }}
            onCancel={this.onClickConfirmation}
            onClick={this.showModalSuccess}
          >
            <Row style={{ marginTop: '10px', padding: '14px 2px' }}>
              <div className="getVoucherRegister">
                Selamat anda mendapatkan promo paket event yang bisa anda pilih
                nanti.
            </div>
              <div style={{ paddingTop: 20 }}>
                <Button
                  className="btn-block"
                  htmlType="button"
                  type="primary"
                  onClick={this.handleConfirmSuccess}
                >
                  <span className="confirmGetVoucher">Saya Mengerti</span>
                </Button>
              </div>
            </Row>
          </Modal>
        </React.Fragment> */}
        {this.state.showBenefitandPaket ? (
          <React.Fragment>
            <BenefitCard />
          </React.Fragment>
        ) : null}
        <PaketCard
          member={this.props.member}
          pilihPaket={this.props.starterKitProducts}
          onClickSelectProduct={this.props.onClickSelectProduct}
          isVoucher = {this.state.voucherForm.validateStatus}
        />
        <Row style={{ padding: 15, background: 'rgba(204, 204, 204, 0.16)' }}>
          <FooterHelper />
        </Row>
        <Row style={{ padding: 15, background: 'rgba(204, 204, 204, 0.16)' }}>
          <div
            className="footer__copywrite"
            style={{
              borderTop: '1px solid #2828282b',
              paddingTop: '20px',
            }}
          >
            {constant.COPYRIGHT}
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

export default ContainerCard;
