import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  formError: false,
};

const storeRequestTarikSaldo = (state, action) =>
  updateObject(state, action.data);

const storeRequestTarikSaldoReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false, formError: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_REQUEST_TARIK_SALDO:
      return storeRequestTarikSaldo(state, action);
    case actionTypes.STORE_REQUEST_TARIK_SALDO_RESET:
      return storeRequestTarikSaldoReset(state, action);

    default:
      return state;
  }
};

export default reducer;
