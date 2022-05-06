import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  payment: null,
  shipping:null,
};
const setPaymentMethod = (state, action) =>
  updateObject(state, {
    payment: action.payment,
  });

  const setShippingMethod = (state, action) =>
  updateObject(state, {
    shipping: action.shipping,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAYMENT_METHOD:
      return setPaymentMethod(state, action);
    case actionTypes.SET_SHIPPING_METHOD:
      return setShippingMethod(state, action);
    default:
      return state;
  }
};

export default reducer;
