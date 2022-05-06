import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  form: null,
  loading: false,
  formError: [],
  formSuccess: false,
  provinces: [],
  cities: [],
  branches: { Gudang: [], TDS: [] },
  branchesNearby: null,
  branchFreeShipping: null,
  shippingCost: null,
  defaultBranchForAmbilSendiri: {
    setDefault: false,
    branch: null,
  },
  branchRecommendation: {},
};

const getProvincesStart = (state, action) =>
  updateObject(state, { provinces: null });

const getProvincesSuccess = (state, action) =>
  updateObject(state, { provinces: action.provinces });

const getCitiesStart = (state, action) => updateObject(state, { cities: null });

const getCitiesSuccess = (state, action) =>
  updateObject(state, { cities: action.cities });

const getDistrictsStart = (state, action) =>
  updateObject(state, { districts: null });

const getDistrictsSuccess = (state, action) =>
  updateObject(state, { districts: action.districts });

const getBranchesStart = (state, action) =>
  updateObject(state, { branches: null });

const getBranchesSuccess = (state, action) =>
  updateObject(state, { branches: action.branches });

// GET_BRANCHES_NEARBY
const getBranchesNearbyStart = (state, action) =>
  updateObject(state, { branchesNearby: null });

const getBranchesNearbySuccess = (state, action) =>
  updateObject(state, { branchesNearby: action.branchesNearby });

// DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI
const getDefaultBranchForAmbilSendiriStart = (state, action) =>
  updateObject(state, {
    defaultBranchForAmbilSendiri: {
      setDefault: false,
    },
  });

const getDefaultBranchForAmbilSendiriSuccess = (state, action) =>
  updateObject(state, {
    defaultBranchForAmbilSendiri: {
      setDefault: action.branch.setDefault,
      branch: action.branch,
    },
  });

const removeDefaultBranchForAmbilSendiri = (state, action) =>
  updateObject(state, {
    defaultBranchForAmbilSendiri: {
      setDefault: false,
      branch: null,
    },
  });

// GET_BRANCHES_NEARBY
const getShippingCostStart = (state, action) =>
  updateObject(state, { shippingCost: null });

const getShippingCostSuccess = (state, action) =>
  updateObject(state, { shippingCost: action.shippingCost });

// Get Branch Free Shipping
const getBranchFreeShippingStart = (state, action) =>
  updateObject(state, { branchFreeShipping: null });

const getBranchFreeShippingSuccess = (state, action) =>
  updateObject(state, { branchFreeShipping: action.branchFreeShipping });

// Change Branch Recommendation Redux State
const storeBranchRecommendation = (state, action) =>
  updateObject(state, { branchRecommendation: action.data });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROVINCES_START:
      return getProvincesStart(state, action);
    case actionTypes.GET_PROVINCES_SUCCESS:
      return getProvincesSuccess(state, action);

    case actionTypes.GET_CITIES_START:
      return getCitiesStart(state, action);
    case actionTypes.GET_CITIES_SUCCESS:
      return getCitiesSuccess(state, action);

    case actionTypes.GET_DISTRICTS_START:
      return getDistrictsStart(state, action);
    case actionTypes.GET_DISTRICTS_SUCCESS:
      return getDistrictsSuccess(state, action);

    case actionTypes.GET_BRANCHES_START:
      return getBranchesStart(state, action);
    case actionTypes.GET_BRANCHES_SUCCESS:
      return getBranchesSuccess(state, action);

    case actionTypes.GET_BRANCHES_NEARBY_START:
      return getBranchesNearbyStart(state, action);
    case actionTypes.GET_BRANCHES_NEARBY_SUCCESS:
      return getBranchesNearbySuccess(state, action);

    case actionTypes.GET_DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI_START:
      return getDefaultBranchForAmbilSendiriStart(state, action);
    case actionTypes.GET_DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI_SUCCESS:
      return getDefaultBranchForAmbilSendiriSuccess(state, action);
    case actionTypes.REMOVE_DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI:
      return removeDefaultBranchForAmbilSendiri(state, action);

    case actionTypes.GET_SHIPPING_COST_START:
      return getShippingCostStart(state, action);
    case actionTypes.GET_SHIPPING_COST_SUCCESS:
      return getShippingCostSuccess(state, action);

    case actionTypes.GET_BRANCH_FREE_SHIPPING_START:
      return getBranchFreeShippingStart(state, action);
    case actionTypes.GET_BRANCH_FREE_SHIPPING_SUCCESS:
      return getBranchFreeShippingSuccess(state, action);

    case actionTypes.BRANCH_RECOMMENDATION_STORE:
      return storeBranchRecommendation(state, action);

    default:
      return state;
  }
};

export default reducer;
