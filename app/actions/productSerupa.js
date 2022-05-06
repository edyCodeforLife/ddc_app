import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const productsSerupaStart = () => ({
  type: actionTypes.PRODUCTS_SERUPA_START,
});

export const productsSerupaFail = () => ({
  type: actionTypes.PRODUCTS_SERUPA_FAIL,
});

export const productsSerupaSuccess = (data) => ({
  type: actionTypes.PRODUCTS_SERUPA_SUCCESS,
  data,
});

/**
 * Get List Products Serupa
 */
export const getProductsSerupa = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PRODUCTS;

  return (dispatch) => {
    dispatch(productsSerupaStart(data));
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(productsSerupaSuccess(response.data.data));
        }
      })
      .catch((error) => {
        dispatch(productsSerupaFail(error));
      });
  };
};
