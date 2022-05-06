import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * POST Request TARIK SALDO
 */
export const requestTarikSaldo = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeRequestTarikSaldo(dataStart));
  const params = {
    balance: parseInt(data.balance, 0),
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_TARIK_SALDO;
  axios
    .post(URL, JSON.stringify(params))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formError: false,
          formSuccess: true,

        };
        dispatch(storeRequestTarikSaldo(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formSuccess: false,
          formError: true,
          
        };
        dispatch(storeRequestTarikSaldo(dataError));
      }
      dispatch(storeRequestTarikSaldo(response.data.data));
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeRequestTarikSaldo(dataError));
    });
};

export const storeRequestTarikSaldo = (data) => ({
  type: actionTypes.STORE_REQUEST_TARIK_SALDO,
  data,
});

export const storeRequestTarikSaldoReset = () => ({
  type: actionTypes.STORE_REQUEST_TARIK_SALDO_RESET,
});
