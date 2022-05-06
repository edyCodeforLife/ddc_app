import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as actions from '../../../actions';

export class CatalogSort extends React.Component {
  constructor(props) {
    super(props);
    const queryParam = queryString.parse(this.props.location.search);
    // console.log(queryParam);
    this.state = {
      existingQueryParam: queryParam,
      sortIndex: parseInt(queryParam.sortIndex, 0),
      url: null,
      sortOrders: [
        { sortby: 'publishDate', name: 'Terbaru', order: 'desc' },
        { sortby: 'numberOfSales', name: 'Terlaris', order: 'desc' },
        { sortby: 'numberOfSales', name: 'Terpopuler', order: 'desc' },
        {
          sortby: 'standard_retail_price',
          name: 'Harga Tertinggi',
          order: 'desc',
        },
        {
          sortby: 'standard_retail_price',
          name: 'Harga Terendah',
          order: 'asc',
        },
      ],
    };
  }

  /**
   * Do Catalog Sort
   * @param {number} i
   */
  onRowClicked(i) {
    console.log(i);
    // console.log(this.state.sortIndex);
    this.setState({ sortIndex: i });
  }

  setCatalogSort() {
    let filterPriceRangeQuery = '';

    /**
     * Get sort query param
     */
    const existingQueryParam = this.state.existingQueryParam;
    // console.log(existingQueryParam);
    if (existingQueryParam.filterPriceRangesIndex) {
      filterPriceRangeQuery += `query=${existingQueryParam.query}&`;
      filterPriceRangeQuery += `filterPriceRangesIndex=${
        existingQueryParam.filterPriceRangesIndex
      }&`;
    }

    /**
     * Set query parameter and redirect page
     */
    const sort = this.state.sortOrders[this.state.sortIndex];
    this.props.history.push({
      pathname: '/katalog',
      search: `?${filterPriceRangeQuery}sortby=${sort.sortby}&order=${
        sort.order
      }&sortIndex=${this.state.sortIndex}`,
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

  resetCatalogFilter = () => {
    let filterPriceRangeQuery = '';

    /**
     * Get sort query param
     */
    const existingQueryParam = this.state.existingQueryParam;
    // console.log(existingQueryParam);
    if (existingQueryParam.filterPriceRangesIndex) {
      filterPriceRangeQuery += `query=${existingQueryParam.query}&`;
      filterPriceRangeQuery += `filterPriceRangesIndex=${
        existingQueryParam.filterPriceRangesIndex
      }&`;
    }

    /**
     * Set query parameter and redirect page
     */
    const sort = this.state.sortOrders[this.state.sortIndex];
    this.props.history.push({
      pathname: '/katalog',
      search: `?${filterPriceRangeQuery}`
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

  render() {
    return (
      <div className="catalog__sort">
        <div style={{ height: '80vh' }}>
          {this.state.sortOrders.map((sort, i) => (
            <Row
              className="py-3 clickable"
              type="flex"
              justify="space-between"
              key={i.id}
              onClick={() => this.onRowClicked(i)}
            >
              <Col>{sort.name}</Col>
              <Col>
                {this.state.sortIndex === i && (
                  <Icon type="check" style={{ fontSize: 22 }} />
                )}
              </Col>
            </Row>
          ))}
        </div>
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
              onClick={() => this.setCatalogSort()}
            >
              Urutkan
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  removeProducts: () => dispatch(actions.removeProducts()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CatalogSort)
);
