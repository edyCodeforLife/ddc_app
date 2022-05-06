import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon, Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import * as actions from '../../../actions';
import constant from '../../../utils/configs/constant';
import CustomImage from '../../../components/CustomImage';

export class CatalogSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getSearchProducts = this.getSearchProducts.bind(this);
    this.setCatalogByCategoryId = this.setCatalogByCategoryId.bind(this);
    // this.submitSearchName = this.submitSearchName.bind(this);
  }

  componentDidMount() {
    // Focus input on last letter
    const input = this.searchName;
    const length = input.value.length;
    input.focus();
    input.setSelectionRange(length, length);
  }

  /**
   * Get List Products, search by keyword name
   */
  getSearchProducts(e) {
    const name = e.target.value.toLowerCase();
    const data = {
      // query: `name__icontains:${name}`, // Not Used
      query: name,
      limit: 10,
      searchName: e.target.value,
    };
    this.props.getSearchProducts(data);
  }

  // submitSearchName(event) {
  //   if (event.key === 'Enter') {
  //     this.props.toggleCurtainClicked();
  //     this.props.removeProducts();
  //   }
  // }

  /**
   * Show Catalog by Category
   * @param {} category
   */
  setCatalogByCategoryId(category) {
    /**
     * Set query parameter and redirect page
     */
    this.props.history.push({
      pathname: '/katalog',
      search: `?searchName=${encodeURIComponent(
        category.name
      )}&query2=product_category_id__in:${category.id}`,
    });

    /**
     * Close Curtain
     */
    this.props.toggleCurtainClicked();
    this.props.removeProducts();
  }

  clearField = () => {
    const inputSearch = document.getElementById('inputSearch');
    inputSearch.value = '';
    setTimeout(() => {
      this.props.toggleCurtainClicked();
    }, 200);
  }

  /**
   * Highlight Product Name based on Search
   * WIP!
   */
  highlightText(text) {
    // console.log(this.props.searchName);
    // return text.replace(/{this.props.searchName}/g, `<b>${this.props.searchName}</b>`);
    return text.replace(
      /{this.props.searchName}/g,
      `<b>${this.props.searchName}</b>`
    );
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          {/* BEGIN Search Box */}
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            className="curtain__catalog__search"
          >
            <Col>
              <Icon type="search" style={{ fontSize: 24, color: '#b4b4b4' }} />
            </Col>
            <Col span={20}>
              <input
                type="search"
                id="inputSearch"
                ref={(input) => {
                  this.searchName = input;
                }}
                value={this.props.searchName}
                className="curtain__catalog__search__input"
                onChange={this.getSearchProducts}
                onKeyPress={this.submitSearchName}
                // autoFocus
              />
            </Col>
            <Col>
              <Icon
                type="close"
                className="clickable"
                style={{ fontSize: 24 }}
                onClick={this.clearField}
              />
            </Col>
          </Row>
          {/* END Search Box */}
        </div>
        <div className="curtain__catalog__search_section">
          <div className="catalog__search__result_section">
            {/* <div className="catalog__search__result_text">Smart</div>
            <div className="catalog__search__result_text">Smart</div>
            <div className="catalog__search__result_text">Smart</div> */}
          </div>

          {/* BEGIN Search Result Categories */}
          <div className="catalog__search__result_product">
            {this.props.searchCategories &&
              this.props.searchCategories.map((category) => (
                <div
                  className="pb-3 clickable"
                  key={category.id}
                  onClick={() => this.setCatalogByCategoryId(category)}
                >
                  {category.name}
                </div>
              ))}
          </div>
          {/* END Search Result Categories */}

          <div className="catalog__search__result_product">
            {this.props.searchProducts &&
              this.props.searchProducts.map((product) => (
                <Row
                  type="flex"
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderTop: 'solid 0.5px #dcdcdc',
                  }}
                >
                  <Col span={4}>
                    <div>
                      {product.imageList.length > 0 ? (
                        <img
                          className="catalog__search__result_product__image"
                          src={product.imageList[0].imagePath}
                        />
                      ) : (
                        <CustomImage
                          name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                          style={{
                            width: '100%',
                            maxWidth: 60,
                            maxHeight: 60,
                          }}
                        />
                      )}
                    </div>
                  </Col>
                  <Col span={16} className="px-3">
                    <div style={{ fontSize: 12 }}>
                      {this.highlightText(product.name)}
                    </div>
                    <div className="font-weight-bold">
                      <NumberFormat
                        value={product.standardRetailPrice}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp. '}
                      />
                    </div>
                  </Col>
                  <Col span={4}>
                    <NavLink to={`/produk/${product.uuid}`} key={product.uuid}>
                      <Button
                        type="primary"
                        onClick={this.props.toggleCurtainClicked}
                      >
                        Lihat
                      </Button>
                    </NavLink>
                  </Col>
                </Row>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchProducts: state.get('product').searchProducts,
  searchCategories: state.get('product').searchCategories,
  searchName: state.get('product').searchName,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchProducts: (data) => dispatch(actions.getSearchProducts(data)),
  removeProducts: () => dispatch(actions.removeProducts()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CatalogSearch)
);
