import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getArticle = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ARTICLE;
  return (dispatch) => {
    dispatch(getArticleCardStart());
    axios
      .get(URL + data.slug)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(getDetailArticleSuccess(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const getDetailArticleStart = () => ({
  type: actionTypes.GET_DETAIL_ARTICLE_START,
});

export const getDetailArticleSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_ARTICLE_SUCCESS,
  data,
});
export const storeDetailArticle = () => ({
  type: actionTypes.STORE_DETAIL_ARTICLE,
});


export const getListArticlesCard = (data) => (dispatch) => {
  dispatch(getArticleCardStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ARTICLES;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      dispatch(getArticleCardSuccess(response.data.data));
    })
    .catch((error) => {});
};

export const getArticleCardStart = () => ({
  type: actionTypes.GET_ARTICLE_CARD_START,
});

export const getArticleCardSuccess = (data) => ({
  type: actionTypes.GET_ARTICLE_CARD_SUCCESS,
  data,
});
