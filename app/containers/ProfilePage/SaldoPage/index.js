import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Button, Tabs, Modal } from 'antd';

import * as actions from '../../../actions/index';
import DarkTitle from './../../../components/UI/DarkTitle';
import SaldoHistoryCard from './SaldoHistoryCard';
import CustomSVG from './../../../components/CustomSVG';
import SaldoHistoryFilter from './SaldoHistoryFilter';

const wrapperStyle = {
  margin: -15,
};

const TabPane = Tabs.TabPane;

class SaldoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      activeFilterId: null,
      showDialog: false,
    };
  }

  componentDidMount() {
    this.props.setToolbarState({
      hideBurgerMenu: false,
      showCart: true,
      showProfile: true,
      showFooter: false,
    });
    this.props.getSaldoIns();
    this.props.getSaldoOuts();

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

  setActiveFilterId = (activeFilterId) => {
    this.setState({
      activeFilterId,
    });
  };

  handleCancel = (e) => {
    this.setState({
      showDialog: false,
    });
  }

  onClickCloseDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

  render() {
    /**
     * Add class no-overflow if sow curtain
     */
    const bodyTag = document.getElementsByTagName('BODY')[0];
    if (this.state.showFilter) {
      bodyTag.classList.add('no-overflow');
    } else {
      bodyTag.classList.remove('no-overflow');
    }

    if (this.props.formSuccess) {
      this.setState({
        showDialog: true,
      });
      this.props.storeSaldo({ formSuccess: false });
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

        <div className="p-15 bg-gray">
          <div className="font-size-small">
            <div className="font-weight-bolder">Ketentuan Penarikan Saldo</div>
            <div className="mt-10">
              <ul className="pl-15">
                <li>Minimum penarikan saldo sebesar Rp 15,000.</li>
                <li>Penarikan saldo akan di proses dalam 3x24 jam.</li>
              </ul>
            </div>
          </div>

          <div>
            <NavLink to="saldo/tarik-saldo">
              <Button className="btn-block" type="primary" htmlType="button">
                Tarik Saldo
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="mt-15">
          <Tabs
            className="ddc__twoTabs"
            defaultActiveKey="in"
            tabBarGutter={0}
            style={{ minHeight: '40vh' }}
          >
            <TabPane tab="Saldo Masuk" key="in">
              {this.props.saldo.saldoIns &&
                this.props.saldo.saldoIns.map((saldo) => (
                  <SaldoHistoryCard type="in" saldo={saldo} />
                ))}
            </TabPane>
            <TabPane tab="Tarik Saldo" key="out">
              {this.props.saldo.saldoOuts &&
                this.props.saldo.saldoOuts.map((saldo) => (
                  <SaldoHistoryCard type="out" saldo={saldo} />
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
          <SaldoHistoryFilter
            activeFilterId={this.state.activeFilterId}
            onClickShowFilter={() => this.onClickShowFilter()}
            setActiveFilterId={this.setActiveFilterId}
          />
        )}

        {/* BEGIN Modal */}
        <Modal
          footer={null}
          centered
          onCancel={this.handleCancel}
          visible={this.state.showDialog}
          width={350}
          bodyStyle={{ padding: 15 }}
        >
          <div className="font-weight-bold font-size-bigger">
            Penarikan Saldo sedang diproses
          </div>
          <div className="mt-10">
            <p>
              Penarikan saldo
              akan di proses dalam 2x24 jam.
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
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  isAuthenticated: state.get('authentication').isAuthenticated,
  saldo: state.get('saldo'),
  formSuccess: state.get('saldo').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getSaldoIns: () => dispatch(actions.getSaldoIns()),
  getSaldoOuts: () => dispatch(actions.getSaldoOuts()),
  storeSaldo: (data) => dispatch(actions.storeSaldo(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SaldoPage)
);
