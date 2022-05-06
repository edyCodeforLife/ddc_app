// start update profil
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  data: null,
  loading: false,
  formError: [],
  formSuccess: false,
};
const storeReviewTDS = (state, action) =>
  updateObject(state, { data: action.data });

// end update
const resetReviewTdsStore = (state, action) =>
  updateObject(state, { loading: false });

const replyReviewTdsStore = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_REVIEW_TDS:
      return resetReviewTdsStore(state, action);
    case actionTypes.STORE_GET_REVIEW_TDS:
      return storeReviewTDS(state, action);
    case actionTypes.REPLY_REVIEW_TDS_STORE:
      return replyReviewTdsStore(state, action);
    default:
      return state;
  }
};
export default reducer;
