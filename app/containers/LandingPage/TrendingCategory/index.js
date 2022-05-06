import React from 'react';
import { connect } from 'react-redux';
import { Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../../actions/index';
import TrendingCategoryCard from './component/trendingCategoryCard';

class TrendingCategory extends React.Component {
  componentDidMount() {
    this.props.getTrendingCategories();
    this.props.getHomePageContent();
  }

  render() {
    return (
      <div>
        <div className="h4 font-weight-bold">Trending Produk</div>
        {this.props.homePageContent.loading ||
          !this.props.homePageContent.data ? (
            <div className="text-center" key={0}>
              <Spin />
            </div>
          ) : (
            <TrendingCategoryCard
              trendingProduct={
                this.props.homePageContent.data.product.trendingProduct
              }
            />
          )}
        <NavLink to={'/katalog'}>
          <Button className="my-3 btn-block" type="primary" size={'large'}>
            Lihat Semua Produk
          </Button>
        </NavLink>
      </div>
    );
  }
}

TrendingCategory.propTypes = {
  authentication: PropTypes.object,
  homePageContent: PropTypes.object.isRequired,
  getHomePageContent: PropTypes.func,
  toggleCurtain: PropTypes.func,
  setToolbarState: PropTypes.func,
};
const mapStateToProps = (state) => ({
  categories: state.get('trendingCategory').categories,
  homePageContent: state.get('app').homePageContent,
});

const mapDispatchToProps = (dispatch) => ({
  getTrendingCategories: () => dispatch(actions.getTrendingCategories()),
  getHomePageContent: () => dispatch(actions.getHomePageContent()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingCategory);
