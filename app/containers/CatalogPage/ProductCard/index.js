import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Rate, Button, Divider, Icon, Row, Col, message } from 'antd';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import ShareBtn from '../../../components/ShareButton';
import Slider from 'react-slick';
import constant from '../../../utils/configs/constant';
import * as actions from '../../../actions/index';
import RemainingStock from '../../ProductPage/RemainingStock';
import PromoCountdown from '../../ProductPage/PromoCountdown';
import CustomImage from '../../../components/CustomImage';
import ResellerPrices from '../../../components/Product/ResellerPrices';
import moment from 'moment';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likeInc: 0,
      showImage: false,
      imageUrl: null,
    };
    this.toggleLikeProduct = this.toggleLikeProduct.bind(this);
  }

  componentDidMount() {
    if (!this.state.liked) {
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
          // console.log('Found!');
          // If product exist
          // console.log('Set!');
          this.setState({
            liked: true,
            likeInc: 1,
          });
        }
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

  render() {
    // BEGIN Coming Soon Date
    const currentDate = moment().format('YYYY-MM-DD');
    let startDate = moment().format('YYYY-MM-DD');
    if (this.props.product) {
      startDate = this.props.product.comingSoonDate;
    }
    // END Coming Soon Date

    const likeIcon = this.state.liked ? 'heart' : 'heart-o';
    const likeIconClassName = this.state.liked
      ? 'icon__button clickable heart'
      : 'icon__button clickable';

    const sliderSettings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      slidesToShow: 1,
      className: 'catalog__slider',
      centerMode: true,
      centerPadding: '25px',
    };

    return (
      <div className="productCard ddc_default_font_color" key={this.props.key}>
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
                  // style={{ maxWidth: '100%' }}
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

        {/* BEGIN Product Social */}
        <div className="productCard__social">
          <Icon
            type={likeIcon}
            className={likeIconClassName}
            onClick={() => this.toggleLikeProduct(this.props.product.id)}
          />

          {/* BEGIN Component share Facebook dan Whatsapp */}
          <ShareBtn product={this.props.product} />
          {/* END Component share Facebook dan Whatsapp */}
        </div>

        {/* BEGIN Product Information */}
        <div className="productCard__information">
          <div className="productCard__information__likes">
            {this.props.product.countLike + this.state.likeInc} Orang suka ini
          </div>
          <div className="productCard__information__stock">
            {this.props.product.stockStatusName}
          </div>
        </div>
        {/* END Product Information */}

        <Divider className="my-1 deviderLine" />

        <NavLink to={`/produk/${this.props.product.uuid}`}>
          {/* BEGIN Product Description */}
          <div className="productCard__description ddc_default_font_color">
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
          </div>
        </NavLink>
        {/* END Product Description */}
        <NavLink
          to={`/order/${this.props.product.uuid}`}
          key={this.props.product.uuid}
        >
          {this.props.product.comingSoon === 1 ? (
            currentDate >= startDate ? (
              <Button className="btn-block" type="primary">
                Order
              </Button>
            ) : (
              <Button className="btn-block" type="primary" disabled="disabled">
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
        {/* BEGIN Stock Remaining & Promo */}
        {this.props.product.quantity <=
          this.props.product.availabilityThinned ||
          (this.props.product.promotion.isActive === 1 && (
            <div
              style={{
                marginTop: 15,
                marginLeft: -15,
                marginRight: -15,
                marginBottom: -15,
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
        {/* END Stock Remaining & Promo */}

        {/* BEGIN Image Lightbox */}
        {this.state.showImage && (
          <Lightbox
            mainSrc={this.state.imageUrl}
            onCloseRequest={() => this.setState({ showImage: false })}
          />
        )}
        {/* END Image Lightbox */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  wishlist: state.get('wishlist').wishlist,
});

const mapDispatchToProps = (dispatch) => ({
  addToWishlist: (data, wishlist) =>
    dispatch(actions.addToWishlist(data, wishlist)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
