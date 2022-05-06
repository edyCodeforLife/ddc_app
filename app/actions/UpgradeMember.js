import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const storeUpgradeMember = (data) => ({
  type: actionTypes.STORE_UPGRADE_MEMBER,
  data,
});

export const submitUpgradeMember = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeUpgradeMember(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_UPGRADE_MEMBER;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeUpgradeMember(dataSuccess));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storeUpgradeMember(dataError));
    });
};
