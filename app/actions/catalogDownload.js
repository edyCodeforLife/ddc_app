import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const catalogDownloadFormStart = (form) => ({
  type: actionTypes.DOWNLOAD_CATALOG_FORM_START,
  form,
});

export const catalogDownloadFormSuccess = () => ({
  type: actionTypes.DOWNLOAD_CATALOG_FORM_SUCCESS,
});

export const catalogDownloadFormFail = (error) => ({
  type: actionTypes.DOWNLOAD_CATALOG_FORM_FAIL,
  error,
});

export const submitCatalogDownloadForm = (form) => (dispatch) => {
  dispatch(catalogDownloadFormStart(form));
  const data = {
    fullName: form.fullName,
    email: form.email,
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_DOWNLOAD_CATALOG;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(catalogDownloadFormSuccess(response));
      } else {
        dispatch(catalogDownloadFormFail(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(catalogDownloadFormFail(error));
    });
};
