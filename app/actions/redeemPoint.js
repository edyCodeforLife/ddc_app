import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * Get List Redeem Point Products
 */
export const getRedeemPointProducts = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PRODUCTS;
  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeRedeemPoint(dataStart));
    axios
      .get(URL, {
        params: {
          query: 'typeReward:1',
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
            products: response.data.data,
          };
          dispatch(storeRedeemPoint(dataSuccess));
        } else {
          const dataError = {
            loading: false,
          };
          dispatch(storeRedeemPoint(dataError));
        }
      })
      .catch((error) => {
        const dataError = {
          loading: false,
        };
        dispatch(storeRedeemPoint(dataError));
      });
  };
};

/**
 * Get Redeem Point Histories
 */
export const getRedeemPointHistories = (data) => {
  const URL =
    constant.URL_MASTER_PATH + constant.URL_GET_REDEEM_POINT_HISTORIES;
  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            histories: response.data.data,
          };
          dispatch(storeRedeemPoint(dataSuccess));
        }
      })
      .catch((error) => {});
  };
};

export const postRedeemPoint = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_REDEEM_POINT;
  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeRedeemPoint(dataStart));
    axios
      .post(`${URL}`, JSON.stringify(data))
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
            formSuccess: true,
          };
          dispatch(storeRedeemPoint(dataSuccess));
        } else {
          const dataFailed = {
            loading: false,
            formError: response.data,
          };
          dispatch(storeRedeemPoint(dataFailed));
        }
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeRedeemPoint(dataFailed));
      });
  };
};

export const storeRedeemPoint = (data) => ({
  type: actionTypes.REDEEM_POINT_STORE,
  data,
});
