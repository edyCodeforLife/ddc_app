import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * POST Review Product
 */
export const postReviewProduct = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeReviewProduct(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_REVIEW_PRODUCT;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeReviewProduct(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storeReviewProduct(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeReviewProduct(dataError));
    });
};

export const storeReviewProduct = (data) => ({
  type: actionTypes.REVIEW_PRODUCT_STORE,
  data,
});
