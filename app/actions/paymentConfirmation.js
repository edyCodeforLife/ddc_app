import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * POST Payment Confirmation
 */
export const postPaymentConfirmation = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storePaymentConfirmation(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_PAYMENT_CONFIRMATION;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        // Success without upload
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storePaymentConfirmation(dataSuccess));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storePaymentConfirmation(dataError));
    });
};

/**
 * Upload Payment Confirmation
 */
export const uploadPaymentConfirmation = (upload, id) => (dispatch) => {
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL =
    constant.URL_MASTER_PUBLIC_PATH +
    constant.URL_POST_PAYMENT_CONFIRMATION_IMAGE;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(URL + id, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        formSuccess: true,
      };
      dispatch(storePaymentConfirmation(dataSuccess));
    })
    .catch((error) => {});
};

export const storePaymentConfirmation = (data) => ({
  type: actionTypes.PAYMENT_CONFIRMATION_STORE,
  data,
});
