import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
};

const storeUpgradeMember = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_UPGRADE_MEMBER:
      return storeUpgradeMember(state, action);

    default:
      return state;
  }
};

export default reducer;
