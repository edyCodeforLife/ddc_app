import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  formError: false,
  response: null,
  totalPrice: null,
};

const storePayment = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYMENT_STORE:
      return storePayment(state, action);

    default:
      return state;
  }
};

export default reducer;
