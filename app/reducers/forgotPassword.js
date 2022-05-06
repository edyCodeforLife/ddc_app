import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: false,
  formSuccess: false,
};

// Forgot Password
export const submitForgotPasswordStart = (state, action) =>
  updateObject(state, { loading: true });

export const submitForgotPasswordSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true, formError: false });

export const submitForgotPasswordFail = (state, action) =>
  updateObject(state, { formError: true, loading: false });

// Reset Password
export const submitResetPasswordStart = (state, action) =>
  updateObject(state, { loading: true, formError: false });

export const submitResetPasswordSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true, formError: false });

export const submitResetPasswordFail = (state, action) =>
  updateObject(state, { formError: true, loading: false });

const storeResetPassword = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Forgot Password
    case actionTypes.SUBMIT_FORGOT_PASSWORD_START:
      return submitForgotPasswordStart(state, action);
    case actionTypes.SUBMIT_FORGOT_PASSWORD_SUCCESS:
      return submitForgotPasswordSuccess(state, action);
    case actionTypes.SUBMIT_FORGOT_PASSWORD_FAIL:
      return submitForgotPasswordFail(state, action);
    case actionTypes.RESET_PASSWORD_STORE:
      return storeResetPassword(state, action);

    // Reset Password
    case actionTypes.SUBMIT_RESET_PASSWORD_START:
      return submitResetPasswordStart(state, action);
    case actionTypes.SUBMIT_RESET_PASSWORD_SUCCESS:
      return submitResetPasswordSuccess(state, action);
    case actionTypes.SUBMIT_RESET_PASSWORD_FAIL:
      return submitResetPasswordFail(state, action);

    default:
      return state;
  }
};
export default reducer;
