import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Tabs, Spin, Row, Col } from 'antd';

import * as actions from '../../../actions/index';
import RedeemPointProductCard from './RedeemPointProductCard';
import RedeemPointHistoryCard from './RedeemPointHistoryCard';
import CustomSVG from './../../../components/CustomSVG';
import RedeemPointProductFilter from './RedeemPointProductFilter';
import DarkRedeemPoint from './../../../components/UI/DarkRedeemPoint';

const wrapperStyle = {
  margin: -15,
  marginTop: -5,
};

const filterInfoStyle = {
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: '#f0f0f0',
};

class RedeemPointPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      activeFilterId: null,
      filterLabel: null,
    };

    this.props.setToolbarState({
      title: null,
      hideBackButton: false,
      showProfile: true,
      showCart: true,
    });
  }

  componentDidMount() {
    const limit = 0;
    const offset = 0;
    this.props.getRedeemPointProducts({ offset, limit });
    this.props.getRedeemPointHistories();

    const token = localStorage.getItem('token');
    if (token) {
      this.props.getLoginInformation({ token });
    }
  }
  /**
   * On Click Show Filter
   */
  onClickShowFilter = (flag) => {
    this.setState({
      showFilter: flag,
    });
  };

  setActiveFilterId = (activeFilterId, filterLabel) => {
    this.setState({
      activeFilterId,
      filterLabel,
    });
  };

  /**
   * Reset Filter
   */
  onClickResetFilter = () => {
    this.setState({
      activeFilterId: null,
      filterLabel: null,
    });
    const limit = 0;
    const offset = 0;
    this.props.getRedeemPointProducts({ offset, limit });
  };

  render() {
    const TabPane = Tabs.TabPane;

    // If not login
    if (
      !this.props.authentication.isAuthenticated ||
      this.props.authentication.member.memberTypeId === 1
    ) {
      return <Redirect to="/" />;
    }

    /**
     * Add class no-overflow if sow curtain
     */
    const bodyTag = document.getElementsByTagName('BODY')[0];
    if (this.state.showFilter) {
      bodyTag.classList.add('no-overflow');
    } else {
      bodyTag.classList.remove('no-overflow');
    }

    return (
      <div style={wrapperStyle}>
        <DarkRedeemPoint
          titleFirst="Point yang"
          titleLast="bisa di Redeem"
          countPoint={
            this.props.authentication.member.memberPoint -
              this.props.authentication.member.memberPointLock <
            0
              ? 0
              : this.props.authentication.member.memberPoint -
                this.props.authentication.member.memberPointLock
          }
          estimasiFirst="Estimasi"
          estimasiLast="Point Stock"
          estimasiCountPoint={this.props.authentication.member.memberPointLock}
        />
        <div className="p-15 font-size-small bg-gray">
          {/* <div>
            <table className="font-size-normal" style={{ width: '100%' }}>
              <tr>
                <td className="font-weight-bold">Poin Stock Barang</td>
                <td style={{ width: '40%' }}>
                  : {this.props.authentication.member.memberPointLock}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Poin yg bisa diredeem</td>
                <td>
                  :{' '}
                  {this.props.authentication.member.memberPoint -
                    this.props.authentication.member.memberPointLock <
                  0
                    ? 0
                    : this.props.authentication.member.memberPoint -
                      this.props.authentication.member.memberPointLock}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Total Point</td>
                <td>: {this.props.authentication.member.memberPoint}</td>
              </tr>
            </table>
          </div> */}
          <p className="mt-15">
            *Note: poin stock barang akan menjadi milik reseller yg order barang
            melalui Anda dengan ketentuan 1 poin untuk setiap order 15.000
            rupiah
          </p>
          <p>
            Tukar poin Anda dengan hadiah-hadiah di bawah ini,{' '}
            <span className="font-weight-bold">GRATIS</span> tanpa diundi. Mohon
            untuk diperhatikan syarat dan ketentuan dalam penukaran poin:
          </p>
          <ul style={{ paddingLeft: 15, paddingRight: 20 }}>
            <li>Pajak hadiah ditanggung oleh pemenang.</li>
            <li>
              Ketersediaan warna atau tipe produk dapat berubah sewaktu - waktu
              tergantung stok yang tersedia saat ini.
            </li>
            <li>
              Nilai poin tidak mengikat, dapat berubah jika ada perubahan harga
              dari Vendor.
            </li>
            <li>Ongkos pengirman ditanggung oleh Reseller.</li>
          </ul>
        </div>
        <div className="mt-15">
          <Tabs
            className="ddc__twoTabs"
            defaultActiveKey="produk"
            tabBarGutter={0}
            onChange={this.onChangeTab}
            style={{ minHeight: '40vh' }}
          >
            <TabPane tab="Produk" key="produk">
              {this.state.activeFilterId && (
                <div style={filterInfoStyle}>
                  <Row type="flex" align="middle" justify="space-between">
                    <Col>
                      <div className="font-size-small font-weight-bold">
                        Hasil untuk :
                      </div>
                      <div>{this.state.filterLabel}</div>
                    </Col>
                    <Col>
                      <Button type="default" onClick={this.onClickResetFilter}>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              {this.props.redeemPoint.products &&
                this.props.redeemPoint.products.map((product) => (
                  <RedeemPointProductCard key={product.id} product={product} />
                ))}
            </TabPane>
            <TabPane tab="Histori" key="histori">
              {this.props.redeemPoint.histories &&
                this.props.redeemPoint.histories.map((history) => (
                  <RedeemPointHistoryCard history={history} />
                ))}
            </TabPane>
          </Tabs>
        </div>

        <div
          className="floatingButton bg-orange clickable p-15"
          style={{ borderRadius: 50 }}
          onClick={() => this.onClickShowFilter(true)}
        >
          <CustomSVG name={'ic-filter'} />
        </div>

        {this.state.showFilter && (
          <RedeemPointProductFilter
            activeFilterId={this.state.activeFilterId}
            onClickShowFilter={() => this.onClickShowFilter()}
            setActiveFilterId={this.setActiveFilterId}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  redeemPoint: state.get('redeemPoint'),
});

const mapDispatchToProps = (dispatch) => ({
  getRedeemPointHistories: () => dispatch(actions.getRedeemPointHistories()),
  getRedeemPointProducts: (data) =>
    dispatch(actions.getRedeemPointProducts(data)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedeemPointPage);
