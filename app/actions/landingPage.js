import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const registrationFormStart = (form) => ({
  type: actionTypes.LANDING_PAGE_REGISTRATION_FORM_START,
  form,
});

export const registrationFormSuccess = () => ({
  type: actionTypes.LANDING_PAGE_REGISTRATION_FORM_SUCCESS,
});

export const registrationFormFail = (error) => ({
  type: actionTypes.LANDING_PAGE_REGISTRATION_FORM_FAIL,
  error,
});

export const submitRegistrationForm = (form) => (dispatch) => {
  dispatch(registrationFormStart(form));
  dispatch(registrationFormSuccess());
//   axios
//     .post('/orders.json', form)
//     .then((response) => {
//       dispatch(catalogDownloadFormSuccess());
//     })
//     .catch((error) => {
//       dispatch(catalogDownloadFormFail(error));
//     });
};
