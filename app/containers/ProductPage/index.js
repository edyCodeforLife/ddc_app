/**
 *
 * ProductPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Divider, Button, Row, Col, Spin, Rate, message } from 'antd';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
// import queryString from 'query-string';
import Slider from 'react-slick';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TagManager from 'react-gtm-module';

import Helmet from 'react-helmet';
import ShareBtn from '../../components/ShareButton';
import * as actions from '../../actions/index';
import constant from '../../utils/configs/constant';
import RemainingStock from './RemainingStock';
import PromoCountdown from './PromoCountdown/index';
import CustomImage from '../../components/CustomImage';
import ResellerPrices from '../../components/Product/ResellerPrices';
import ProdukSerupa from './ProdukSerupa';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
const perfectScrollbarOption = {
  suppressScrollY: true,
  wheelPropagation: true,
};
export class ProductPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      likeInc: 0,
      liked: false,
      intervalId: 0,
      reviewShowLimit: 3,
      productId: null,
      showModalSocialShare: false,
      showImage: false,
      imageUrl: null,
    };
    this.toggleLikeProduct = this.toggleLikeProduct.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({ title: 'Detail Produk', showFooter: true });
    const productUuid = this.props.match.params.productUuid;
    this.props.getProduct({ uuid: productUuid });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getReviewsTDS(token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.product !== null) {
      if (this.props.match.params !== prevProps.match.params) {
        const productUuid = this.props.match.params.productUuid;
        this.props.getProduct({ uuid: productUuid });
      }

      if (this.props.match.params !== prevProps.match.params) {
        const productUuid = this.props.match.params.productUuid;
        this.props.getProduct({ uuid: productUuid });
      }
      if (this.props.product !== prevProps.product) {
        const query = {
          limit: 5,
          offset: 0,
          query: 'typeProduct:1',
          query2: `product_category_id__in:${
            this.props.product.productCategoryId
          }`,
        };
        this.props.getProductsSerupa(query);
      }
    }
    if (
      this.props.wishlist !== prevProps.wishlist ||
      (this.props.product !== prevProps.product && !this.state.liked)
    ) {
      // console.log('Beda');
      if (
        this.props.product &&
        this.props.wishlist &&
        this.props.wishlist.length > 0
      ) {
        // console.log('Search wishlist');

        // Find Product in Wishlist
        const product = this.props.wishlist.find(
          (product) => product.productId === this.props.product.id
        );
        if (product) {
          // If product exist
          // console.log('Set!');
          this.setState({
            liked: true,
            likeInc: 1,
          });
        }

        // Google Tag Manager
        //       const tagManagerArgs = {
        //         gtmId: constant.GTM_ID,
        //         dataLayer: {
        //           productId: this.props.product.id,
        //           productName: this.props.product.name,
        //         },
        //       };
        //       TagManager.initialize(tagManagerArgs);
      }
    }
  }

  /**
   * Toggle Like Product
   * @param {object} product
   */
  toggleLikeProduct(productId) {
    if (this.props.authentication.isAuthenticated) {
      const data = {
        productId,
        memberId: this.props.authentication.member.id,
        token: this.props.authentication.token,
      };
      this.props.addToWishlist(data, this.props.wishlist);
      let likeInc = 0;
      if (!this.state.liked) {
        likeInc = 1;
      }
      this.setState({
        liked: !this.state.liked,
        likeInc,
      });
    } else {
      message.warning('Silahkan login dahulu.');
    }
  }

  /**
   * Show all review
   */
  showAllReview(reviewCount) {
    this.setState({
      reviewShowLimit: reviewCount,
    });
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    const intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId });
  }

  /**
   * Show Modal Social Share
   */
  showModalSocialShare = () => {
    this.setState({
      showModalSocialShare: true,
    });
  };

  /**
   * Close Modal Social Share
   */
  closeModalSocialShare = () => {
    this.setState({ showModalSocialShare: false });
  };

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
    const currentDate = moment().format('YYYY-MM-DD');
    let startDate = moment().format('YYYY-MM-DD');
    if (this.props.product) {
      startDate = this.props.product.comingSoonDate;
    }

    const likeIcon = this.state.liked ? 'heart' : 'heart-o';
    const likeIconClassName = this.state.liked
      ? 'clickable heart'
      : 'clickable';

    const sliderSettings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      slidesToShow: 1,
      className: 'catalog__slider',
      centerMode: true,
      centerPadding: '25px',
    };

    if (this.props.authentication.isAuthenticated) {
      if (
        this.props.authentication.member.BranchReview &&
        this.props.authentication.member.BranchReview.length > 0 &&
        this.props.authentication.member.memberTypeName !== 'TDS'
      ) {
        // Review TDS
        const reviewTDS = this.props.authentication.member.BranchReview[0];
        return <Redirect to={`/beri-ulasan-tds/${reviewTDS.id}`} />;
      } else if (
        this.props.authentication.member.productUnreview &&
        this.props.authentication.member.productUnreview.length > 0
      ) {
        // Review Product
        // const reviewProduct = this.props.authentication.member
        //   .productUnreview[0];
        // return <Redirect to={`/beri-ulasan-produk/${reviewProduct.id}`} />;
      }
    }

    return (
      <div id="containerProductPage">
        {this.props.product ? (
          <div>
            <Helmet>
              <meta
                property="og:url"
                content={`${constant.URL_DEV}/produk/${
                  this.props.product.uuid
                }`}
              />
              <meta property="og:title" content={this.props.product.name} />
              {this.props.product.imageList.length > 0 && (
                <meta
                  property="og:image"
                  content={
                    constant.URL_IMAGE_PATH +
                    this.props.product.imageList[0].imagePath
                  }
                />
              )}
              <meta
                property="og:description"
                content={this.props.product.description}
              />
            </Helmet>
            <div className="productCard">
              {/* BEGIN Product Image Slider */}
              <div className="productCard__imageSlider">
                <Slider {...sliderSettings}>
                  {/* BEGIN Promotion Image */}
                  {this.props.product.promotionImagePath.map((image) => (
                    <img
                      src={image.imagePath}
                      onClick={() =>
                        this.setState({
                          showImage: true,
                          imageUrl: image.imagePath,
                        })
                      }
                      key={image.id}
                    />
                  ))}
                  {/* END Promotion Image */}
                  {this.props.product.imageList.length > 0 ? (
                    this.props.product.imageList.map((image) => (
                      <img
                        src={image.imagePath}
                        onClick={() =>
                          this.setState({
                            showImage: true,
                            imageUrl: image.imagePath,
                          })
                        }
                        key={image.id}
                      />
                    ))
                  ) : (
                    <CustomImage
                      name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                      style={{ width: '100%' }}
                    />
                  )}
                </Slider>
              </div>
              {/* END Product Image Slider */}

              {/* BEGIN Product Description */}
              <div className="productCard__description">
                <div className="productCard__description__name font-weight-bold">
                  {this.props.product.name}
                </div>
                <div>
                  <Rate
                    className="productCard__description__rate"
                    disabled
                    allowHalf
                    defaultValue={this.props.product.rating}
                  />
                </div>
                <div className="productCard__description__price">
                  <div className="productCard__description__label">
                    Harga Normal
                  </div>
                  <div className="font-weight-bolder">
                    {this.props.product.promotion.id === 0 ? (
                      // If not discount
                      <NumberFormat
                        value={this.props.product.standardRetailPrice}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp. '}
                      />
                    ) : (
                      // If discount
                      <React.Fragment>
                        <div className="font-weight-bolder font-size-small font-color-gray text-decoration-strike">
                          <NumberFormat
                            value={this.props.product.promotion.priceBefore}
                            displayType={'text'}
                            thousandSeparator
                            prefix={'Rp. '}
                          />
                          <span>/pc</span>
                        </div>
                        <NumberFormat
                          value={this.props.product.promotion.priceAfter}
                          displayType={'text'}
                          thousandSeparator
                          prefix={'Rp. '}
                        />
                      </React.Fragment>
                    )}

                    <span>/pc</span>
                  </div>
                </div>

                {/* BEGIN Reseller Price */}
                {this.props.authentication.getTierPrice && (
                  <ResellerPrices product={this.props.product} />
                )}
                {/* END Reseller Price */}

                <Divider className="my-3 deviderLine" />
                <div className="pb-10 info__stock">Informasi Stock Barang</div>
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  className="informasi__stock-barang"
                >
                  <Col
                    span={11}
                    style={{
                      textAlign: 'left',
                      borderRight: '1px solid #f5821f',
                      padding: '5px 0px',
                    }}
                  >
                    Gudang
                  </Col>
                  <Col span={10} style={{ textAlign: 'center' }}>
                    Stock
                  </Col>
                </Row>
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  style={{
                    border: '1px solid #f5821f',
                    borderTop: 'none',
                    marginBottom: 15,
                    padding: ' 0px 0px',
                  }}
                >
                  {this.props.product.productQuantityGudang &&
                    this.props.product.productQuantityGudang.map((product) => (
                      <React.Fragment>
                        <Col span={11} className="gudang__label">
                          <span>{product.branchName}</span>
                        </Col>
                        <Col span={10} className="stock__label">
                          <span style={{ color: '#282828' }}>
                            {product.onhandQuantity}
                          </span>
                        </Col>
                      </React.Fragment>
                    ))}
                </Row>
                <div>Kode Produk : {this.props.product.internalSku}</div>
                <div>
                  Ukuran Produk : {this.props.product.packageDimensionsLength} x{' '}
                  {this.props.product.packageDimensionsWidth} x{' '}
                  {this.props.product.packageDimensionsHeight} mm
                </div>
                <div>Berat /pc : {this.props.product.grossWeight} g</div>

                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{
                    __html: this.props.product.productContent,
                  }}
                />
              </div>
              {/* END Product Description */}

              <Divider className="my-3 deviderLine" />

              {/* BEGIN Download Material */}
              {this.props.authentication.isAuthenticated && (
                <React.Fragment>
                  <Row type="flex" align="middle">
                    <Col span={12}>Download Material</Col>
                    <Col span={12}>
                      <Row type="flex" justify="end">
                        {this.props.product.photoZip && (
                          <a href={this.props.product.photoZip}>
                            <Button>Foto</Button>
                          </a>
                        )}
                        {this.props.product.videoUrl && (
                          <a href={this.props.product.videoUrl} target="_blank">
                            <Button style={{ marginLeft: 10 }}>Video</Button>
                          </a>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Divider className="my-3 deviderLine" />
                </React.Fragment>
              )}
              {/* END Download Material */}

              <Button onClick={() => this.toggleCurtain('Cek Ongkir')}>
                Cek Ongkir
              </Button>

              <Divider className="my-3 deviderLine" />

              {/* BEGIN Product Information */}
              <div className="productCard__information">
                <div className="productCard__information__likes">
                  {this.props.product.countLike} Orang menyukai ini
                </div>
                <div className="productCard__information__stock">
                  {this.props.product.stockStatusName}
                </div>
              </div>
              {/* END Product Information */}

              <Divider className="my-3 deviderLine" />

              {/* BEGIN Product Information */}
              <Row type="flex" align="middle">
                <Col span={14}>
                  <Row style={{ color: '#8c8c8c' }} type="flex" align="middle">
                    <Icon
                      type={likeIcon}
                      className={likeIconClassName}
                      onClick={() =>
                        this.toggleLikeProduct(this.props.product.id)
                      }
                      style={{ fontSize: 20, marginRight: 5, marginLeft: 15 }}
                    />
                    <div
                      className="clickable"
                      style={{ marginRight: 30 }}
                      onClick={() =>
                        this.toggleLikeProduct(this.props.product.id)
                      }
                    >
                      Suka
                    </div>
                    <ShareBtn product={this.props.product} showText />
                  </Row>
                </Col>
                <Col span={10} className="text-right">
                  <NavLink to={`/order/${this.props.product.uuid}`}>
                    {this.props.product.comingSoon === 1 ? (
                      currentDate >= startDate ? (
                        <Button type="primary">Order</Button>
                      ) : (
                        <Button type="primary" disabled="disabled">
                          Coming Soon
                        </Button>
                      )
                    ) : (
                      <Button
                        className="btn-block"
                        type="primary"
                        disabled={this.props.product.quantity === 0}
                      >
                        {this.props.product.quantity === 0 ? 'Habis' : 'Order'}
                      </Button>
                    )}
                  </NavLink>
                </Col>
              </Row>
              {/* END Product Information */}
            </div>
            {/* BEGIN Product Review */}
            <div className="productCard">
              {/* BEGIN Header */}
              <Row type="flex" justify="space-between">
                <Col className="font-weight-bold">Ulasan Produk</Col>
                <Col>{this.props.product.reviewCount} Ulasan</Col>
              </Row>
              {/* END Header */}
              {this.props.product.reviewCount > 0 ? (
                this.props.product.review
                  .slice(0, this.state.reviewShowLimit)
                  .map((review) => (
                    <div className="productCard__review">
                      <Row>
                        <Col span={6} />
                        <Col span={18}>
                          <div>
                            {review.memberFirstName} {review.memberLastName}
                          </div>
                          <div style={{ fontSize: 14, color: '#8c8c8c' }}>
                            <Moment format="DD MMMM YYYY">
                              {review.createdAt}
                            </Moment>
                          </div>
                          <div>
                            <Rate
                              className="productCard__review__rate"
                              disabled
                              allowHalf
                              defaultValue={review.rating}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <div className="productCard__review__title font-weight-bold">
                            {review.title}
                          </div>
                          <div className="productCard__review__text">
                            {review.comment}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))
              ) : (
                <div className="mt-3 text-center font-weight-bold">
                  Belum ada Ulasan
                </div>
              )}
              {this.state.reviewShowLimit < this.props.product.reviewCount && (
                <div className="mt-3 text-center font-weight-bold">
                  <span
                    className="clickable"
                    onClick={() =>
                      this.showAllReview(this.props.product.reviewCount)
                    }
                  >
                    Lihat Semua Ulasan
                  </span>
                </div>
              )}
            </div>
            {/* END Product Review */}

            {/* BEGIN Produk Serupa */}
            <div className="productCard">
              <div className="font-weight-bold">Produk yang serupa</div>
              <div className="mt-10">
                <PerfectScrollbar option={perfectScrollbarOption}>
                  <div style={{ display: 'inline-flex' }}>
                    {this.props.productsSerupa &&
                      this.props.productsSerupa.map(
                        (product) =>
                          this.props.product.id !== product.id && (
                            <ProdukSerupa products={product} />
                          )
                      )}
                  </div>
                </PerfectScrollbar>
              </div>
            </div>
            {/* END Produk Serupa */}

            {/* BEGIN Back to Top */}
            <Row className="mt-3" type="flex" align="middle" justify="center">
              <span
                className="font-weight-bold clickable"
                style={{ fontSize: 12 }}
                onClick={() => {
                  this.scrollToTop();
                }}
              >
                Kembali ke atas
                <Icon
                  type="arrow-up"
                  className="clickable"
                  style={{ fontSize: 18, marginLeft: 5 }}
                />
              </span>
            </Row>
            {/* END Back to Top */}

            {this.props.product.quantity <=
              this.props.product.availabilityThinned ||
              (this.props.product.promotion.isActive === 1 && (
                <div
                  className="ddc_fixed__bottom"
                  style={{
                    boxShadow: '0 -1px 2px 0 #28282833',
                    marginLeft: -15,
                  }}
                >
                  {this.props.product.promotion &&
                  this.props.product.promotion.isActive === 1 ? (
                    <PromoCountdown
                      endDate={this.props.product.promotion.endDate}
                    />
                  ) : (
                    // Show quantity if below Menipis
                    this.props.product.quantity <=
                      this.props.product.availabilityThinned && (
                      <RemainingStock quantity={this.props.product.quantity} />
                    )
                  )}
                </div>
              ))}

            {/* BEGIN Image Lightbox */}
            {this.state.showImage && (
              <Lightbox
                mainSrc={this.state.imageUrl}
                onCloseRequest={() => this.setState({ showImage: false })}
              />
            )}
            {/* END Image Lightbox */}
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: '40%' }}>
            {this.props.loading ? <Spin /> : <div>Halaman tidak ditemukan</div>}
          </div>
        )}
      </div>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
};

ProductPage.defaultProps = {
  product: null,
  loading: false,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  product: state.get('product').product,
  loading: state.get('product').loading,
  wishlist: state.get('wishlist').wishlist,
  products: state.get('product').products,
  productsSerupa: state.get('ProductsSerupa').productsSerupa,
  reviewTDS: state.get('reviewTDS').data,
  branches: state.get('order').brances,
});

const mapDispatchToProps = (dispatch) => ({
  getBranchRecommendation: () => dispatch(actions.getBranchRecommendation()),
  getReviewsTDS: (data) => dispatch(actions.getReviewsTDS(data)),
  getProduct: (data) => dispatch(actions.getProduct(data)),
  getProductsSerupa: (data) => dispatch(actions.getProductsSerupa(data)),
  getProducts: (data) => dispatch(actions.getProducts(data)),
  addToWishlist: (data, wishlist) =>
    dispatch(actions.addToWishlist(data, wishlist)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
