import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  data: null,
  loading: false,
  formSuccess: false,
  formError: false,
};

const storeReviewTDS = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REVIEW_TDS_STORE:
      return storeReviewTDS(state, action);

    default:
      return state;
  }
};

export default reducer;
