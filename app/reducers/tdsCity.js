import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  tdsNearby: null,
  loading: false,
  formSuccess: false,
  formError: false,
};
const getTdsProvinceStart = (state, action) =>
  updateObject(state, { tdsNearby: null });
const getTdsProvinceSuccess = (state, action) =>
  updateObject(state, { tdsNearby: action.data, formSuccess: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TDS_PROVINCE_START:
      return getTdsProvinceStart(state, action);
    case actionTypes.GET_TDS_PROVINCE_SUCCESS:
      return getTdsProvinceSuccess(state, action);

    default:
      return state;
  }
};
export default reducer;
