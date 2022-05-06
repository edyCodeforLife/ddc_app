import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const productsStart = (data) => ({
  type: actionTypes.PRODUCTS_START,
  searchName: data.searchName,
});

export const productsFail = (data) => ({
  type: actionTypes.PRODUCTS_FAIL,
  data,
});

export const setProducts = (products) => ({
  type: actionTypes.SET_PRODUCTS,
  products,
});

export const removeProducts = () => ({
  type: actionTypes.REMOVE_PRODUCTS,
});

/**
 * Get List Products
 */
export const getProducts = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PRODUCTS;

  return (dispatch) => {
    dispatch(productsStart(data));
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(setProducts(response.data.data));
        }else{
          dispatch(productsFail(null));
        }
      })
      .catch((error) => {
        dispatch(productsFail(error));
      });
  };
};

export const storeCategories = (data) => ({
  type: actionTypes.STORE_CATEGORIES,
  data,
});

/**
 * Get List Categories
 */
export const getCategories = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CATEGORIES;

  return (dispatch) => {
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeCategories(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeSearchProducts = (data) => ({
  type: actionTypes.STORE_SEARCH_PRODUCTS,
  products: data.Product,
  categories: data.Category,
});

export const startSearchProducts = (data) => ({
  type: actionTypes.START_SEARCH_PRODUCTS,
  searchName: data.searchName,
});

/**
 * Get List Search Products
 */
export const getSearchProducts = (data) => {
  const URL =
    constant.URL_MASTER_PATH +
    constant.URL_GET_SEARCH_PRODUCT_AND_CATEGORY_BY_NAME;

  return (dispatch) => {
    dispatch(startSearchProducts(data));
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeSearchProducts(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeProduct = (data) => ({
  type: actionTypes.STORE_PRODUCT,
  product: data,
});

export const startProduct = () => ({
  type: actionTypes.START_PRODUCT,
});

export const failProduct = (data) => ({
  type: actionTypes.FAIL_PRODUCT,
  data,
});

/**
 * Get Product by uuid
 */
export const getProduct = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PRODUCT;

  return (dispatch) => {
    dispatch(startProduct());
    axios
      .get(URL + data.uuid)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeProduct(response.data.data));
        }
      })
      .catch((error) => {
        dispatch(failProduct(error));
      });
  };
};
