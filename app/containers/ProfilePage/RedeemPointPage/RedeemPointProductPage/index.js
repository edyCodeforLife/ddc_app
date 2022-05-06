import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Tabs, Spin, Row, Col, Modal, message } from 'antd';

import * as actions from '../../../../actions/index';
import RedeemPointProductCard from '../RedeemPointProductCard';

const wrapperStyle = {
  margin: -15,
};

const TabPane = Tabs.TabPane;

const modalContent = [
  {
    title: null,
    content: null,
  },
  {
    title: 'Poin Berhasil Ditukar',
    content:
      'Selamat, penukaran poin Anda telah berhasil dilakukan. Tim kami akan menghubungi Anda dalam 1 x 24 jam.',
  },
  {
    title: 'Poin tidak mencukupi',
    content: 'Maaf, poin yang ingin Anda tukarkan tidak mencukupi',
  },
  {
    title: 'Poin tidak mencukupi',
    content:
      'Maaf Anda tidak dapat melakukan penukaran Poin. Dikarenakan Poin untuk Nilai Asset Anda melebihi Poin yang Anda miliki. Silahkan berbelanja lagi untuk menambah Poin Anda.',
  },
];

class RedeemPointProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDialog: false, showModalContentIndex: null };

    this.props.setToolbarState({
      title: 'Detail',
      hideBackButton: false,
    });
  }

  componentDidMount() {
    const productUuid = this.props.match.params.uuid;
    this.props.getProduct({ uuid: productUuid });
  }

  handleCancel = (e) => {
    this.setState({
      showDialog: false,
    });
  };

  onClickCloseDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

  onClickRedeem = () => {
    const memberPoint = this.props.authentication.member.memberPoint;
    const memberPointLock = this.props.authentication.member.memberPointLock;
    const memberPointReal = memberPoint - memberPointLock;
    // console.log(memberPoint);
    // console.log(memberPointLock);
    // console.log(memberPointReal);
    if (memberPointReal < 0) {
      this.setState({
        showDialog: true,
        showModalContentIndex: 3,
      });
    } else {
      const data = {
        productId: this.props.product.id,
      };
      this.props.postRedeemPoint(data);
    }
  };

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.loading) {
      return (
        <div className="text-center" style={{ marginTop: '50%' }}>
          <Spin />
        </div>
      );
    }

    if (this.props.formSuccess) {
      this.props.storeRedeemPoint({ formSuccess: false });
      this.setState({
        showDialog: true,
        showModalContentIndex: 1,
      });
    }
    if (this.props.formError) {
      this.props.storeRedeemPoint({ formError: null });
      this.setState({
        showDialog: true,
        showModalContentIndex: 2,
      });
    }

    return (
      <div style={wrapperStyle}>
        {this.props.product && (
          <div className="mt-10">
            <div className="box-shadow">
              <RedeemPointProductCard
                canSubmit
                product={this.props.product}
                loading={this.props.loadingRedeem}
                onClickRedeem={() => this.onClickRedeem()}
              />

              <div className="mt-15">
                <Tabs
                  className="ddc__twoTabs"
                  defaultActiveKey="0"
                  tabBarGutter={0}
                  onChange={this.onChangeTab}
                  style={{ minHeight: '70vh' }}
                >
                  <TabPane tab="Deskripsi" key="0">
                    <div
                      className="p-15"
                      dangerouslySetInnerHTML={{
                        __html: this.props.product.productContent,
                      }}
                    />
                  </TabPane>
                  <TabPane tab="Syarat & Ketentuan" key="1">
                    <div className="p-15 font-size-small">
                      <p>
                        Tukar poin Anda dengan hadiah-hadiah di bawah ini,{' '}
                        <span className="font-weight-bold">GRATIS</span> tanpa
                        diundi. Mohon untuk diperhatikan syarat dan ketentuan
                        dalam penukaran poin:
                      </p>
                      <ul style={{ paddingLeft: 15, paddingRight: 20 }}>
                        <li>
                          Pajak hadiah ditanggung oleh pemenang.
                        </li>
                        <li>
                          Ketersediaan warna atau tipe produk dapat berubah
                          sewaktu - waktu tergantung stok yang tersedia saat
                          ini.
                        </li>
                        <li>
                          Nilai poin tidak mengikat, dapat berubah jika ada
                          perubahan harga dari Vendor.
                        </li>
                        <li>Ongkos pengirman ditanggung oleh Reseller.</li>
                      </ul>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        )}

        {/* BEGIN Modal */}
        <Modal
          footer={null}
          centered
          closable
          onCancel={this.handleCancel}
          visible={this.state.showDialog}
          width={350}
          bodyStyle={{ padding: 15 }}
        >
          <div className="mt-20 font-weight-bold font-size-bigger">
            {this.state.showModalContentIndex &&
              modalContent[this.state.showModalContentIndex].title}
          </div>
          <div className="mt-10">
            <p>
              {this.state.showModalContentIndex &&
                modalContent[this.state.showModalContentIndex].content}
            </p>
          </div>
          <div className="text-right">
            <span
              className="clickable font-weight-bold"
              onClick={this.onClickCloseDialog}
              style={{ color: '#16b8b2' }}
            >
              Ok, Terima Kasih
            </span>
          </div>
        </Modal>
        {/* END Modal */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  loading: state.get('product').loading,
  product: state.get('product').product,
  loadingRedeem: state.get('redeemPoint').loading,
  formSuccess: state.get('redeemPoint').formSuccess,
  formError: state.get('redeemPoint').formError,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (data) => dispatch(actions.getProduct(data)),
  postRedeemPoint: (data) => dispatch(actions.postRedeemPoint(data)),
  storeRedeemPoint: (data) => dispatch(actions.storeRedeemPoint(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedeemPointProductPage);
