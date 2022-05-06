import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';
import { toggleCurtain } from './app';

/**
 * Submit Forgot Password
 */
export const submitForgotPassword = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_SUBMIT_FORGOT_PASSWORD;
  return (dispatch) => {
    axios
      .get(URL + data)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(submitForgotPasswordSuccess(response.data.data));
        } else {
          dispatch(submitForgotPasswordFail());
        }
      })
      .catch((error) => {
        dispatch(submitForgotPasswordFail(error));
      });
  };
};

export const submitForgotPasswordStart = () => ({
  type: actionTypes.SUBMIT_FORGOT_PASSWORD_START,
});

export const submitForgotPasswordSuccess = () => ({
  type: actionTypes.SUBMIT_FORGOT_PASSWORD_SUCCESS,
});

export const submitForgotPasswordFail = () => ({
  type: actionTypes.SUBMIT_FORGOT_PASSWORD_FAIL,
});

/**
 * Submit Reset Password
 */
export const submitResetPassword = (data, token) => (dispatch) => {
  dispatch(submitResetPasswordStart());
  const params = {
    password: data,
  };
  const config = {
    headers: { Authorization: token },
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_RESET_PASSWORD;
  axios
    .put(URL, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(submitResetPasswordSuccess(response));
        const curtainData = {
          show: true,
          title: 'Reset Password Success',
        };
        dispatch(toggleCurtain(curtainData));
      } else {
        dispatch(submitResetPasswordFail(response.data));
      }
    })
    .catch((error) => {
      dispatch(submitResetPasswordFail(error));
    });
};

export const submitResetPasswordStart = () => ({
  type: actionTypes.SUBMIT_RESET_PASSWORD_START,
});

export const submitResetPasswordSuccess = () => ({
  type: actionTypes.SUBMIT_RESET_PASSWORD_SUCCESS,
});

export const submitResetPasswordFail = () => ({
  type: actionTypes.SUBMIT_RESET_PASSWORD_FAIL,
});

export const storeResetPassword = (data) => ({
  type: actionTypes.RESET_PASSWORD_STORE,
  data,
});
