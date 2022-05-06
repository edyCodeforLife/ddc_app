import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';


export const storeGetCareer = (data) => ({
  type: actionTypes.STORE_GET_CAREER,
  data,
});

export const getCareer = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CAREER;
  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(storeGetCareer(response.data.data));
        }
      })
      .catch((error) => {});
  };
};
