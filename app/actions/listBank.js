import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const storeGetListBank = (data) => ({
  type: actionTypes.STORE_GET_LIST_BANK,
  data,
});

export const getListBank = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_LIST_BANK;
  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data);
          dispatch(storeGetListBank(response.data.data));
        }
      })
      .catch((error) => {});
  };
};
