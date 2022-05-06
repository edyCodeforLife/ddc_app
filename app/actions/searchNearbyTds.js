import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getTdsNearby = (data) => (dispatch) => {
  dispatch(getTdsNearbyStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_BRANCHES;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      // const branches = [...response.data.data.TDS, response.data.data.Gudang];
      dispatch(getTdsNearbySuccess(response.data.data.TDS));
    })
    .catch((error) => {});
};

export const getTdsNearbyStart = () => ({
  type: actionTypes.GET_TDS_NEARBY_START,
});

export const getTdsNearbySuccess = (data) => ({
  type: actionTypes.GET_TDS_NEARBY_SUCCESS,
  data,
});

export const getTdsNearbyReset = () => ({
  type: actionTypes.GET_TDS_NEARBY_RESET,
});
