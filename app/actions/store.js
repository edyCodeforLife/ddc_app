import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * Update status store
 */
export const postUpdateStatusStore = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeUpdateStatus(dataStart));
//   const URL = constant.URL_MASTER_PATH + constant.;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
          const dataSuccess = {
              formSuccess : true,
              loading:flase,
          };
          dispatch(storeUpdateStatus(dataSuccess));
        }
      }
    )
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storeUpdateStatus(dataError));
    });
};

export const storeUpdateStatus = (data) => ({
  type: actionTypes.STORE_UPDATE_STATUS,
  data,
});
