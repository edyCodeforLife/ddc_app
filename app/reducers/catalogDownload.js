import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  form: null,
  formSuccess: false,
  formError: false,
};

const catalogDownloadStart = (state, action) =>
  updateObject(state, { form: action.form, loading: true, formError: false });

const catalogDownloadSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    formSuccess: true,
    formError: false,
  });

const catalogDownloadFail = (state, action) =>
  updateObject(state, { loading: false, formError: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DOWNLOAD_CATALOG_FORM_START:
      return catalogDownloadStart(state, action);
    case actionTypes.DOWNLOAD_CATALOG_FORM_SUCCESS:
      return catalogDownloadSuccess(state, action);
    case actionTypes.DOWNLOAD_CATALOG_FORM_FAIL:
      return catalogDownloadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
