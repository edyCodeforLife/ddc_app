
import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getTdsCity = (data) => (dispatch) => {
  dispatch(getTdsProvinceStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_BRANCHES;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      const branches = [...response.data.data.TDS, ...response.data.data.Gudang];
      dispatch(getTdsProvinceSuccess(branches));
    })
    .catch((error) => {});
};

export const getTdsProvinceStart = () => ({
  type: actionTypes.GET_TDS_PROVINCE_START,
});

export const getTdsProvinceSuccess = (data) => ({
  type: actionTypes.GET_TDS_PROVINCE_SUCCESS,
  data,
});
