import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getSearchProductStockAdjusment = (data) => {
  const URL =
    constant.URL_MASTER_PATH +
    constant.URL_GET_SEARCH_PRODUCT_AND_CATEGORY_BY_NAME;

  return (dispatch) => {
    dispatch(storeSearchProductStockAdjusment(data));
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(storeSearchProductStockAdjusment(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeSearchProductStockAdjusment = (data) => ({
  type: actionTypes.STORE_SEARCH_PRODUCT_STOCK_ADJUSMENT,
  data,
});
