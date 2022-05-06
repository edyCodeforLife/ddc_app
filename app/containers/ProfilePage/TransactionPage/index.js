import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Tabs, Spin, Row, Col } from 'antd';

import * as actions from '../../../actions/index';
import TransactionCard from './TransactionCard';
// import CustomSVG from './../../components/CustomSVG';

class TransactionPage extends React.Component {
  constructor(props) {
    super(props);

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
      const query = `memberId:${this.props.authentication.member.id},isClose:0`;
      const data = {
        query,
      };
      this.props.getTransactions(data);
    }
  }

  onChangeTab = (status) => {
    // console.log(status);
    let query = null;
    if (status === 'transactionActive') {
      query = `memberId:${this.props.authentication.member.id},isClose:0`;
    } else if (status === 'transactionList') {
      query = `memberId:${this.props.authentication.member.id},isClose:1`;
    }
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

    return (
      <div style={{ marginLeft: -15, marginRight: -15 }}>
        <Spin spinning={this.props.transaction.loading}>
          <Tabs
            className="ddc__twoTabs"
            defaultActiveKey="transactionActive"
            tabBarGutter={0}
            onChange={this.onChangeTab}
            style={{ minHeight: '40vh' }}
          >
            <TabPane tab="Pesanan Aktif" key="transactionActive">
              {this.props.transaction.transactions &&
                this.props.transaction.transactions.map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    key={transaction.id}
                  />
                ))}
            </TabPane>
            <TabPane tab="Riwayat Pesanan" key="transactionList">
              {this.props.transaction.transactions &&
                this.props.transaction.transactions.map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    key={transaction.id}
                  />
                ))}
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  transaction: state.get('transaction'),
});

const mapDispatchToProps = (dispatch) => ({
  getTransactions: (data) => dispatch(actions.getTransactions(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionPage);
