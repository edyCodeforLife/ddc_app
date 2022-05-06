import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';
import { getCartQuantity } from './cart';

/**
 * POST Payment
 */
export const postPayment = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storePayment(dataStart));
  let URL = null;
  if (data.isMembership) {
    // Membership Payment
    URL = constant.URL_MASTER_PATH + constant.URL_POST_PAYMENT_MEMBERSHIP;
  } else if (data.isRenewal) {
    // Renewal Payment
    URL = constant.URL_MASTER_PATH + constant.URL_POST_RENEWAL_PAYMENT;
  } else {
    // Purchase Product Payment
    URL = constant.URL_MASTER_PATH + constant.URL_POST_PAYMENT;
  }

  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
          response: { uuid: response.data.data.uuid },
        };
        dispatch(storePayment(dataSuccess));
        dispatch(getCartQuantity());
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storePayment(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storePayment(dataError));
    });
};

/**
 * Get Payment Total Price
 * For Credit Card Payment
 */
export const getPaymentTotalPrice = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storePayment(dataStart));
  const URL =
    constant.URL_MASTER_PATH + constant.URL_GET_ORDER_PAYMENT_TOTAL_PRICE;
  axios
    .get(URL)
    .then((response) => {
      if (response.data.code === 200) {
        // Success
        const dataSuccess = {
          loading: false,
          totalPrice: response.data.data.totalPrice,
        };
        dispatch(storePayment(dataSuccess));
      } else {
        const dataError = {
          loading: false,
        };
        dispatch(storePayment(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storePayment(dataError));
    });
};

export const storePayment = (data) => ({
  type: actionTypes.PAYMENT_STORE,
  data,
});
