import axios from 'axios';
import { message } from 'antd';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * GET Cart
 */
export const getCarts = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CART;

  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeCart(dataStart));
    axios
      .get(URL)
      .then((response) => {
        const dataSuccess = {
          loading: false,
          carts: response.data.cartList,
          totalPrice: response.data.totalPrice,
          discountLabel: response.data.discountLabel,
          discountPrice: response.data.discountPrice,
        };
        dispatch(storeCart(dataSuccess));
        dispatch(getCartQuantity());
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * GET Cart by uuid
 */
export const getCartByUuid = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CART_DETAIL;

  return (dispatch) => {
    const dataStart = {
      loading: true,
      cart: null,
    };
    dispatch(storeCart(dataStart));
    axios
      .get(URL + data.uuid)
      .then((response) => {
        const dataSuccess = {
          loading: false,
          cart: response.data.cartList,
        };
        dispatch(storeCart(dataSuccess));
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * POST Cart
 * @param {*} data
 */
export const addToCart = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_CART;
  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeCart(dataStart));
    // console.log(JSON.stringify(data));
    axios
      .post(URL, JSON.stringify(data))
      .then((response) => {
        if (response.data.code === 200) {
          if (response.data.data.isOutOfStock === 1) {
            // If Product Out of Stock
            const dataFailed = {
              loading: false,
            };
            dispatch(storeCart(dataFailed));
            message.error('Stok tidak mencukupi.');
          } else {
            const dataSuccess = {
              loading: false,
              formSuccess: true,
            };
            dispatch(storeCart(dataSuccess));
          }
        }
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * PUT Cart
 * @param {*} data
 */
export const editCart = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_PUT_CART;
  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeCart(dataStart));
    // console.log(JSON.stringify(data));
    axios
      .put(URL + data.uuid, JSON.stringify(data))
      .then((response) => {
        if (response.data.code === 200) {
          if (response.data.data.isOutOfStock === 1) {
            // If Product Out of Stock
            const dataFailed = {
              loading: false,
            };
            dispatch(storeCart(dataFailed));
            message.error('Stok tidak mencukupi.');
          } else {
            const dataSuccess = {
              loading: false,
              formSuccess: true,
            };
            dispatch(storeCart(dataSuccess));
          }
        }
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * POST Custom Delivery
 * @param {*} data
 */
export const postCustomDelivery = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_CART_CUSTOM_DELIVERY;
  return (dispatch) => {
    // const dataStart = {
    //   loading: true,
    // };
    // dispatch(storeCart(dataStart));
    // console.log(JSON.stringify(data));
    axios
      .post(URL)
      .then((response) => {
        // if (response.data.code === 200) {
        //   if (response.data.data.isOutOfStock === 1) {
        //     // If Product Out of Stock
        //     const dataFailed = {
        //       loading: false,
        //     };
        //     dispatch(storeCart(dataFailed));
        //     message.error('Stok tidak mencukupi.');
        //   } else {
        //     const dataSuccess = {
        //       loading: false,
        //       formSuccess: true,
        //     };
        //     dispatch(storeCart(dataSuccess));
        //   }
        // }
      })
      .catch((error) => {
        // const dataFailed = {
        //   loading: false,
        // };
        // dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * GET Quantity in Cart
 */
export const getCartQuantity = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CART_QUANTITY;

  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeCart(dataStart));
    axios
      .get(URL)
      .then((response) => {
        const dataSuccess = {
          loading: false,
          cartQuantity: response.data.totalQuantity,
        };
        dispatch(storeCart(dataSuccess));
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * DELETE Cart
 * @param {*} data
 */
export const deleteCart = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_DELETE_CART;
  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeCart(dataStart));
    // console.log(JSON.stringify(data));
    axios
      .delete(URL + data.id)
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
            formSuccess: true,
          };
          dispatch(storeCart(dataSuccess));
        }
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeCart(dataFailed));
      });
  };
};

/**
 * Store Cart
 * @param {*} data
 */
export const storeCart = (data) => ({
  type: actionTypes.CART_STORE,
  data,
});
