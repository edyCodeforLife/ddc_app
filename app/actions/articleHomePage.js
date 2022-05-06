import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getArticlesHomePage = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    hasMore: false,
  };
  if (!data.pushItems) {
    // Empty articles if change article category
    dataStart.articles = [];
  }
  dispatch(storeArticlesHomePage(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ARTICLES;
  axios
    .get(URL, {
      params: {
        ...data,
        limit: 3,
        orderby: 'publishDate',
        sortby: 'desc',
      },
    })
    .then((response) => {
      // Success
      const dataSuccess = {
        pushItems: data.pushItems,
        loading: false,
        articles: response.data.data,
        hasMore: response.data.data.length === 10,
      };
      dispatch(storeArticlesHomePage(dataSuccess));
    })
    .catch((error) => {});
};

export const getArticle = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    article: null,
  };
  dispatch(storeArticlesHomePage(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ARTICLE;
  axios
    .get(URL + data.slug)
    .then((response) => {
      if (response.data.code === 200) {
        // Success
        const dataSuccess = {
          loading: false,
          article: response.data.data,
        };
        dispatch(storeArticlesHomePage(dataSuccess));
      }
    })
    .catch((error) => {});
};

export const storeArticlesHomePage = (data) => ({
  type: actionTypes.ARTICLE_STORE_HOME_PAGE,
  data,
});
