import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: [],
  formSuccess: false,
  isAuthenticated: false,
  token: null,
  member: null,
  getTierPrice: false,
  getCheapestTierPrice: false,
};

const loginStart = (state, action) =>
  updateObject(state, {
    loading: true,
    formError: null,
    formSuccess: false,
  });

const loginSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    formSuccess: true,
    isAuthenticated: true,
    token: action.token,
    member: action.member,
    getTierPrice: action.getTierPrice,
    getCheapestTierPrice: action.getCheapestTierPrice,
  });

const loginFail = (state, action) =>
  updateObject(state, {
    loading: false,
    isAuthenticated: false,
    member: null,
    token: null,
    getTierPrice: null,
    getCheapestTierPrice: null,
    formError: action.formError,
  });

const logout = (state, action) =>
  updateObject(state, {
    token: null,
    formSuccess: false,
    isAuthenticated: false,
    member: null,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
