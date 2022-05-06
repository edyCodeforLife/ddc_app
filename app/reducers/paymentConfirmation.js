import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
};

const storePaymentConfirmation = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYMENT_CONFIRMATION_STORE:
      return storePaymentConfirmation(state, action);

    default:
      return state;
  }
};

export default reducer;
