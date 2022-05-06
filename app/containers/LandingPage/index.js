/**
 *
 * LandingPage
 *
 */

import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import NumberFormat from 'react-number-format';

import * as actions from '../../actions/index';
import Registration from './Registration';
import CatalogDownload from './CatalogDownload';
import TrendingCategory from './TrendingCategory';
import MediaReview from './MediaReview';
import ReactSweapable from './ReactSweapable';

export class LandingPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  /**
   * After rendering (DOM available)
   */
  static propTypes = {
    adaptContainerWidth: PropTypes.bool,
    appId: PropTypes.string.isRequired,
    height: PropTypes.number,
    hideCover: PropTypes.bool,
    hideCta: PropTypes.bool,
    href: PropTypes.string.isRequired,
    locale: PropTypes.string,
    showFacepile: PropTypes.bool,
    smallHeader: PropTypes.bool,
    tabs: PropTypes.arrayOf(PropTypes.string),
    version: PropTypes.string,
    width: PropTypes.number,
    xfbml: PropTypes.bool,
  };

  static defaultProps = {
    adaptContainerWidth: true,
    locale: 'en_US',
    height: 500,
    hideCover: false,
    hideCta: false,
    showFacepile: true,
    smallHeader: false,
    tabs: ['timeline'],
    version: 'v2.5',
    width: 500,
    xfbml: true,
  };

  componentDidMount() {
    const { appId, locale, version, xfbml } = this.props;
    this.props.setToolbarState({ showFooter: true });
    this.props.getMemberCount({ memberCount: this.props.app.memberCount });
  }
  render() {
    // console.log(this.props.app.memberCount);
    const {
      adaptContainerWidth,
      height,
      hideCover,
      hideCta,
      href,
      showFacepile,
      smallHeader,
      tabs,
      width,
    } = this.props;
    if (this.props.authentication.isAuthenticated) {
      // If login, redirect page to HomePage
      return <Redirect to="/beranda" />;
    }

    return (
      <div>
        <Helmet />

        <Registration />

        {/* Body 1 */}
        <div className="my-5">
          <div className="h5 font-weight-bold text-center">
            Komunitas Yang Positif
          </div>
          <div className="text-center">
            Anda bisa bergabung dengan &nbsp;
            <u className="font-weight-bold">komunitas reseller</u> serta belajar
            banyak hal positif yang dapat meningkatkan bisnis Anda.
          </div>
        </div>
        {/* / Body 1 */}

        {/* Body 2 */}

        <div style={{ paddingBottom: 15, marginLeft: -15, marginRight: -15 }}>
          <ReactSweapable />
        </div>
        <div>
          <div className="h4 font-weight-bold">
            Lebih dari
          <NumberFormat
            style={{ marginLeft: '5px', marginRight: '5px' }}
            value={this.props.app.memberCount}
            displayType={'text'}
            thousandSeparator
          />
            Reseller Telah Bergabung dan Menikmati
            Keuntungannya.
          </div>
          <p>
            Dusdusan.com didesain untuk memberikan kesempatan bagi para Ibu
            Rumah Tangga, Karyawan kantoran dan para pemilik usaha untuk dapat
            mendapatkan penghasilan tambahan TANPA menambah beban.
          </p>
          <p>
            Dusdusan.com bukan MLM, tidak ada upline/downline. Tidak ada target
            dan tidak ada yang namanya dikejar2 tutup poin. Saatnya Anda
            memiliki dan merintis bisnis yang mudah dan menghasilkan.
          </p>
        </div>

        <div>
          <div className="h5 font-weight-bold">
            Apa Kata Mereka Tentang Dusdusan?
          </div>

          <div>
            <iframe
              style={{ width: '100%', minHeight: 275 }}
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/UftcW9liYZc"
              allowFullScreen
            />
          </div>

          <small>
            <i>
              *Jumlah Reseller terus dibatasi tiap kota/kabupaten. Segera
              amankan akses Anda sekarang, sebelum ditutup di area kota Anda.
            </i>
          </small>
        </div>

        {/* / Body 2 */}

        <div className="mt-3">
          <NavLink to={'registrasi-member-reseller'}>
            <Button className="btn-block" type="primary" size={'large'}>
              Daftar Sekarang
            </Button>
          </NavLink>
        </div>

        {/* Trending Category */}
        <div className="mt-5">
          <TrendingCategory />
        </div>
        {/* / Trending Category */}

        {/* Media Review */}
        <div className="mt-5">
          <MediaReview />
        </div>
        {/* / Media Review */}

        {/* Catalog Download */}
        <div className="mt-5">
          <CatalogDownload />
        </div>
        {/* / Catalog Download */}
        <Row style={{ marginTop: '30px' }}>
          <div className="join__GroupFbDDC" id="fb-group">Join Grup FB</div>
          <Row
            className="fb-group"
            data-href="https://www.facebook.com/groups/dusdusan/"
            data-width={width}
            data-show-social-context="true"
            data-show-metadata="false"
            data-adapt-container-width={adaptContainerWidth}
            data-hide-cover={hideCover}
            data-show-facepile={showFacepile}
            data-hide-cta={hideCta}
            data-small-header={smallHeader}
            id="fb-group"
          />
        </Row>
      </div>
    );
  }
}

LandingPage.propTypes = {
  authentication: PropTypes.object,

};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  app: state.get('app'),
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getMemberCount: (data) => dispatch(actions.getMemberCount(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
