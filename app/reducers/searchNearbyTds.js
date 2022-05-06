import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: [],
  formSuccess: false,
  tdsNearby: null,
};

// GET_TDS_NEARBY
const getTdsNearbyStart = (state, action) =>
  updateObject(state, { tdsNearby: null });

const getTdsNearbySuccess = (state, action) =>
  updateObject(state, { tdsNearby: action.data, formSuccess: true });
// GET_TDS_NEARBY
const getTdsNearbyReset = (state, action) =>
  updateObject(state, { formSuccess: false, loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TDS_NEARBY_RESET:
      return getTdsNearbyReset(state, action);
      case actionTypes.GET_TDS_NEARBY_START:
      return getTdsNearbyStart(state, action);
    case actionTypes.GET_TDS_NEARBY_SUCCESS:
      return getTdsNearbySuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
