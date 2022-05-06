import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const storeGetSaldoMember = (data) => ({
  type: actionTypes.STORE_GET_SALDO_MEMBER,
  data,
});

export const getSaldoIns = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_BALANCE;
  return (dispatch) => {
    axios
      .get(`${URL}/in`, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
            saldoIns: response.data.data.MemberBalance,
          };
          dispatch(storeSaldo(dataSuccess));
        }
      })
      .catch((error) => {});
  };
};

export const getSaldoOuts = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_BALANCE;
  return (dispatch) => {
    axios
      .get(`${URL}/out`, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
            saldoOuts: response.data.data.MemberBalance,
          };
          dispatch(storeSaldo(dataSuccess));
        }
      })
      .catch((error) => {});
  };
};

export const postOTPTarikSaldo = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_OTP_TARIK_SALDO;
  return (dispatch) => {
    axios
      .post(`${URL}`, JSON.stringify(data))
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
          };
          dispatch(storeSaldo(dataSuccess));
        } else {
          const dataFailed = {
            loading: false,
          };
          dispatch(storeSaldo(dataFailed));
        }
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeSaldo(dataFailed));
      });
  };
};

export const postTarikSaldo = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_TARIK_SALDO;
  return (dispatch) => {
    const dataStart = {
      loading: true,
    };
    dispatch(storeSaldo(dataStart));
    axios
      .post(`${URL}`, JSON.stringify(data))
      .then((response) => {
        if (response.data.code === 200) {
          const dataSuccess = {
            loading: false,
            formSuccess: true,
          };
          dispatch(storeSaldo(dataSuccess));
        } else {
          const dataFailed = {
            loading: false,
            formError: response.data.message,
          };
          dispatch(storeSaldo(dataFailed));
        }
      })
      .catch((error) => {
        const dataFailed = {
          loading: false,
        };
        dispatch(storeSaldo(dataFailed));
      });
  };
};

export const storeSaldo = (data) => ({
  type: actionTypes.SALDO_STORE,
  data,
});

export const storeSearchSaldoDetail = (data) => ({
  type: actionTypes.STORE_SEARCH_SALDO_DETAIL,
  data,
});

export const startSearchSaldoDetail = () => ({
  type: actionTypes.START_SEARCH_SALDO_DETAIL,
});

export const getSearchSaldoDetail = (data) => {
  console.log(data);
  const params = {
    fromDate: data.fromDate,
    toDate: data.toDate,
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_BALANCE;

  return (dispatch) => {
    dispatch(startSearchSaldoDetail());
    axios
      .get(URL, {
        params,
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeSearchSaldoDetail(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeGetSaldoMemberOut = (data) => ({
  type: actionTypes.STORE_GET_SALDO_MEMBER_OUT,
  data,
});

export const storeSearchWithdrawSaldoDetail = (data) => ({
  type: actionTypes.STORE_SEARCH_WITHDRAW_SALDO_DETAIL,
  data,
});

export const startSearchWithdrawSaldoDetail = () => ({
  type: actionTypes.START_SEARCH_WITHDRAW_SALDO_DETAIL,
});

export const getSearchWithdrawSaldoDetail = (data) => {
  console.log(data);
  const params = {
    fromDate: data.fromDate,
    toDate: data.toDate,
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_BALANCE;

  return (dispatch) => {
    dispatch(startSearchWithdrawSaldoDetail());
    axios
      .get(URL, {
        params,
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeSearchWithdrawSaldoDetail(response.data.data));
        }
      })
      .catch((error) => {});
  };
};
