/**
 *
 * App.js
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
import { Switch, Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import TagManager from 'react-gtm-module';

import Footer from '../Footer';
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';
import Curtain from '../Curtain';

import * as actions from '../../actions/index';
import RegistrationMemberResellerPage from '../RegistrationMemberResellerPage';
import MetodePengiriman from '../RegistrationMemberResellerPage/MetodePengiriman/MetodePengiriman';
import RegistrationMemberNonResellerPage from '../RegistrationMemberNonResellerPage';
import LoginPage from '../LoginPage/Loadable';
import CatalogPage from '../CatalogPage/Loadable';
import ProductPage from './../ProductPage/Loadable';
import OrderPage from './../OrderPage/Loadable';
import ForgotPasswordPage from '../ForgotPasswordPage';
import ResetPasswordPage from '../ResetPasswordPage';
import CartPage from '../CartPage/Loadable';
import Profile from '../ProfilePage';
import Account from '../ProfilePage/ViewProfilPage';
import UpdateShop from './../ProfilePage/ViewProfilPage/components/components/editToko';
import UpdateProfil from './../ProfilePage/ViewProfilPage/components/components/editProfil';
import UpdateBank from './../ProfilePage/ViewProfilPage/components/components/editBank';
import AddressBook from './../ProfilePage/ViewProfilPage/components/addressbook';
import Verification from './../ProfilePage/ViewProfilPage/components/components/editVerifikasi';
import AddAddress from './../ProfilePage/ViewProfilPage/components/components/addAddress';
import PaymentPage from './../PaymentPage/Loadable';
import PaymentConfirmationPage from './../PaymentConfirmationPage/Loadable';
import EditAddress from './../ProfilePage/ViewProfilPage/components/components/editAddress';
import editAddressMember from './../ProfilePage/ViewProfilPage/components/components/editAddressMember';
import SearchTDSPage from './../ProfilePage/ViewProfilPage/SearchTDSPage';
import WishlistPage from './../WishlistPage/Loadable';
import TransactionPage from './../ProfilePage/TransactionPage/Loadable';
import TransactionDetailPage from './../ProfilePage/TransactionPage/TransactionDetailPage/Loadable';
import ReviewProductPage from './../ReviewProductPage/Loadable';
import membershipPage from './../ProfilePage/MembershipPage';
import SaldoPage from './../ProfilePage/SaldoPage/Loadable';
import InventoryPage from './../ProfilePage/InventoryPage/Loadable';
import StockAdjustmentPage from './../ProfilePage/InventoryPage/StockAdjustmentPage/Loadable';
import RenewMemberPage from './../ProfilePage/RenewMemberPage';
import TarikSaldoPage from './../ProfilePage/SaldoPage/TarikSaldoPage';
import SalesPage from '../ProfilePage/SalesPage/Loadable';
import SalesDetailPage from '../ProfilePage/SalesPage/SalesDetailPage/Loadable';
import SearchMemberAktif from '../ProfilePage/CekMemberPage/';
import ajakTeman from '../ProfilePage/AjakTemanPage/';
import ArticlePage from '../ArticlePage/loadable';
import EtikaResellerPage from '../EtikaResellerPage/loadable';
import ArticleDetailPage from '../ArticlePage/ArticleDetailPage';
import FaqPage from '../FaqPage/loadable';
import AboutDusdusanPage from '../AboutDusdusanPage/loadable';
import CarrerPage from '../CarrerPage/loadable';
import RedeemPointPage from '../ProfilePage/RedeemPointPage/Loadable';
import RedeemPointProductPage from '../ProfilePage/RedeemPointPage/RedeemPointProductPage/Loadable';
import TSDReviewPage from '../ReviewTDSPage/Loadable';
import UpgradeMembershipPage from '../UpgradeMembershipPage/loadable';
import InvoicePage from '../BlankPage/Loadable';

class LandingPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
      isLogout: false,
      visible: false,
    };
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
    this.goBackHandler = this.goBackHandler.bind(this);

    // Setup Axios, If Token update, Get Token from Localstorage ,Add Token
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common = {
        Authorization: token,
      };
      this.props.getLoginInformation({ token });
      this.props.getCartQuantity();

      // Disable, waiting for token expired fixed. Token expired on years 1970
      this.props.onTryAutoSignup();
    }
  }

  componentDidMount() {
    /**
     * If token provided, redirect to login page
     */
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam.token && !queryParam.email) {
      this.props.history.push({
        pathname: '/login',
        search: `?token=${queryParam.token}`,
      });
    }
    // $(window).scrollTo(0, '0.5s');
    window.fbAsyncInit = () => {
      FB.init({
        appId: 284422592158652,
        cookie: false, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v3.1', // use version 3.1
      });
      FB.Canvas.setAutoGrow();
    };
    ((d, s, id) => {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v3.1&appId=284422592158652&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }

    if (this.props.authentication.member !== prevProps.authentication.member) {
      if (this.props.authentication.member) {
        // Setup Axios, If Token update ,Add Token
        axios.defaults.headers.common = {
          Authorization: this.props.authentication.token,
        };

        // Get Wishlist
        this.props.getWishlist();

        // Get Cart Quantity
        this.props.getCartQuantity();
      }
    }
    if (this.props.profil !== prevProps.profil) {
      const token = localStorage.getItem('token');
      this.props.getLoginInformation({ token });
    }
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  handleClose = () => {
    this.setState({ visible: false });
  };
  sideDrawerClosedHandler = (e) => {
    console.log('Hit');
    e.preventDefault();
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };

  handleGetDetailProfil = (token) => {
    this.props.storeDetailProfil(token);
  };

  goBackHandler() {
    this.props.history.goBack();
  }

  loadFbLoginApi() {
    console.log('Yang luar');
    // }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    /**
     * Add .noscroll if SideDrawer is active
     */
    const bodyContainer = this.state.showSideDrawer
      ? 'body-container noscroll'
      : 'body-container scroll';

    /**
     * Add class no-overflow if showSideDrawer == true
     */
    const bodyTag = document.getElementsByTagName('BODY')[0];
    if (this.state.showSideDrawer || this.props.curtain.show) {
      bodyTag.classList.add('no-overflow');
    } else {
      bodyTag.classList.remove('no-overflow');
    }
    return (
      <div className={bodyContainer}>
        <header>
          <Toolbar
            toolbar={this.props.toolbar}
            wishlist={this.props.wishlist}
            cartQuantity={this.props.cartQuantity}
            token={this.props.token}
            logo={this.props.logo}
            drawerToggleClicked={this.sideDrawerToggleHandler}
            goBackClicked={this.goBackHandler}
          />
          <SideDrawer
            authentication={this.props.authentication}
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
        </header>
        {this.props.curtain.show && <Curtain curtain={this.props.curtain} />}
        <div className="content-container">
          <content id="root">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/beranda" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route
                exact
                path="/registrasi-member-reseller"
                component={RegistrationMemberResellerPage}
              />
              <Route
                exact
                path="/registrasi-member-non-reseller"
                component={RegistrationMemberNonResellerPage}
              />
              <Route
                exact
                path="/lupa-kata-sandi"
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path="/profil/upgrade-member"
                component={UpgradeMembershipPage}
              />
              <Route
                exact
                path="/reset-kata-sandi/:token"
                component={ResetPasswordPage}
              />
              <Route
                exact
                path="/metode-pengiriman"
                component={MetodePengiriman}
              />
              <Route
                exact
                path="/etika-reseller"
                component={EtikaResellerPage}
              />
              <Route exact path="/karir" component={CarrerPage} />
              <Route exact path="/faq" component={FaqPage} />
              <Route
                exact
                path="/tentang-dusdusan"
                component={AboutDusdusanPage}
              />
              <Route exact path="/invoice/:uuid" component={InvoicePage} />
              <Route exact path="/komunitas/artikel" component={ArticlePage} />
              <Route
                exact
                path="/komunitas/artikel/:slug"
                component={ArticleDetailPage}
              />
              <Route
                exact
                path="/produk/:productUuid"
                component={ProductPage}
              />
              <Route
                exact
                path="/beri-ulasan-tds/:idReview"
                component={TSDReviewPage}
              />
              <Route exact path="/katalog" component={CatalogPage} />
              <Route exact path="/profil/saldo" component={SaldoPage} />
              <Route exact path="/profil/ajak-teman" component={ajakTeman} />
              <Route exact path="/order/ubah/:cartUuid" component={OrderPage} />
              <Route exact path="/order/:productUuid" component={OrderPage} />
              <Route exact path="/keranjang" component={CartPage} />
              <Route exact path="/pembayaran" component={PaymentPage} />
              <Route exact path="/profil" component={Profile} />
              <Route exact path="/profil/cari-tds" component={SearchTDSPage} />
              <Route
                exact
                path="/profil/saldo/tarik-saldo"
                component={TarikSaldoPage}
              />
              <Route
                exact
                path="/profil/cek-member"
                component={SearchMemberAktif}
              />
              <Route
                exact
                path="/konfirmasi-pembayaran"
                component={PaymentConfirmationPage}
              />
              <Route
                exact
                path="/profil/buku-alamat/tambah-alamat"
                component={AddAddress}
              />
              <Route
                exact
                path="/profil/akun/edit-alamat/:index"
                component={editAddressMember}
              />
              <Route
                exact
                path="/profil/buku-alamat/edit-alamat/:index"
                component={EditAddress}
              />
              <Route
                exact
                path="/profil/akun/verifikasi"
                component={Verification}
              />
              <Route exact path="/profil/buku-alamat" component={AddressBook} />
              <Route
                exact
                path="/profil/akun/edit-bank"
                component={UpdateBank}
              />
              <Route
                exact
                path="/profil/akun/edit-toko"
                component={UpdateShop}
              />
              <Route
                exact
                path="/profil/akun/edit-profil"
                component={UpdateProfil}
              />
              <Route exact path="/profil/akun" component={Account} />
              <Route exact path="/profil/cari-tds" component={SearchTDSPage} />
              <Route exact path="/favorit" component={WishlistPage} />
              <Route
                exact
                path="/profil/membership/perpanjang"
                component={RenewMemberPage}
              />
              <Route
                exact
                path="/profil/membership"
                component={membershipPage}
              />
              <Route
                exact
                path="/profil/transaksi"
                component={TransactionPage}
              />
              <Route
                exact
                path="/profil/transaksi/:uuid"
                component={TransactionDetailPage}
              />
              <Route exact path="/profil/penjualan" component={SalesPage} />
              <Route
                exact
                path="/profil/penjualan/:uuid"
                component={SalesDetailPage}
              />
              <Route
                exact
                path="/beri-ulasan-produk/:productUuid"
                component={ReviewProductPage}
              />
              <Route
                exact
                path="/profil/informasi-stok-barang"
                component={InventoryPage}
              />
              <Route
                exact
                path="/profil/ubah-stok-barang"
                component={StockAdjustmentPage}
              />
              <Route
                exact
                path="/profil/tukar-poin/:uuid"
                component={RedeemPointProductPage}
              />
              <Route
                exact
                path="/profil/tukar-poin"
                component={RedeemPointPage}
              />

              <Route component={NotFoundPage} />
            </Switch>
          </content>
        </div>
        {this.props.footer.showFooter ? <Footer /> : ''}
      </div>
    );
  }
}

LandingPages.propTypes = {
  // storeCart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  toolbar: state.get('app').toolbar,
  footer: state.get('app').footer,
  curtain: state.get('app').curtain,
  authentication: state.get('authentication'),
  profil: state.get('updateProfil').formData,
  wishlist: state.get('wishlist'),
  cartQuantity: state.get('cart').cartQuantity,
  isLogout: state.get('authentication').logout,
  token: state.get('authentication').token,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  logout: (data) => dispatch(actions.logout(data)),
  getWishlist: () => dispatch(actions.getWishlist()),
  getCartQuantity: () => dispatch(actions.getCartQuantity()),
  storeDetailProfil: (data) => dispatch(actions.storeDetailProfil(data)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingPages)
);
