import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Rate, Button, Divider, Icon, Row, Col, message, Spin } from 'antd';
import NumberFormat from 'react-number-format';
import { Redirect } from 'react-router-dom';
import ShareBtn from '../../../components/ShareButton';
import Slider from 'react-slick';
import constant from '../../../utils/configs/constant';
import * as actions from '../../../actions/index';
import Pengiriman from './components/alamatPengiriman';
import Profil from './components/profil';
import Bank from './components/bank';
import Toko from './components/toko';
import Verifikasi from './components/verifikasi';

class ViewProfilPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likeInc: 0,
      index: null,
    };
  }

  componentDidMount() {
    this.props.setToolbarState({
      hideBurgerMenu: false,
      showCart: true,
      showProfile: true,
      showFooter: false,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.memberStore !== prevProps.memberStore) {
  //     this.props.getProfileDetail();
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.memberStore.memberStore.image !== prevProps.memberStore.memberStore.image) {
  //     console.log('Hahaha');
  //   }
  // }

  /**
   * Toggle Like Product
   * @param {object} product
   */
  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    if (this.props.memberStore && this.props.memberStore.memberStore) {
    }

    return this.props.memberStore && this.props.memberStore.memberStore ? (
      <div className="akun__profil-page">
        <Row type="flex" className="akun__profil-top">
          <span className="title__pengiriman" style={{ paddingTop: '2px' }}>
            Akun
          </span>
          <p style={{ fontSize: '12px', paddingBottom: '0px' }}>
            Data Anda sangat rahasia dan kami tidak akan pernah beritahu kepada
            siapapun.
          </p>
        </Row>
        {this.props.memberStore.memberTypeId !== 1 && (
          <React.Fragment>
            <Toko toko={this.props.memberStore} />
            <Divider />
          </React.Fragment>
        )}
        <React.Fragment>
          <Profil profil={this.props.memberStore} />
          <Divider />
        </React.Fragment>
        {this.props.memberStore &&
          this.props.memberStore.memberDeliveryAddress && (
            <React.Fragment>
              <Pengiriman pengiriman={this.props.memberStore} />
              <Divider />
            </React.Fragment>
          )}
        <Bank bank={this.props.memberStore.memberBankAccount} />
        <React.Fragment>
          <Divider />
        </React.Fragment>

        <Verifikasi verifikasi={this.props.memberStore} />
        <React.Fragment>
          <Divider />
        </React.Fragment>
        {this.props.member.facebookId === '' && (
          <React.Fragment>
            <div className="label__top-facebook">
              Hubungkankan Akun Dusdusan dengan Facebook Anda
            </div>
            <Row
              style={{ padding: '0px 15px' }}
              type="flex"
              align="middle"
              justify="space-between"
            >
              <Button
                className="my-2 btn-block facebook-color"
                href={`${
                  constant.URL_MASTER_PUBLIC_PATH
                }socialAuth/facebook/registrasi-member-reseller`}
              >
                Hubungkan dengan Facebook
              </Button>
            </Row>
          </React.Fragment>
        )}
      </div>
    ) : (
      <div className="loading--state">
        <Spin />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  memberStore: state.get('updateProfil').formData,
  member: state.get('updateProfil').formData,
  formData: state.get('updateProfil').formData,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfilPage);
