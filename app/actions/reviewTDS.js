import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * PUT Review TDS
 */
export const putReviewTDS = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeReviewTDS(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_PUT_REVIEW;
  axios
    .put(URL + data.idReview, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeReviewTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storeReviewTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeReviewTDS(dataError));
    });
};

/**
 * GET Review TDS
 */

export const getReviewTDS = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_REVIEW;

  return (dispatch) => {
    axios
      .get(URL + data.idReview)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          const dataSuccess = {
            data: response.data.data,
            // formSuccess: true,
          };
          dispatch(storeReviewTDS(dataSuccess));
        }
      })
      .catch((error) => {
        dispatch(storeReviewTDS(error));
      });
  };
};

export const getReviewsTDS = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_REVIEW_TDS;
  return (dispatch) => {
    axios
      .get(URL + data.id)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(storeReviewTDS(response.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeReviewTDS = (data) => ({
  type: actionTypes.REVIEW_TDS_STORE,
  data,
});
