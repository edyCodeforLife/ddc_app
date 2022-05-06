import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Icon } from 'antd';

import * as actions from '../../../actions/index';
// import DarkTitle from '../../../components/UI/DarkTitle';
import ProductStock from './components/ProductStock';

const wrapperStyle = {
  margin: -15,
};

class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbox: false,
      searchIcon: false,
      searchProduct: '',
      resultFilter: this.props.inventory,
      produks: null,
    };

    this.props.setToolbarState({
      title: null,
      hideBackButton: false,
      showProfile: true,
      showCart: true,
    });

    this.props.getTDSInventory();
  }
  componentDidMount() {}
  searchProduct = () => {
    this.setState({
      searchIcon: !this.state.searchIcon,
    });
  };
  componentDidUpdate(prevPorps, prevState) {
    if (this.props.inventory !== prevPorps.inventory) {
      this.setState({
        produks: this.props.inventory,
      });
    }
  }
  handleSearch = (event) => {
    const data = event.target.value.toLowerCase();
    const filterProducts = this.props.inventory;
    // const result = filterProducts.filter(
    //   (search) => search.productName.toLowerCase() == data
    // );

    const result = filterProducts.filter((search) => {
      const productName = search.productName.toLowerCase();
      const isTrue = productName.includes(event.target.value);
      if (isTrue) {
        return search;
      }
    });
    this.setState({
      searchProduct: event.target.value,
      produks: result,
    });
  };
  render() {
    const headerStyle = {
      height: 50,
      backgroundColor: '#505050',
      color: '#ffffff',
      fontSize: 14,
      paddingLeft: 15,
      padding: '0px 15px',
    };
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div style={wrapperStyle}>
        <Row type="flex" align="middle" style={headerStyle}>
          {!this.state.searchIcon && (
            <React.Fragment>
              <Col span={22}>
                <span>{'Informasi Stock Barang Anda'}</span>
              </Col>
              <Col span={2}>
                <span>
                  <Icon
                    type="search"
                    theme="outlined"
                    onClick={this.searchProduct}
                  />
                </span>
              </Col>
            </React.Fragment>
          )}
          {this.state.searchIcon && (
            // <Col span={22} className="stockAdjusment__search">
            <Input
              value={this.state.searchProduct}
              onChange={this.handleSearch}
              prefix={
                <Icon
                  type="search"
                  style={{ fontSize: 16, color: 'rgba(0,0,0,.25)' }}
                />
              }
              suffix={
                <Icon
                  type="close"
                  theme="outlined"
                  style={{ fontSize: 16, color: '#282828' }}
                  onClick={this.searchProduct}
                />
              }
            />
            // </Col>
          )}
        </Row>
        <div
          style={{
            marginTop: 10,
            marginBottom: 15,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
            paddingLeft: 15,
            paddingRight: 15,
            minHeight: 70,
            fontSize: 12,
          }}
        >
          {/* BEGIN Loop Product */}
          {this.state.produks &&
            this.state.produks.map((product) => (
              <ProductStock product={product} key={product.productId} />
            ))}
          {/* END Loop Product */}

          {this.props.adjustmentQuantityCount > 0 && (
            <NavLink to={'/profil/ubah-stok-barang'}>
              <Button className="btn-block mt-15" type="primary">
                <span>{this.props.adjustmentQuantityCount}</span> Stok dari{' '}
                <span>{this.props.adjustmentProductCount}</span> produk
              </Button>
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  inventory: state.get('requestTDS').inventory,
  adjustmentProductCount: state.get('requestTDS').adjustmentProductCount,
  adjustmentQuantityCount: state.get('requestTDS').adjustmentQuantityCount,
  searchProducts: state.get('product').searchProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getTDSInventory: () => dispatch(actions.getTDSInventory()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryPage);
