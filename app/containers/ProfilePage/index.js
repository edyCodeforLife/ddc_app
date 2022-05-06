/**
 *
 * Main ProfilePage
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Modal, Button, Row, Col, Spin } from 'antd';

import * as actions from '../../actions/index';
import ProfileSummary from './ProfileSummary';
import ProfileMainMenu from './ProfileMainMenu';
import ProfileSecondaryMenu from './ProfileSecondaryMenu';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalRequestTDS: false,
      storeIsOpen: false,
      buka: false,
    };
  }

  componentDidMount() {
    this.props.setToolbarState({
      title: 'Profil Menu',
      hideBurgerMenu: true,
      showFooter: false,
      icon: 'close',
    });
    // this.props.requestTDS();
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }

  /**
   * Do Log Out
   */
  onClickLogout = () => {
    this.props.logout({ enableReload: true });
  };

  /**
   * On Click Request TDS, Open Modal
   */
  onClickRequestTDS = () => {
    if (this.props.updateProfil.statusRequestTDS !== 'Menunggu Verifikasi') {
      this.setState({
        showModalRequestTDS: true,
      });
    }
  };

  /**
   * On Click Request TDS, Close Modal
   */
  onClickCloseRequestTDS = (e) => {
    this.setState({
      showModalRequestTDS: false,
    });
    this.props.postRequestTDS();
  };

  /**
   * On Click Open Close Store for TDS
   */
  onChangeOpenCloseStore = (e) => {
    this.state.storeIsOpen = e;
    this.setState({
      storeIsOpen: this.state.storeIsOpen,
    });
    // console.log(this.state.storeIsOpen);
    this.props.postOpenCloseStoreTDS();
    // location.reload();
  };

  onClickCancelModalRequestTDS = () => {
    this.setState({
      showModalRequestTDS: false,
    });
  };
  reloadPage = () => {
    location.reload();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.requestTDS.data !== prevProps.requestTDS.data) {
      const token = localStorage.getItem('token');
      if (token) {
        this.props.getProfileDetail(token);
      }
    }
  }
  render() {
    if (
      this.props.updateProfil &&
      this.props.updateProfil.statusActiveTDS === 1
    ) {
      this.state.storeIsOpen = true;
    } else {
      this.state.storeIsOpen = false;
    }

    if (this.props.authentication.isAuthenticated) {
      if (this.props.member.memberDeliveryAddress.length === 0) {
        return <Redirect to="/profil/buku-alamat/tambah-alamat" />;
      }
    }
    return (
      <div style={{ marginLeft: -15, marginRight: -15 }}>
        <Modal
          closable
          onCancel={this.onClickCancelModalRequestTDS}
          visible={this.state.showModalRequestTDS}
          width={320}
          footer={null}
          bodyStyle={{ paddingBottom: 15 }}
        >
          <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Request Jadi TDS
          </div>
          <div>
            Pengajuan Anda akan di validasi terlebih dahulu oleh tim Kami, akan
            ada waktu, proses, dan juga pemeriksaan.
          </div>
          <Row type="flex" justify="end">
            <Col>
              <Button
                onClick={this.onClickCloseRequestTDS}
                style={{ border: 'none' }}
                loading={this.props.requestTDS.loading}
              >
                Ok, Saya Mengerti
              </Button>
            </Col>
          </Row>
        </Modal>
        {this.props.isAuthenticated && this.props.member.memberLevelName ? (
          <Spin spinning={this.props.requestTDS.loading}>
            <React.Fragment>
              <ProfileSummary member={this.props.member} />
              <ProfileMainMenu member={this.props.member} />
              <ProfileSecondaryMenu
                member={this.props.member}
                onClickLogout={this.onClickLogout}
                onClickRequestTDS={
                  !this.props.requestTDS.formSuccess &&
                  (() => this.onClickRequestTDS())
                }
                showStatusRequestTDS={
                  this.props.updateProfil &&
                  (this.props.updateProfil.statusRequestTDS ===
                    'Menunggu Verifikasi' ||
                    this.props.requestTDS.formSuccess)
                }
                showStoreOpen
                storeIsOpen={this.state.storeIsOpen}
                onChangeOpenCloseStore={(e) => this.onChangeOpenCloseStore(e)}
              />
            </React.Fragment>
          </Spin>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

ProfilePage.defaultProps = {
  member: { firstName: '', lastName: '' },
};

const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  token: state.get('authentication'),
  isAuthenticated: state.get('authentication').isAuthenticated,
  updateProfil: state.get('updateProfil').formData,
  requestTDS: state.get('requestTDS'),
  authentication: state.get('authentication'),
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
  postRequestTDS: () => dispatch(actions.postRequestTDS()),
  postOpenCloseStoreTDS: (data) =>
    dispatch(actions.postOpenCloseStoreTDS(data)),
  logout: (data) => dispatch(actions.logout(data)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilePage)
);
