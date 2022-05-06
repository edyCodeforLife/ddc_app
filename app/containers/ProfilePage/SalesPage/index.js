import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Tabs, Spin, Row, Col, Icon } from 'antd';

import * as actions from '../../../actions/index';
// import TransactionCard from './TransactionCard';
// import CustomSVG from './../../components/CustomSVG';
import DarkTitle from './../../../components/UI/DarkTitle';
import SalesCard from './SalesCard';
import CustomSVG from './../../../components/CustomSVG';
import SalesFilter from './SalesFilter';

const tabList = [
  { title: 'Pesanan Masuk' },
  { title: 'Pengiriman' },
  { title: 'Riwayat Penjualan' },
];
class SalesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      activeOrderStatusId: null,
    };

    this.props.setToolbarState({
      title: null,
      hideBackButton: false,
      showProfile: true,
      showCart: true,
    });
  }

  componentDidMount() {
    if (
      this.props.authentication &&
      this.props.authentication.member &&
      this.props.authentication.member.id
    ) {
      const query2 = 'orderStatusId__in:2,3,5,7';
      const data = {
        query2,
      };
      // console.log(query2);
      this.props.getTDSOrders(data);
    }
  }

  onChangeTab = (status) => {
    // console.log(status);
    let query2 = null;
    if (status === 'Pesanan Masuk') {
      query2 = 'orderStatusId__in:2,3,5,7';
    } else if (status === 'Pengiriman') {
      query2 = 'orderStatusId__in:4,8';
    } else if (status === 'Riwayat Penjualan') {
      query2 = 'orderStatusId__in:6,9,10,11';
    }
    const data = {
      query2,
    };
    this.props.getTDSOrders(data);
    this.setState({
      activeOrderStatusId: null,
    });
  };

  /**
   * On Click Show Filter
   */
  onClickShowFilter = (flag) => {
    this.setState({
      showFilter: flag,
    });
  };

  setActiveOrderStatusId = (activeOrderStatusId) => {
    this.setState({
      activeOrderStatusId,
    });
  };

  render() {
    const TabPane = Tabs.TabPane;

    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    // Redirect if not TDS
    if (this.props.authentication.member.memberTypeName !== 'TDS') {
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
      <div
        className={this.state.showFilter ? 'no-overflow' : null}
        style={{ margin: -15 }}
      >
        <DarkTitle title="Menu Penjualan" />

        <Spin spinning={this.props.requestTDS.loading}>
          <Tabs
            className="ddc__tabs"
            defaultActiveKey="Pesanan Masuk"
            tabBarGutter={0}
            onChange={this.onChangeTab}
            style={{ marginTop: 15, minHeight: '40vh' }}
          >
            {tabList.map((tab) => (
              <TabPane tab={tab.title} key={tab.title}>
                {this.props.requestTDS.orders
                  ? this.props.requestTDS.orders.map((order) => (
                    <SalesCard order={order} key={order.id} />
                    ))
                  : null}
              </TabPane>
            ))}
          </Tabs>
        </Spin>

        <div
          className="floatingButton bg-orange clickable p-15"
          style={{ borderRadius: 50 }}
          onClick={() => this.onClickShowFilter(true)}
        >
          <CustomSVG name={'ic-filter'} />
        </div>

        {this.state.showFilter && (
          <SalesFilter
            activeOrderStatusId={this.state.activeOrderStatusId}
            onClickShowFilter={() => this.onClickShowFilter()}
            setActiveOrderStatusId={this.setActiveOrderStatusId}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  requestTDS: state.get('requestTDS'),
});

const mapDispatchToProps = (dispatch) => ({
  getTDSOrders: (data) => dispatch(actions.getTDSOrders(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesPage);
