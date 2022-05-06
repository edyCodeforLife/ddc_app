import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: false,
  formSuccess: false,
  memberAktif: null,
};

const checkMemberAktifStart = (state, action) =>
  updateObject(state, { memberAktif: null, loading: true });

const checkMemberAktifReset = (state, action) =>
  updateObject(state, { formSuccess: false, loading: false });

const checkMemberAktifSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    formError: false,
    formSuccess: true,
    memberAktif: action.data,
  });

const checkMemberAktifbyEmailStart = (state, action) =>
  updateObject(state, { memberAktif: null });

const checkMemberAktifbyEmailReset = (state, action) =>
  updateObject(state, { formSuccess: false, loading: false });

const checkMemberAktifbyEmailSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    formError: false,
    formSuccess: true,
    memberAktif: action.data,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_MEMBER_AKTIF_START:
      return checkMemberAktifStart(state, action);
    case actionTypes.CHECK_MEMBER_AKTIF_SUCCESS:
      return checkMemberAktifSuccess(state, action);
    case actionTypes.CHECK_MEMBER_AKTIF_RESET:
      return checkMemberAktifReset(state, action);

    case actionTypes.CHECK_MEMBER_AKTIFBY_EMAIL_START:
      return checkMemberAktifbyEmailStart(state, action);
    case actionTypes.CHECK_MEMBER_AKTIFBY_EMAIL_SUCCESS:
      return checkMemberAktifbyEmailSuccess(state, action);
    case actionTypes.CHECK_MEMBER_AKTIFBY_EMAIL_RESET:
      return checkMemberAktifbyEmailReset(state, action);
    default:
      return state;
  }
};

export default reducer;
