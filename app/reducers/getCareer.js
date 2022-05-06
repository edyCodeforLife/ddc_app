// start update profil
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  dataCareer: null,
  loading: false,
  formError: [],
  formSuccess: false,
};
const storeGetCareer = (state, action) =>
  updateObject(state, { dataCareer: action.data });

// end update 
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_GET_CAREER:
      return storeGetCareer(state, action);
    default:
      return state;
  }
};
export default reducer;
