import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  formError: false,
  response: null,
  renewal: null,
};

const storeRenewalByPoin = (state, action) => updateObject(state, action.data);

const storeRenewalTop = (state, action) => updateObject(state, action.data);

const storeRenewalTopReset = (state, action) =>
  updateObject(state, { renewal: { loading: false, formSuccess: false } });
const renewalSuccessReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RENEWAL_TOP:
      return storeRenewalTop(state, action);
    case actionTypes.STORE_RENEWAL_TOP_RESET:
      return storeRenewalTopReset(state, action);
    case actionTypes.RENEWAL_SUCCESS_RESET:
      return renewalSuccessReset(state, action);
    case actionTypes.STORE_RENEWALBY_POIN:
      return storeRenewalByPoin(state, action);

    default:
      return state;
  }
};

export default reducer;
