import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * Get Wishlist
 */
export const getWishlist = () => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeWishlist(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_WISHLIST;
  axios
    .get(URL)
    .then((response) => {
      if (response.data.code === 200) {
        // Success
        const dataSuccess = {
          loading: false,
          wishlist: response.data.data,
          wishlistCount: response.data.data.length,
        };
        dispatch(storeWishlist(dataSuccess));
      }
    })
    .catch((error) => {});
};

/**
 * Get Wishlists
 */
export const getWishlists = () => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeWishlist(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_WISHLISTS;
  axios
    .get(URL)
    .then((response) => {
      if (response.data.code === 200) {
        // Success
        const dataSuccess = {
          loading: false,
          products: response.data.data,
        };
        dispatch(storeWishlist(dataSuccess));
      }
    })
    .catch((error) => {});
};

export const storeWishlist = (data) => ({
  type: actionTypes.WISHLIST_STORE,
  data,
});

/**
 * Add and Remove Wishlist
 * @param {*} data
 */
export const addToWishlist = (data, wishlist) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_WISHLIST;
  return (dispatch) => {
    axios
      .post(URL, JSON.stringify(data))
      .then((response) => {
        if (response.data.code === 200) {
          if (response.data.data === 'Insert success') {
            // Add to wishlist
            // console.log('Add');

            if (wishlist) {
              wishlist.push({ productId: data.productId });
            } else {
              wishlist = [{ productId: data.productId }];
            }
          } else if (response.data.data === 'Deleted success') {
            // Remove from wishlist
            // console.log('Delete');
            const productIndex = wishlist.findIndex(
              (product) => product.productId === data.productId
            );
            // console.log(productIndex);
            wishlist.splice(productIndex, 1);
          }
          const dataSuccess = {
            wishlist,
            wishlistCount: wishlist.length,
          };
          // console.log(dataSuccess);
          dispatch(storeWishlist(dataSuccess));
        }
      })
      .catch((error) => {});
  };
};
