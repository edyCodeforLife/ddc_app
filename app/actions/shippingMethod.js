import axios from 'axios';
import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const setPaymentMethod = (payment) => ({
  type: actionTypes.SET_PAYMENT_METHOD,
  payment,
});

export const setShippingMethod = (shipping) => ({
    type: actionTypes.SET_SHIPPING_METHOD,
    shipping,
  });

export const getPaymentMethod = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PAYMENT_METHOD;
  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          const result = response.data.data;
          dispatch(setPaymentMethod(response.data.data));
        }

      })
      .catch((error) => error);
  };
};


export const getShippingMethod = () => {
    const URL = constant.URL_MASTER_PATH + constant.URL_GET_SHIPPING_METHOD;
    return (dispatch) => {
      axios
        .get(URL)
        .then((response) => {
          if (response.data.code === 200) {
            const result = response.data.data;
            dispatch(setShippingMethod(response.data.data));
          }
  
        })
        .catch((error) => error);
    };
  };

