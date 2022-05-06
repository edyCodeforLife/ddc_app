import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  shipping:null,
};

  const setShippingMethod = (state, action) =>
  updateObject(state, {
    courier: action.courier,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHIPPING_METHOD:
      return setShippingMethod(state, action);
    default:
      return state;
  }
};

export default reducer;
