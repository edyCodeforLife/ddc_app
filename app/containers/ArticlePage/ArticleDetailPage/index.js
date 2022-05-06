/**
 *
 * DetailArticlesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as actions from '../../../actions/index';
import ArticleDetail from './component/articleDetail';
import constant from 'utils/configs/constant';

export class ArticleDetailPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Kembali',
      hideBurgerMenu: true,
      showProfile: false,
      showCart: false,
      showFooter: true,
    });
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam !== null) {
      if (queryParam && queryParam.webview == 1) {
        this.props.setToolbarState({
          title: 'Kembali',
          hideBurgerMenu: true,
          showFooter: false,
        });
      } else {
        this.props.setToolbarState({
          title: 'Kembali',
          hideBurgerMenu: true,
          showFooter: true,
        });
      }
    }

    const query = {
      slug: this.state.slug,
    };
    this.props.getArticle(query);

    // BEGIN Init FB
    window.fbAsyncInit = () => {
      FB.init({
        appId: constant.PLUGIN_FACEBOOK_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v3.1', // use version 3.1
      });
    };
    ((d, s, id) => {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.async = true;
      js.src = `https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v3.1&appId=${
        constant.PLUGIN_FACEBOOK_ID
      }&autoLogAppEvents=1`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    // END Init FB
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.article !== null) {
    // console.log(this.props.match.params.slug);
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.setState = {
        slug: this.props.match.params.slug,
      };
      const query = {
        slug: this.props.match.params.slug,
      };
      this.props.getArticle(query);
    }

    if (this.props.article && prevProps.article !== this.props.article) {
      this.props.getOtherArticles({
        categoryId: this.props.article.categoryId,
      });
    }

    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.article !== null && (
          <ArticleDetail
            otherArticles={this.props.otherArticles}
            detailArtikel={this.props.article}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  otherArticles: state.get('article').otherArticles,
  article: state.get('article').article,
});

const mapDispatchToProps = (dispatch) => ({
  getArticle: (data) => dispatch(actions.getArticle(data)),
  getOtherArticles: (data) => dispatch(actions.getOtherArticles(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailPage);
