import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  form: null,
  loading: false,
  formError: [],
  formSuccess: false,
  referral: {
    loading: false,
    error: false,
    referralName: null,
  },
};

const registrationMemberNonResellerStart = (state, action) =>
  updateObject(state, { loading: true });

const registrationMemberNonResellerSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });

const registrationMemberNonResellerFail = (state, action) =>
  updateObject(state, { loading: false, formError: action.formError });

const checkReferralCodeStart = (state, action) =>
  updateObject(state, {
    referral: { loading: true, error: false, referralName: null },
  });

const checkReferralCodeSuccess = (state, action) =>
  updateObject(state, {
    referral: {
      loading: false,
      error: false,
      referralName: action.referralName,
    },
  });

const checkReferralCodeFail = (state, action) =>
  updateObject(state, {
    referral: { loading: false, error: true, referralName: null },
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRATION_MEMBER_NON_RESELLER_START:
      return registrationMemberNonResellerStart(state, action);
    case actionTypes.REGISTRATION_MEMBER_NON_RESELLER_SUCCESS:
      return registrationMemberNonResellerSuccess(state, action);
    case actionTypes.REGISTRATION_MEMBER_NON_RESELLER_FAIL:
      return registrationMemberNonResellerFail(state, action);

    case actionTypes.CHECK_REFERRAL_CODE_START:
      return checkReferralCodeStart(state, action);
    case actionTypes.CHECK_REFERRAL_CODE_SUCCESS:
      return checkReferralCodeSuccess(state, action);
    case actionTypes.CHECK_REFERRAL_CODE_FAIL:
      return checkReferralCodeFail(state, action);

    default:
      return state;
  }
};

export default reducer;
