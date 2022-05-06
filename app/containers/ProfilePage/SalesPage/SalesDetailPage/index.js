import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {
  Button,
  Spin,
  Row,
  Col,
  message,
  Checkbox,
  Select,
  Input,
  Divider,
} from 'antd';
import Countdown from 'react-countdown-now';

import * as actions from '../../../../actions/index';
import OrderGroup from './../../TransactionPage/TransactionDetailPage/OrderGroup/';
import validationMessages from './../../../../utils/configs/validationMessages';
import TrackingTable from '../../TransactionPage/TransactionDetailPage/OrderCard/TrackingTable';
import RejectCurtain from './reject-curtain';

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => (
  <span>
    <span>{hours}</span>
    <span style={{ margin: '0px 3px' }}>jam</span>
    <span>{minutes}</span>
    <span style={{ margin: '0px 3px' }}>menit</span>
    <span>{seconds}</span>
    <span style={{ margin: '0px 3px' }}>detik</span>
  </span>
);

const PaymentInformation = (props) => {
  let value = props.value;
  if (props.isCountdown) {
    value = new Date(props.value);
    value.setDate(value.getDate() + 1); // Add 1 day
  }
  return (
    <Row type="flex" justify="space-between">
      <Col span={10}>
        <Row type="flex" justify="space-between">
          <Col>{props.label}</Col>
          <Col>:</Col>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: 5 }}>
        <span style={{ fontWeight: 'bold' }}>
          {props.isCountdown ? (
            <Countdown date={new Date(value)} renderer={renderer} />
          ) : (
            value
          )}
        </span>
      </Col>
    </Row>
  );
};

const Option = Select.Option;

class SalesDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: this.props.match.params.uuid,
      isCustomShipping: false,
      shippingName: null,
      resiNumber: null,
      textCustomShipping: '',
    };

    this.props.setToolbarState({
      title: 'Detail',
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
      const query = `uuid:${this.state.uuid}`;
      const data = {
        query,
      };
      this.props.getTDSOrders(data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.order) {
      const order = this.props.order[0];
      if (order && this.props.order !== prevProps.order) {
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
      }
    }
    const customShipping = document.getElementById('customshipping');
    if (this.state.shippingName === 'Lainnya') {
      if (customShipping) {
        customShipping.classList.remove('d-none');
      }
    }
    if (this.state.shippingName !== 'Lainnya') {
      if (customShipping) {
        customShipping.classList.add('d-none');
      }
    }
  }

  /**
   * On Click Show Filter
   */
  onClickShowFilter = () => {
    const curtainForm = document.getElementById('containercurtain');
    curtainForm.classList.add('d-none');
  };

  getShipmentTracking = (data) => {
    this.props.getShipmentTracking(data);
  };

  onClickOrderStatus = (orderStatusId) => {
    const customShipping = document.getElementById('customshipping');
    const formData = {
      uuid: this.props.match.params.uuid,
      orderStatusId,
    };
    if (orderStatusId === 4) {
      // 4 = Pesanan Dikirim
      formData.resiNumber = this.state.resiNumber;
      if (this.state.isCustomShipping) {
        formData.shippingName = this.state.shippingName;
      }
      if (this.state.isCustomShipping &&
        this.state.shippingName === 'Lainnya'
      ) {
        if (customShipping) {
          formData.shippingName = this.state.textCustomShipping;
        }
      }
    }
    console.log(formData);
    this.props.putTDSOrder(formData);
  };

  onChangeCustomShipping = (e) => {
    this.setState({
      isCustomShipping: e.target.checked,
    });
  };

  buttonReject = (e) => {
    e.preventDefault();
    const curtainForm = document.getElementById('containercurtain');
    curtainForm.classList.remove('d-none');
  };

  onChangeShippingName = (value) => {
    this.setState({
      shippingName: value,
    });
  };

  onInputChange = (e) => {
    this.setState({
      textCustomShipping: e.target.value,
    });
  };

  onChangeResiNumber = (e) => {
    this.setState({
      resiNumber: e.target.value,
    });
  };

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    // Redirect if not TDS
    if (this.props.authentication.member.memberTypeName !== 'TDS') {
      return <Redirect to="/" />;
    }

    /**
     * Handle Submit Success or Fail
     */
    if (this.props.requestTDS.formSuccess || this.props.requestTDS.formError) {
      if (this.props.requestTDS.formSuccess) {
        const query = `uuid:${this.state.uuid}`;
        const data = {
          query,
        };
        this.props.getTDSOrders(data);
      } else if (this.props.requestTDS.formError) {
        message.error(validationMessages.PUT_ERROR);
      }

      this.props.storeRequestTDS({ formSuccess: false, formError: false });
    }

    if (this.props.loading) {
      return (
        <div className="text-center" style={{ marginTop: '40%' }}>
          <Spin />
        </div>
      );
    } else if (!this.props.order) {
      return null;
    }
    const order = this.props.order[0];

    const value = new Date(order.paymentDate);
    value.setDate(value.getDate() + 1); // Add 1 day

    return (
      <div style={{ margin: -15 }}>
        {/* BEGIN Order Summary */}
        <div id="containercurtain" className="d-none">
          <RejectCurtain
            uuid={this.props.match.params.uuid}
            onClickShowFilter={this.onClickShowFilter}
          />
        </div>
        <div className="mt-10 p-15 bg-white box-shadow font-size-small">
          <div>
            <Row>
              <Col span={10}>Order ID</Col>
              <Col span={14} className="font-weight-bold">
                : {order.orderNumber}
              </Col>
            </Row>
            <Row>
              <Col span={10}>Nomor Tagihan</Col>
              <Col span={14} className="font-weight-bold">
                : {order.invoiceNumber}
              </Col>
            </Row>
            <Row>
              <Col span={10} />
              <Col span={14} className="font-weight-bold">
                <NavLink to={`/invoice/${this.state.uuid}`} className="my-10 pl-2" target="_blank">
                  <Button style={{ padding: '4px 9px', fontSize: '12px', height: 'auto', marginTop: '5px', marginBottom: '5px' }} className="text-center" type="primary">Download Invoice</Button>
                </NavLink>
              </Col>
            </Row>
            <Row>
              <Col span={10}>Status</Col>
              <Col span={14} className="font-weight-bold">
                :{' '}
                {order.orderStatusName === 'Pembayaran Diterima'
                  ? 'Menunggu Konfirmasi'
                  : order.orderStatusName}
              </Col>
            </Row>
            {order.orderStatusId === 2 && (
              <Row>
                <Col span={10}>Batas Pesanan</Col>
                <Col span={14} className="font-weight-bold">
                  : <Countdown date={new Date(value)} renderer={renderer} />
                </Col>
              </Row>
            )}
          </div>
          <div className="mt-15">
            {order.orderStatusId === 2 && (
              // 2 = Pembayaran Diterima
              <p>
                Tekan <b>&quot;Proses Pesanan&quot;</b> jika Anda ingin
                mengkonfirmasikan bahwa pesanan ini akan diproses oleh Anda.
              </p>
            )}
            {order.orderStatusId === 3 && (
              // 3 = Pesanan Diproses
              <React.Fragment>
                <p>
                  Masukkan nomor resi pesanan, lalu tekan tombol{' '}
                  <b>&quot;Kirim Pesanan&quot;</b>
                  &nbsp; jika Anda sudah memproses dan barang sudah dikirim.
                </p>
                <p>
                  Anda juga bisa menentukan kurir sendiri, dengan cara klik atau
                  checklist <b>&quot;Ubah Kurir&quot;</b>, lalu pilih kurir yang
                  sesuai dengan penggunaan pengiriman Anda.
                </p>
              </React.Fragment>
            )}
            {order.orderStatusId === 7 && (
              // 7 = Persiapan Barang
              <div>
                Tekan <b>&quot;Barang Siap Diambil&quot;</b> jika Anda sudah
                memproses pesananan dan barang siap diambil.
              </div>
            )}
            {order.orderStatusId === 11 && (
              // 11 = Dibatalkan Admin
              <div>
                <div>
                  Pesanan ini telah Anda tolak, dan berikut alasan yang Anda
                  berikan :
                </div>
                <div className="box-shadow border-radius font-size-normal p-15 mt-15">
                  {/* <div>{props.order.branchNameOrigin}</div> */}
                  <div>{order.reason}</div>
                </div>
              </div>
            )}
          </div>

          {/* BEGIN : Kurir and Nomor Resi */}
          {order.orderStatusId === 3 && (
            <div className="mt-15 font-size-small">
              <Checkbox
                className="font-size-small"
                onChange={this.onChangeCustomShipping}
              >
                Ubah Kurir
              </Checkbox>
              <div>
                <div className="mt-15 mb-10">Kurir</div>
                <Select
                  defaultValue={order.shippingName}
                  style={{ width: '100%' }}
                  disabled={!this.state.isCustomShipping}
                  onChange={this.onChangeShippingName}
                >
                  <Option value="J&T">J&T</Option>
                  <Option value="SiCepat">SiCepat</Option>
                  <Option value="Tiki">TIKI</Option>
                  <Option value="Pos">POS</Option>
                  <Option value="Lainnya">Lainnya</Option>
                </Select>
              </div>
              <div>
                <div id="customshipping" className="d-none mt-15 mb-10">
                  <label htmlFor="shippingname">Nama Kurir</label>
                  <Input
                    id="shippingname"
                    onChange={this.onInputChange}
                    placeholder="Masukkan Nama Kurir"
                  />
                </div>

                <div className="mt-15 mb-10">Nomor Resi</div>
                <Input
                  onChange={this.onChangeResiNumber}
                  placeholder="Masukkan nomor resi"
                />
              </div>
            </div>
          )}
          {/* END : Kurir and Nomor Resi */}
        </div>
        {/* END Order Summary */}

        {/* BEGIN : Shipment Tracking */}
        {order.orderStatusId === 4 && (
          <div className="mt-10 p-15 bg-white box-shadow font-size-small">
            <div className="mt-20">
              <PaymentInformation
                label={'Jasa Pengiriman'}
                value={order.shippingName}
              />
              <PaymentInformation label={'No. Resi'} value={order.resiNumber} />
              <PaymentInformation
                label={'Tujuan'}
                value={order.addressDestination}
              />
              <PaymentInformation
                label={'Status'}
                value={order.orderStatusId === 6 ? 'Delivered' : 'Pesanan Diproses'}
              />
            </div>
            <div>
              <Divider className="mt-20" />
              <div className="my-20 font-weight-bold font-size-normal">
                Histori Pengiriman
              </div>
              <div>
                <TrackingTable trackings={this.props.trackings[order.id]} />
              </div>
            </div>
          </div>
        )}
        {/* END : Shipment Tracking */}

        <div
          className="mt-10 p-15 bg-white box-shadow"
          style={{ marginBottom: 80 }}
        >
          <div className="mt-10 font-weight-bold">Daftar Barang</div>
          <OrderGroup order={order} TDSOrder />
        </div>

        {order.orderStatusId === 2 && (
          <div className="mt-10 p-15 bg-white box-shadow addToCart__toolbar__bottom">
            <Row type={'flex'} gutter={10}>
              <Col span={12}>
                <Button
                  className="btn-block"
                  onClick={this.buttonReject}
                  // onClick={() => this.onClickOrderStatus(11)}
                >
                  Tolak Pesanan
                </Button>
              </Col>
              <Col span={12}>
                {order.deliveryMethod === 'Ambil Sendiri' ? (
                  // 7 = Persiapan Barang
                  <Button
                    className="btn-block"
                    type="primary"
                    onClick={() => this.onClickOrderStatus(7)}
                  >
                    Proses Pesanan
                  </Button>
                ) : (
                  // 3 = Persiapan Barang
                  <Button
                    className="btn-block"
                    type="primary"
                    onClick={() => this.onClickOrderStatus(3)}
                  >
                    Proses Pesanan
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        )}
        {order.orderStatusId === 3 && (
          // 3 = Pesanan Diproses
          // 4 = Pesanan Dikirim
          <div className="mt-10 p-15 bg-white box-shadow addToCart__toolbar__bottom">
            <Button
              className="btn-block"
              type="primary"
              disabled={!this.state.resiNumber}
              onClick={() => this.onClickOrderStatus(4)}
            >
              Kirim Pesanan
            </Button>
          </div>
        )}
        {order.orderStatusId === 7 && (
          // 7 = Persiapan Barang
          // 8 = Barang Siap Diambil
          <div className="mt-10 p-15 bg-white box-shadow addToCart__toolbar__bottom">
            <Button
              className="btn-block"
              type="primary"
              onClick={() => this.onClickOrderStatus(8)}
            >
              Barang Siap Diambil
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  requestTDS: state.get('requestTDS'),
  loading: state.get('requestTDS').loading,
  order: state.get('requestTDS').orders,
  trackings: state.get('transaction').trackings,
});

const mapDispatchToProps = (dispatch) => ({
  getShipmentTracking: (data) => dispatch(actions.getShipmentTracking(data)),
  getTDSOrders: (data) => dispatch(actions.getTDSOrders(data)),
  putTDSOrder: (data) => dispatch(actions.putTDSOrder(data)),
  storeRequestTDS: (data) => dispatch(actions.storeRequestTDS(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesDetailPage);
