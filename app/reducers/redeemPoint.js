import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  formError: null,
  products: null,
  histories: null,
};

const storeRedeemPoint = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REDEEM_POINT_STORE:
      return storeRedeemPoint(state, action);

    default:
      return state;
  }
};

export default reducer;
