import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  dataProvince: null,
  dataCity: null,
  dataDistrict: null,
  formData: null,
  showFormStep: false,
  activeFormStep: 0,
  loading: false,
  formError: [],
  formSuccess: false,
  token: null,
  starterKitProducts: [],
};

const setDataProvince = (state, action) =>
  updateObject(state, {
    dataProvince: action.provinces,
  });

const setDataCity = (state, action) =>
  updateObject(state, {
    dataCity: action.city,
  });

const setDataDistrict = (state, action) =>
  updateObject(state, {
    dataDistrict: action.district,
  });

const storeRegistrationSimpleForm = (state, action) =>
  updateObject(state, {
    formData: action.formData,
    showFormStep: action.showFormStep,
    activeFormStep: action.activeFormStep,
  });
// const storeRegistrationStep1 = (state, action) =>
//   updateObject(state, {
//     formData: action.formData,
//     activeFormStep: action.activeFormStep,
//   });

const storeRegistrationStep1 = (state, action) => ({
  ...state,
  formData: Object.assign(state.formData, action.formData),
  activeFormStep: action.activeFormStep,
});

const storeRegistrationStep2 = (state, action) => ({
  ...state,
  formData: Object.assign(state.formData, action.formData),
  activeFormStep: action.activeFormStep,
});

const storeRegistrationStep3 = (state, action) => ({
  ...state,
  formData: Object.assign(state.formData, action.formData),
  activeFormStep: action.activeFormStep,
  formSuccess: true,
});

const registrationMemberResellerStart = (state, action) =>
  updateObject(state, { loading: true });

const registrationMemberResellerSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    formSuccess: true,
    token: action.token,
  });

const registrationMemberResellerFail = (state, action) =>
  updateObject(state, {
    formError: action.formError,
    loading: false,
    activeFormStep: 0,
  });

const staterKitProductsStart = (state, action) =>
  updateObject(state, { starterKitProducts: null });

const staterKitProductsSuccess = (state, action) =>
  updateObject(state, { starterKitProducts: action.starterKitProducts });

const storeRegistrationReseller = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRATION_RESELLER_STORE:
      return storeRegistrationReseller(state, action);

    case actionTypes.STORE_REGISTRATION_SIMPLE_FORM:
      return storeRegistrationSimpleForm(state, action);
    case actionTypes.STORE_REGISTRATION_STEP1:
      return storeRegistrationStep1(state, action);
    case actionTypes.STORE_REGISTRATION_STEP2:
      return storeRegistrationStep2(state, action);
    case actionTypes.STORE_REGISTRATION_STEP3:
      return storeRegistrationStep3(state, action);

    case actionTypes.REGISTRATION_MEMBER_RESELLER_START:
      return registrationMemberResellerStart(state, action);
    case actionTypes.REGISTRATION_MEMBER_RESELLER_SUCCESS:
      return registrationMemberResellerSuccess(state, action);
    case actionTypes.REGISTRATION_MEMBER_RESELLER_FAIL:
      return registrationMemberResellerFail(state, action);

    case actionTypes.SET_DATA_PROVINCE:
      return setDataProvince(state, action);
    case actionTypes.SET_DATA_CITY:
      return setDataCity(state, action);
    case actionTypes.SET_DATA_DISTRICT:
      return setDataDistrict(state, action);

    case actionTypes.STATER_KIT_PRODUCTS_START:
      return staterKitProductsStart(state, action);
    case actionTypes.STATER_KIT_PRODUCTS_SUCCESS:
      return staterKitProductsSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
