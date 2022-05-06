import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  originBranch: null,
  order: {
    orderQuantity: 1,
  },
};

const storePurchaseProduct = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_PRODUCT_STORE:
      return storePurchaseProduct(state, action);

    default:
      return state;
  }
};

export default reducer;
