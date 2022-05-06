import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * Get Payment Method
 */
export const getPaymentMethods = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storePaymentMethods(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PAYMENT_METHOD;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        // Success
        const dataSuccess = {
          loading: false,
          paymentMethods: response.data.data,
        };
        dispatch(storePaymentMethods(dataSuccess));
      }
    })
    .catch((error) => {});
};

export const storePaymentMethods = (data) => ({
  type: actionTypes.PAYMENT_METHOD_STORE,
  data,
});
