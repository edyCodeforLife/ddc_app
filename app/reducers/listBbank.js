// start update profil
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  formData:null,
  loading: false,
  formError: [],
  formSuccess: false,
};
const storeGetListBank = (state, action) =>
  updateObject(state, { formData: action.data });

// end update profil
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_GET_LIST_BANK:
      return storeGetListBank(state, action);
    default:
      return state;
  }
};
export default reducer;
