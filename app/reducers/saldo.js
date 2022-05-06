// start update profil
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: null,
  formSuccess: false,
  saldoIns: null,
  saldoOuts: null,
};
const storeGetSaldoMember = (state, action) =>
  updateObject(state, { saldoIn: action.data });

const storeSearchSaldoDetail = (state, action) =>
  updateObject(state, { saldoIn: action.data });

const startSearchSaldoDetail = (state, action) =>
  updateObject(state, { saldoIn: action.data, loading: true });

const startSearchWithdrawSaldoDetail = (state, action) =>
  updateObject(state, { saldoOut: action.data, loading: true });

const storeSearchWithdrawSaldoDetail = (state, action) =>
  updateObject(state, { saldoOut: action.data });

const storeGetSaldoMemberOut = (state, action) =>
  updateObject(state, { saldoOut: action.data });

const storeSaldo = (state, action) => updateObject(state, action.data);

// end update profil
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SEARCH_WITHDRAW_SALDO_DETAIL:
      return startSearchWithdrawSaldoDetail(state, action);
    case actionTypes.STORE_SEARCH_WITHDRAW_SALDO_DETAIL:
      return storeSearchWithdrawSaldoDetail(state, action);
    case actionTypes.STORE_GET_SALDO_MEMBER_OUT:
      return storeGetSaldoMemberOut(state, action);
    case actionTypes.STORE_GET_SALDO_MEMBER:
      return storeGetSaldoMember(state, action);
    case actionTypes.STORE_SEARCH_SALDO_DETAIL:
      return storeSearchSaldoDetail(state, action);
    case actionTypes.START_SEARCH_SALDO_DETAIL:
      return startSearchSaldoDetail(state, action);
    case actionTypes.SALDO_STORE:
      return storeSaldo(state, action);
    default:
      return state;
  }
};
export default reducer;
