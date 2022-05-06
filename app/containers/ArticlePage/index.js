/**
 *
 * ArticlesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import PerfectScrollbar from 'react-perfect-scrollbar';

import * as actions from '../../actions/index';
import ArticleCardBig from './component/ArticleCardBig';
import ArticleCard from './component/ArticleCard';

const style = {
  categorySection: {
    display: 'inline-flex',
  },
  categoryButton: {
    marginRight: 10,
    whiteSpace: 'nowarp',
  },
  articlesSection: {
    marginLeft: -15,
    marginRight: -15,
    marginTop: -15,
    marginBottom: -15,
    background: '#fafafa',
  },
};

const perfectScrollbarOption = {
  suppressScrollY: true,
  wheelPropagation: true,
};
export class ArticlePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    const queryParam = queryString.parse(this.props.location.search);
    this.state = {
      categoryId: queryParam.categoryId
        ? parseInt(queryParam.categoryId, 0)
        : null,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    const queryParam = queryString.parse(this.props.location.search);
    // const query = 'queryParam.webview=true';
    if (queryParam !== null) {
      if (queryParam && queryParam.webview == 1) {
        this.props.setToolbarState({
          title: ' ',
          showProfile: false,
          showCart: false,
          showFooter: false,
          hideBurgerMenu: true,
          hideBackButton: true,
        });
      } else {
        this.props.setToolbarState({
          showProfile: true,
          showCart: true,
          showFooter: true,
        });
      }
    }
    const query = {
      offset: 0,
      categoryId: this.state.categoryId,
    };
    this.props.getArticles(query);
    this.props.getArticleCategories();
  }

  // Change Category Id
  onChangeCategoryId = (e) => {
    let categoryId = e.target ? e.target.value : e;
    categoryId = categoryId === 0 ? null : categoryId;
    this.setState({ categoryId });

    // Push to route
    this.props.history.push({
      search: `?categoryId=${categoryId}`,
    });

    const query = {
      limit: 10,
      categoryId,
    };
    this.props.getArticles(query);
  };

  // Get Articles
  getArticles({ pushItems }) {
    const queryParam = queryString.parse(this.props.location.search);
    let offset = 0;
    if (pushItems) {
      offset = this.props.articles.length;
    }
    return this.props.getArticles({
      categoryId: this.state.categoryId,
      pushItems,
      offset,
      ...queryParam,
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* BEGIN Article Category */}
        <PerfectScrollbar option={perfectScrollbarOption}>
          <div className="pb-15">
            <Radio.Group
              buttonStyle="solid"
              defaultValue={this.state.categoryId}
              onChange={this.onChangeCategoryId}
              style={style.categorySection}
            >
              <Radio.Button
                value={0}
                className="btn-block text-center text-nowrap"
                style={style.categoryButton}
              >
                Semua
              </Radio.Button>
              {/* BEGIN Loop Category Button */}
              {this.props.articleCategories.map((category) => (
                <Radio.Button
                  key={category.id}
                  value={category.id}
                  className="btn-block text-center text-nowrap"
                  style={style.categoryButton}
                >
                  {category.categoryName}
                </Radio.Button>
              ))}
              {/* END Loop Category Button */}
            </Radio.Group>
          </div>
        </PerfectScrollbar>
        {/* END Article Category */}
        <div style={style.articlesSection}>
          {/* BEGIN Loop Article */}
          {this.props.articles.map((article, index) => (
            <NavLink to={`artikel/${article.slug}`} key={article.id}>
              {index === 0 ? (
                // First article always use Big Card
                <ArticleCardBig article={article} />
              ) : (
                <ArticleCard article={article} />
              )}
            </NavLink>
          ))}
          {/* END Loop Article */}
          <div className="my-40 text-center">
            {this.props.loading ? (
              <Spin spinning={this.props.loading} />
            ) : (
              // Button Load More
              this.props.hasMore && (
                <div
                  className="font-weight-bold clickable font-color-primary"
                  onClick={() => this.getArticles({ pushItems: true })}
                >
                  Tampilkan Lebih Banyak
                </div>
              )
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ArticlePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  articleCategories: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  setToolbarState: PropTypes.func,
  getArticleCategories: PropTypes.func,
  getArticles: PropTypes.func,
};

ArticlePage.defaultProps = {
  articles: [],
  hasMore: false,
  loading: false,
};

const mapStateToProps = (state) => ({
  articles: state.get('article').articles,
  hasMore: state.get('article').hasMore,
  loading: state.get('article').loading,
  articleCategories: state.get('articleCategory').articleCategories,
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: (data) => dispatch(actions.getArticles(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getArticleCategories: () => dispatch(actions.getArticleCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage);
