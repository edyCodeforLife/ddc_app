import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as actions from '../../../actions';
// import constant from './../../../utils/configs/constant';

export class CatalogFilter extends React.Component {
  constructor(props) {
    super(props);
    let filterPriceRangesIndex = [0, 0];
    let filterCategories = [];

    const queryParam = queryString.parse(this.props.location.search);

    if (queryParam.filterPriceRangesIndex) {
      // Split text to array and parse to number
      filterPriceRangesIndex = queryParam.filterPriceRangesIndex
        .split(',')
        .map((item) => parseInt(item, 0));
    }

    if (queryParam.query2) {
      // Split query2=product_category_id__in:1,2
      const query2 = queryParam.query2.split(':');
      // Split 1,2
      filterCategories = query2[1].split(',').map((item) => parseInt(item, 0));
      // filterCategories = [...filterCategoriesSplit];
      // filterCategories.concat(filterCategoriesSplit);
      // console.log(query2);
      // console.log(filterCategoriesSplit);
      // console.log(filterCategories);
    }

    this.state = {
      existingQueryParam: queryParam,
      filterCategories,
      filterPriceRangesIndex,
      filterPriceRanges: [
        [
          {
            name: 'Semua Harga',
            standard_retail_price__gte: null,
            standard_retail_price__lte: null,
          },
          {
            name: 'Dibawah 100 ribu',
            standard_retail_price__gte: null,
            standard_retail_price__lte: 100000,
          },
        ],
        [
          {
            name: '100 - 300 ribu',
            standard_retail_price__gte: 100000,
            standard_retail_price__lte: 300000,
          },
          {
            name: '300 - 500 ribu',
            standard_retail_price__gte: 300000,
            standard_retail_price__lte: 500000,
          },
        ],
        [
          {
            name: 'Diatas 500 ribu',
            standard_retail_price__gte: 500000,
            standard_retail_price__lte: null,
          },
        ],
      ],
    };

    this.selectPriceRange = this.selectPriceRange.bind(this);
    // this.selectCategory = this.selectCategory.bind(this);
    this.resetCatalogFilter = this.resetCatalogFilter.bind(this);
    this.setCatalogFilter = this.setCatalogFilter.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    // this.state.filterCategories.map((categoryId) => {
    //   this.selectCategory(categoryId);
    // });
  }

  /**
   * Reset Catalog Filter
   */
  resetCatalogFilter() {
    this.setState({
      filterPriceRangesIndex: [0, 0],
      filterCategories: [],
    });
  }

  /**
   * Do Catalog Filter
   */
  setCatalogFilter() {
    let filterCategoryQuery = '';
    let filterPriceRangeQuery = '';
    const filterPriceRangeQueryArray = [];
    let sortQuery = '';

    /**
     * Get price range parameter from filterPriceRangesIndex
     * filterPriceRangesIndex[0,0] = Get all price
     */
    if (this.state.filterPriceRangesIndex.join() !== '0,0') {
      const filterPriceRange = this.state.filterPriceRanges[
        this.state.filterPriceRangesIndex[0]
      ][this.state.filterPriceRangesIndex[1]];
      filterPriceRangeQuery += `filterPriceRangesIndex=${
        this.state.filterPriceRangesIndex
      }&query=`;
      if (filterPriceRange.standard_retail_price__gte !== null) {
        filterPriceRangeQueryArray.push(
          `standard_retail_price__gte:${
            filterPriceRange.standard_retail_price__gte
          }`
        );
      }
      if (filterPriceRange.standard_retail_price__lte !== null) {
        filterPriceRangeQueryArray.push(
          `standard_retail_price__lte:${
            filterPriceRange.standard_retail_price__lte
          }`
        );
      }
      filterPriceRangeQuery += filterPriceRangeQueryArray.join(',');
    }

    /**
     * Get category parameter
     */
    if (this.state.filterCategories.length !== 0) {
      filterCategoryQuery = `&query2=product_category_id__in:${this.state.filterCategories.join(
        ','
      )}`;
    }

    /**
     * Get sort query param
     */
    const existingQueryParam = this.state.existingQueryParam;
    if (existingQueryParam.sortIndex) {
      sortQuery = `&sortby=${existingQueryParam.sortby}`;
      sortQuery += `&order=${existingQueryParam.order}`;
      sortQuery += `&sortIndex=${existingQueryParam.sortIndex}`;
    }

    /**
     * Set query parameter and redirect page
     */
    this.props.history.push({
      pathname: '/katalog',
      search: `?${filterPriceRangeQuery}${filterCategoryQuery}${sortQuery}`,
    });

    /**
     * Close Curtain
     */
    const data = {
      show: false,
      title: null,
    };
    this.props.toggleCurtain(data);
    this.props.removeProducts();
  }

  /**
   * Select price range from filterPriceRanges array
   * @param {number} rowIndex
   * @param {number} colIndex
   */
  selectPriceRange(rowIndex, colIndex) {
    // console.log(this.state.filterPriceRanges[rowIndex][colIndex]);
    this.setState({
      filterPriceRangesIndex: [rowIndex, colIndex],
    });
  }

  /**
   * Add category to filter list
   * @param {number} categoryId
   */
  selectCategory(categoryId) {
    const filterCategories = this.state.filterCategories;
    // Check if value exist
    const categoryExist = filterCategories.includes(categoryId);
    if (categoryExist) {
      // Remove if exist
      const index = filterCategories.indexOf(categoryId);
      filterCategories.splice(index, 1);
    } else {
      // Add if not exist
      filterCategories.push(categoryId);
    }
    this.setState({
      filterCategories,
    });
  }

  render() {
    return (
      <div className="catalog__filter">
        {/* BEGIN Filter Price Range */}
        <div className="catalog__filter__section">
          <div className="catalog__filter__section__tilte font-weight-bold">
            Rentang Harga
          </div>
          {this.state.filterPriceRanges.map((row, rowIndex) => (
            <Row className="my-2" gutter={8} key={rowIndex}>
              {row.map((col, colIndex) => (
                <Col span={12} key={colIndex}>
                  <Button
                    className="catalog__filter__section__button btn-block font-weight-normal"
                    type={
                      this.state.filterPriceRangesIndex[0] === rowIndex &&
                      this.state.filterPriceRangesIndex[1] === colIndex
                        ? 'primary'
                        : ''
                    }
                    onClick={() => this.selectPriceRange(rowIndex, colIndex)}
                  >
                    {col.name}
                  </Button>
                </Col>
              ))}
            </Row>
          ))}
        </div>
        {/* END Filter Price Range */}

        {/* <div className="catalog__filter__section">
					<div className="catalog__filter__section__tilte font-weight-bold">
						Brand
					</div>
				</div> */}

        {/* BEGIN Filter Category */}
        <div className="catalog__filter__section">
          <div className="catalog__filter__section__tilte font-weight-bold">
            Kategori
          </div>
          {this.props.categories.map((category) => (
            <Button
              className="
                catalog__filter__section__category_button font-weight-normal"
              // className="catalog__filter__section__category_button font-weight-normal"
              type={
                this.state.filterCategories.includes(category.id)
                  ? 'primary'
                  : ''
              }
              key={category.id}
              onClick={() => this.selectCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        {/* END Filter Category */}

        {/* BEGIN Button */}
        <Row gutter={8}>
          <Col span={12}>
            <Button className="btn-block" onClick={this.resetCatalogFilter}>
              Reset
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className="btn-block"
              type="primary"
              onClick={this.setCatalogFilter}
            >
              Filter
            </Button>
          </Col>
        </Row>
        {/* END Button */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.get('product').categories,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  removeProducts: () => dispatch(actions.removeProducts()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CatalogFilter)
);
