/**
 *
 * HomePage
 *
 */

import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Input, Spin, Icon, Row, Col } from 'antd';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';

import * as actions from '../../actions/index';
import PromoBanner from './PromoBanner';
import TrendingCategory from './TrendingCategory';
import PromoProduk from './PromoProduct';
import ProdukUnggulan from './ProdukUnggulan';
import Articles from './Articles';
import CustomSvg from '../../components/CustomSVG';
import constant from './../../utils/configs/constant';
import moment from 'moment';
import Countdown from 'react-countdown-now';

const renderer = ({ total, days, hours, minutes, seconds, completed }) => {
  // const totalHours = days * 24 + hours;
  const totalHours = Math.round(total / 1000 / (60 * 60));
  return (
    <span>
      <div className="ddc_coundown__block--trial">{totalHours}</div>
      <span style={{ margin: '0px 6.5px' }}>:</span>
      <div className="ddc_coundown__block--trial">{minutes}</div>
      <span style={{ margin: '0px 6.5px' }}>:</span>
      <div className="ddc_coundown__block--trial">{seconds}</div>
    </span>
  );
};

export class HomePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {};
    this.toggleCurtain = this.toggleCurtain.bind(this);
  }

  /**
   * After rendering (DOM available)
   */

  componentDidMount() {
    this.props.setToolbarState({
      showProfile: true,
      showCart: true,
      showFooter: true,
    });
    this.props.getHomePageContent();
    this.props.getTrendingCategories();
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getLoginInformation({ token });
    }
    // Google Tag Manager
    //   const tagManagerArgs = {
    //     gtmId: constant.GTM_ID,
    //   };
    //   TagManager.initialize(tagManagerArgs);
    const query = {
      offset: 0,
      categoryId: this.state.categoryId,
    };
    this.props.getArticlesHomePage(query);
  }
  componentDidUpdate(prevProps) {}

  /**
   * Toggle show curtain
   * @param {string} title
   */
  toggleCurtain(title) {
    const data = {
      show: true,
      title,
    };
    this.props.toggleCurtain(data);
  }

  render() {
    const upDown = {
      backgroundColor: 'rgb(255, 255, 255)',
      boxShadow: '0 2px 5px 0 rgba(40, 40, 40, 0.2)',
      color: '#8c8c8c',
      width: 40,
      height: 40,
      marginTop: '-33px',
      borderRadius: '50%',
      zIndex: 9,
    };
    let disableButton = true;
    if (this.state.isConfirm) {
      if (
        this.state.withdrawAmountFormInput === null &&
        this.state.withdrawAmount > 0
      ) {
        disableButton = false;
      }
    }

    if (!this.props.authentication.isAuthenticated) {
      // If not login, redirect page to HomePage
      return <Redirect to="/" />;
    }

    return (
      <div
        style={{
          marginTop: -15,
          marginLeft: -15,
          marginRight: -15,
          paddingTop: 40,
        }}
      >
        <Input
          className="catalog__search"
          placeholder="Cari barang Kamu disini"
          value={this.props.searchName}
          prefix={
            <Icon
              type="search"
              style={{ fontSize: 16, color: 'rgba(0,0,0,.25)' }}
            />
          }
          onClick={() => this.toggleCurtain('Search')}
        />
        {this.props.authentication.member.memberTypeName === 'Reseller' &&
        this.props.authentication.member.trial ? (
          <Row
            className="Count__down-trial"
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              padding: '20px 0px',
            }}
            type="flex"
            align="middle"
            justify="center"
          >
            <div className="text-center">
              <Countdown
                date={moment(this.props.authentication.member.trialEndDate)}
                renderer={renderer}
              />
            </div>
          </Row>
        ) : null}
        <div style={{ padding: 15 }}>
          {this.props.homePageContent.loading ||
          !this.props.homePageContent.data ? (
            <div className="text-center" key={0}>
              <Spin />
            </div>
          ) : (
            <div>
              {/* BEGIN Banner by Level */}
              <div>
                {this.props.authentication.member.memberTypeId === 1 && (
                  <PromoBanner
                    showUpgrade
                    banner={
                      this.props.homePageContent.data.banner.memberNonReseller
                    }
                  />
                )}
                {this.props.authentication.member.memberTypeId === 2 && (
                  <PromoBanner
                    showUpgrade={this.props.authentication.member.trial === 1}
                    banner={this.props.homePageContent.data.banner.reseller}
                  />
                )}
                {this.props.authentication.member.memberTypeId === 3 && (
                  <PromoBanner
                    banner={this.props.homePageContent.data.banner.tds}
                  />
                )}
              </div>
              {/* END Banner by Level */}

              {/* BEGIN Trending Category */}
              {this.props.homePageContent.data.product.promotion &&
                (this.props.member.memberTypeName !== 'Member Non Reseller' && (
                  <div className="my-5">
                    <div
                      className="font-weight-bold mb-15"
                      style={{ fontSize: 16 }}
                    >
                      <Row>
                        <CustomSvg name="ic-promo" />
                        <span className="promo__banner-section">
                          Promo Produk
                        </span>
                      </Row>
                    </div>
                    {this.props.homePageContent.data.product.promotion && (
                      <PromoProduk
                        product={
                          this.props.homePageContent.data.product.promotion
                        }
                      />
                    )}
                    <div />
                  </div>
                ))}
              <div className="my-5">
                <div className="font-weight-bold" style={{ fontSize: 16 }}>
                  <div className="mb-15">Trending Produk</div>
                  <TrendingCategory
                    trendingProduct={
                      this.props.homePageContent.data.product.trendingProduct
                    }
                  />
                </div>
              </div>
              {/* END Trending Category */}

              {/* BEGIN Produk Unggulan */}
              <div className="my-5">
                <div
                  className="font-weight-bold mb-15"
                  style={{ fontSize: 16 }}
                >
                  Produk Unggulan
                </div>
                {this.props.homePageContent.data.product
                  .productByNumberOfSales && (
                  <ProdukUnggulan
                    product={
                      this.props.homePageContent.data.product
                        .productByNumberOfSales
                    }
                  />
                )}
                <div>
                  <NavLink to={'/katalog'}>
                    <Button
                      className="my-3 btn-block"
                      type="primary"
                      size={'large'}
                    >
                      Lihat Semua Produk
                    </Button>
                  </NavLink>
                </div>
              </div>
              {/* END Produk Unggulan */}

              {/* BEGIN Komunitas */}
              <div className="my-5">
                <div
                  className="font-weight-bold mb-15"
                  style={{ fontSize: 16 }}
                >
                  Komunitas
                </div>
                {this.props.articles && (
                  <Articles articles={this.props.articles} />
                )}
                <div>
                  <NavLink to={'/komunitas/artikel'}>
                    <Button
                      className="my-3 btn-block"
                      type="primary"
                      size={'large'}
                    >
                      Lihat Semua Komunitas
                    </Button>
                  </NavLink>
                </div>
              </div>
              {/* END Komunitas */}
            </div>
          )}
        </div>
      </div>
    );
  }
}



HomePage.propTypes = {
  authentication: PropTypes.object.isRequired,
  homePageContent: PropTypes.object.isRequired,
  getHomePageContent: PropTypes.func,
  toggleCurtain: PropTypes.func,
  setToolbarState: PropTypes.func,
};

HomePage.defaultProps = {
  articles: [],
  hasMore: false,
  loading: false,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  homePageContent: state.get('app').homePageContent,
  categories: state.get('trendingCategory').categories,
  member: state.get('authentication').member,
  articles: state.get('articleHome').articles,
});

const mapDispatchToProps = (dispatch) => ({
  getArticlesHomePage: (data) => dispatch(actions.getArticlesHomePage(data)),
  getTrendingCategories: () => dispatch(actions.getTrendingCategories()),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  getHomePageContent: () => dispatch(actions.getHomePageContent()),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
