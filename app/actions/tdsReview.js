import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const storeGetReviewTDS = (data) => ({
  type: actionTypes.STORE_GET_REVIEW_TDS,
  data,
});

export const getReviewTDS = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_REVIEW_TDS;
  return (dispatch) => {
    axios
      .get(URL + data.id)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(storeGetReviewTDS(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const replyCommentTDS = (data) => (dispatch) => {
  const comment = {
    comment: data.comment,
  };
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(replyReviewTdsStore(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_ADD_REVIEW_TDS;
  axios
    .put(URL + data.id, JSON.stringify(comment))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(replyReviewTdsStore(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(replyReviewTdsStore(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(replyReviewTdsStore(dataError));
    });
};

export const replyReviewTdsStore = (data) => ({
  type: actionTypes.REPLY_REVIEW_TDS_STORE,
  data,
});

export const resetReviewTdsStore = () => ({
  type: actionTypes.RESET_REVIEW_TDS,
});
