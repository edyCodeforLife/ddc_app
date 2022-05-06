import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';

import * as actionTypes from './actionTypes';
import { infusionsoftApi } from './infusionsoft';
import constant from '../utils/configs/constant';

export const loginStart = () => ({
  type: actionTypes.LOGIN_START,
});

/**
 * Set Session if login success
 * @param {object} data
 * @param {string} token
 */
export const loginSuccess = (data, token) => {
  const decoded = jwt_decode(token);

  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', decoded.exp);
  localStorage.setItem('member', JSON.stringify(data));

  const memberTypeName = data.memberTypeName; // MnR, Reseller, TDS
  const memberLevelName = data.memberLevelName; // REGULER, UPRISING, TOP, PRIORITAS

  // Check if member's memberType get tier price
  let getTierPrice = constant.GET_TIER_PRICE.includes(memberTypeName);

  // Check if member's memberType get cheapest tier price
  let getCheapestTierPrice = constant.GET_CHEAPEST_TIER_PRICE.includes(
    memberTypeName
  );
  // Reseller Prioritas get cheapest tier price
  if (memberTypeName === 'Reseller' && memberLevelName === 'PRIORITAS') {
    getCheapestTierPrice = true;
  }
  // Reseller Top get cheapest tier price
  if (memberTypeName === 'Reseller' && memberLevelName === 'TOP') {
    getCheapestTierPrice = true;
  }

  // Member Non Reseller Trial get tier price
  if (data.memberTypeId === 1 && data.trial) {
    // console.log('Trial');
    getTierPrice = true;
  }

  return {
    type: actionTypes.LOGIN_SUCCESS,
    member: data,
    token,
    getTierPrice,
    getCheapestTierPrice,
  };
};

export const loginFail = (formError) => ({
  type: actionTypes.LOGIN_FAIL,
  formError,
});

/**
 * Do Logout
 */
export const logout = (data) => {
  console.log('Logout');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('member');

  if (data.enableReload) {
    console.log('Reload');
    window.location.reload();
  }

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

/**
 * Check authentication
 */
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(
      parseInt(localStorage.getItem('expirationDate'), 0) * 1000
    );
    console.log(`Token expired at ${expirationDate}`);

    if (expirationDate <= new Date()) {
      console.log('Access Denied');
      dispatch(logout());
    } else {
      // console.log('Access Granted');
      const member = JSON.parse(localStorage.getItem('member'));
      dispatch(loginSuccess(member, token));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};

/**
 * Check Token expired or not
 * @param {} expirationTime
 */
export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  // setTimeout(() => {
  //   console.log('Timeout');
  //   dispatch(logout());
  // }, expirationTime * 1000);
};

export const submitLogin = (data) => (dispatch) => {
  dispatch(loginStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_LOGIN;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        // Infusionsoft integration
        if (
          response.data.data.memberTypeId === 2 &&
          response.data.data.totalOrder < 3
        ) {
          // Only for New Reseller
          const member = {
            name: `${response.data.data.firstName} ${
              response.data.data.lastName
              }`,
            email: response.data.data.email,
          };
          infusionsoftApi(member, constant.INFUSIONSOFT.TAGS.NEW_RESELLER);
        }

        dispatch(getLoginInformation({ token: response.data.data.token }));
      } else {
        dispatch(loginFail(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(loginFail('Terjadi kesalahan, silahkan coba kembali.'));
    });
};

/**
 * Get Login Information with Token
 * @param {} data
 */
export const getLoginInformation = (data) => (dispatch) => {
  dispatch(loginStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_LOGIN;
  const config = {
    headers: { Authorization: data.token },
  };
  axios
    .get(URL, config)
    .then((response) => {
      if (response.data.data.status == "Banned" || response.data.data.status == "Locked"){
        dispatch(logout({enableReload : true}));
      }else if (response.data.code === 200){
        dispatch(loginSuccess(response.data.data, data.token));
      }else if (response.data.code === 401) {
        // Token Expired
        message.warning('Masa login anda telah habis. Silahkan login kembali.');
        dispatch(logout());
      } else {
        dispatch(loginFail(response.data.data.validation));
      }
    })
    .catch((error) => {
      // console.log(error);
      dispatch(loginFail('client-error'));
    });
};
