import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  paymentMethods: null,
};

const storePaymentMethods = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYMENT_METHOD_STORE:
      return storePaymentMethods(state, action);

    default:
      return state;
  }
};

export default reducer;
