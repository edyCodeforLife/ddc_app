import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
};

const storeUpdateStatus = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_UPDATE_STATUS:
      return storeUpdateStatus(state, action);

    default:
      return state;
  }
};

export default reducer;
