import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  carts: [],
  cart: null,
  cartQuantity: 0,
  totalPrice: 0,
};

const storeCart = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_STORE:
      return storeCart(state, action);

    default:
      return state;
  }
};

export default reducer;
