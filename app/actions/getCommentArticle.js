import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getCommentArticle = (data) => (dispatch) => {
  dispatch(getCommentArticleStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_COMMENT_ARTICLE;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      dispatch(getCommentArticleSuccess(response.data.data));
    })
    .catch((error) => {});
};

export const getCommentArticleStart = () => ({
  type: actionTypes.GET_COMMENT_ARTICLE_START,
});

export const getCommentArticleSuccess = (data) => ({
  type: actionTypes.GET_COMMENT_ARTICLE_SUCCESS,
  data,
});

export const storeCommentArticle = (data) => ({
  type: actionTypes.STORE_COMMENT_ARTICLE,
  data,
});

export const submitCommentArticle = (data) => (dispatch) => {
  const params = {
    articleId: data.articleId,
    comment: data.comment,
  };
  dispatch(submitCommentArticleStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_SUBMIT_COMMENT_ARTICLE;
  axios
    .post(URL, JSON.stringify(params))
    .then((response) => {
      const data ={
        formSuccess:true,
      };
      dispatch(submitCommentArticleSuccess(data));
    })
    .catch((error) => {});
};

export const submitCommentArticleStart = () => ({
  type: actionTypes.SUBMIT_COMMENT_ARTICLE_START,
});

export const submitCommentArticleSuccess = (data) => ({
  type: actionTypes.SUBMIT_COMMENT_ARTICLE_SUCCESS,
  data,
});
