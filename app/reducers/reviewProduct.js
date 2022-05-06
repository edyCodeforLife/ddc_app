import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  formError: false,
};

const storeReviewProduct = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REVIEW_PRODUCT_STORE:
      return storeReviewProduct(state, action);

    default:
      return state;
  }
};

export default reducer;
