import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * POST Payment
 */
export const orderRenewalByPoin = (data) => (dispatch) => {
  const params = {
    paymentMethodId: data,
  };
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeRenewalByPoin(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_ORDER_RENEWAL;
  axios
    .post(URL, JSON.stringify(params))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
          response: response.message,
        };
        dispatch(storeRenewalByPoin(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storeRenewalByPoin(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeRenewalByPoin(dataError));
    });
};

export const storeRenewalByPoin = (data) => ({
  type: actionTypes.STORE_RENEWALBY_POIN,
  data,
});

export const renewalSuccessReset = () => ({
  type: actionTypes.RENEWAL_SUCCESS_RESET,
});

export const orderRenewalTop = (data) => (dispatch) => {
  console.log(data);
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeRenewalTop(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_ORDER_RENEWAL_TOP;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
          response: response.message,
        };
        dispatch(storeRenewalTop(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storeRenewalTop(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeRenewalTop(dataError));
    });
};

export const storeRenewalTop = (data) => ({
  type: actionTypes.STORE_RENEWAL_TOP,
  data,
});

export const storeRenewalTopReset = () => ({
  type: actionTypes.STORE_RENEWAL_TOP_RESET,
});
