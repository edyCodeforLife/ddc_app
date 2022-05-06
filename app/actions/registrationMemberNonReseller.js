import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';
import { toggleCurtain } from './app';

export const registrationMemberNonResellerStart = () => ({
  type: actionTypes.REGISTRATION_MEMBER_NON_RESELLER_START,
});

export const registrationMemberNonResellerSuccess = () => ({
  type: actionTypes.REGISTRATION_MEMBER_NON_RESELLER_SUCCESS,
});

export const registrationMemberNonResellerFail = (formError) => ({
  type: actionTypes.REGISTRATION_MEMBER_NON_RESELLER_FAIL,
  formError,
});

export const submitRegistrationMemberNonReseller = (data) => (dispatch) => {
  dispatch(registrationMemberNonResellerStart());
  const URL =
    constant.URL_MASTER_PATH + constant.URL_POST_REGISTER_NON_RESELLER;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(registrationMemberNonResellerSuccess(response));
        const curtainData = {
          show: true,
          title: 'Registration Member Non Reseller Success',
        };
        dispatch(toggleCurtain(curtainData));
      } else {
        dispatch(registrationMemberNonResellerFail(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(registrationMemberNonResellerFail(error));
    });
};

export const checkReferralCodeStart = () => ({
  type: actionTypes.CHECK_REFERRAL_CODE_START,
});

export const checkReferralCodeSuccess = (data) => ({
  type: actionTypes.CHECK_REFERRAL_CODE_SUCCESS,
  referralName: `${data.firstName} ${data.lastName}`,
});

export const checkReferralCodeFail = (data) => ({
  type: actionTypes.CHECK_REFERRAL_CODE_FAIL,
  data,
});

export const checkReferralCode = (referralCode) => (dispatch) => {
  dispatch(checkReferralCodeStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_REFERAL_CODE;
  axios
    .get(URL + referralCode)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(checkReferralCodeSuccess(response.data.data));
      } else {
        dispatch(checkReferralCodeFail(response.data.data));
      }
    })
    .catch((error) => {
      // dispatch(registrationMemberNonResellerFail(error));
    });
};
