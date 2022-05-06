/**
 *
 * CatalogPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Col, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import TagManager from 'react-gtm-module';

import * as actions from '../../actions/index';
import ProductCard from './ProductCard';
import NotFoundProduct from './NotFoundProductPage/index';
import constant from './../../utils/configs/constant';

export class CatalogPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    const queryParam = queryString.parse(this.props.location.search);
    // console.log(queryParam);
    this.state = {
      limit: 10,
      searchName: queryParam.searchName,
    };
    this.toggleCurtain = this.toggleCurtain.bind(this);
  }

  /**
   * After rendering (DOM available)
   */

  componentDidMount() {
    this.props.setToolbarState({
      title: 'Katalog',
      showWishlist: true,
      showCart: true,
      showProfile: true,
      showFooter: false,
    });

    this.props.getCategories({ limit: 0 });
    // Google Tag Manager
    //   const tagManagerArgs = {
    //     gtmId: constant.GTM_ID,
    //   };
    //   TagManager.initialize(tagManagerArgs);
  }

  componentWillUnmount() {
    if (this.props.products.length === 0) {
      this.props.removeProducts();
      // this.props.getProducts({ offset: 0, limit: 10, query: 'typeProduct:1' });
    }
  }

  loadProducts() {
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam.query) {
      queryParam.query += ',typeProduct:1';
    } else {
      queryParam.query = 'typeProduct:1';
    }

    // Currently disabled
    // if (this.props.searchName !== null) {
    //   const searchName = this.props.searchName;
    //   const querySearchName = `name__icontains:${searchName}`;
    //   if (queryParam.query) {
    //     queryParam.query += `,${querySearchName}`;
    //   } else {
    //     queryParam.query = querySearchName;
    //   }
    // }
    // console.log(queryParam);

    const limit = this.state.limit;
    let offset = 0;
    if (this.props.products) {
      offset = this.props.products.length;
    }
    if (!this.props.loading) {
      this.props.getProducts({ offset, limit, ...queryParam });
    }
  }

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
    const loader = (
      <div className="text-center" key={0}>
        <Spin />
      </div>
    );

    // BEGIN Check Active Sort and Filter
    const queryParam = queryString.parse(this.props.location.search);
    let orderButtonActive = false;
    let filterButtonActive = false;
    if (queryParam.sortIndex) {
      orderButtonActive = true;
    }
    if (queryParam.filterPriceRangesIndex || queryParam.query2) {
      filterButtonActive = true;
    }
    // END Check Active Sort and Filter

    return (
      <div
        style={{
          marginTop: -15,
          marginLeft: -15,
          marginRight: -15,
          paddingTop: 40,
          paddingBottom: 25,
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

        <div className="catalog__container">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadProducts.bind(this)}
            hasMore={this.props.hasMoreItems}
            loader={loader}
          >
            {/* BEGIN Loop Products */}
            {this.props.products &&
              (this.props.products.length !== 0
                ? this.props.products.map((product) => (
                    // <NavLink to={`/produk/${product.uuid}`} key={product.uuid}>
                  <ProductCard
                    product={product}
                    key={product.uuid}
                    getProducts={this.props.getProducts}
                  />
                    // </NavLink>
                  ))
                : this.props.hasMoreItems === false &&
                  this.props.loading === false && <NotFoundProduct />)
            // <div>Katalog kosong</div>
            }
            {/* END Loop Products */}
          </InfiniteScroll>
        </div>

        <Row className="catalog__toolbar__bottom text-center">
          <Col
            className="p-2 clickable border-right"
            span={12}
            onClick={() => this.toggleCurtain('Urutkan')}
          >
            <Icon className="catalog__toolbar__bottom__icon" type="bars" />
            <span>
              Urutkan{' '}
              <span
                className={orderButtonActive ? 'ddc_notification_badge' : null}
              />
            </span>
          </Col>
          <Col
            className="p-2 clickable"
            span={12}
            onClick={() => this.toggleCurtain('Kategori Produk')}
          >
            <Icon className="catalog__toolbar__bottom__icon" type="filter" />
            <span>
              Kategori Produk{' '}
              <span
                className={filterButtonActive ? 'ddc_notification_badge' : null}
              />
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

CatalogPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  hasMoreItems: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

CatalogPage.defaultProps = {
  products: [],
  hasMoreItems: true,
  loading: false,
};

const mapStateToProps = (state) => ({
  loading: state.get('product').loading,
  searchName: state.get('product').searchName,
  hasMoreItems: state.get('product').hasMoreItems,
  products: state.get('product').products,
  wishlist: state.get('wishlist'),
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (data) => dispatch(actions.getProducts(data)),
  getCategories: (data) => dispatch(actions.getCategories(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  removeProducts: () => dispatch(actions.removeProducts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogPage);
