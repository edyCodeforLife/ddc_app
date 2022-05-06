import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import NumberFormat from 'react-number-format';

import * as actions from '../../actions/index';
import CustomSVG from './../../components/CustomSVG';
import ProductCard from '../CatalogPage/ProductCard';

class WishlistPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setToolbarState({
      title: 'Wishlist',
      hideBackButton: false,
      hideBurgerMenu: true,
    });
    this.props.getWishlists();
    this.props.getMemberCount({ memberCount: this.props.app.memberCount });
  }

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {this.props.wishlistCount !== 0 ? (
          <div>
            {/* BEGIN Loop Products */}
            {this.props.products
              ? this.props.products.map((product) => (
                <ProductCard product={product} key={product.uuid} />
                ))
              : null
            // <div>Katalog kosong</div>
            }
            {/* END Loop Products */}
          </div>
        ) : (
          <div style={{ minHeight: '50vh', marginTop: '30%' }}>
            <Row type="flex" justify="center">
              <Col>
                <CustomSVG name={'ic-love-sad'} />
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{ marginTop: 25 }}>
              <Col>
                <div>Belum ada produk yang Kamu tandai</div>
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{ marginTop: 20 }}>
              <Col>
                <NavLink to="/katalog">
                  <Button type="primary">Mulai Cari Produk</Button>
                </NavLink>
              </Col>
            </Row>
          </div>
        )}
        {/* BEGIN If not login */}
        {this.props.authentication.isAuthenticated === false ? (
          <div className="text-center" style={{ margin: 20, fontSize: 12 }}>
            <p>
              Belum jadi Reseller ? Yuk Gabung sekarang juga .Lebih dari
              <NumberFormat
                style={{ marginLeft: '5px', marginRight: '5px' }}
                value={this.props.app.memberCount}
                displayType={'text'}
                thousandSeparator
              />
              Reseller dan menikmati keuntunganya.
            </p>

            <NavLink
              to="/"
              className="font-weight-bold"
              style={{ marginTop: 20, textDecoration: 'underline' }}
            >
              Daftar Sekarang
            </NavLink>
          </div>
        ) : null}
        {/* END If not login */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  wishlistCount: state.get('wishlist').wishlistCount,
  products: state.get('wishlist').products,
  app: state.get('app'),
});

const mapDispatchToProps = (dispatch) => ({
  getWishlists: () => dispatch(actions.getWishlists()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getMemberCount: (data) => dispatch(actions.getMemberCount(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
