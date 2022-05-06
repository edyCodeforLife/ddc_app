import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getProvincesStart = () => ({
  type: actionTypes.GET_PROVINCES_START,
});

export const getProvincesSuccess = (data) => ({
  type: actionTypes.GET_PROVINCES_SUCCESS,
  provinces: data,
});

/**
 * Get List Provinces
 */
export const getProvinces = () => (dispatch) => {
  dispatch(getProvincesStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PROVINCES;
  axios
    .get(URL)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(getProvincesSuccess(response.data.data));
      }
    })
    .catch((error) => {});
};

export const getCitiesStart = () => ({
  type: actionTypes.GET_CITIES_START,
});

export const getCitiesSuccess = (data) => ({
  type: actionTypes.GET_CITIES_SUCCESS,
  cities: data,
});

/**
 * Get List Cities by provinceId
 */
export const getCities = (provinceId) => (dispatch) => {
  dispatch(getCitiesStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CITIES;
  axios
    .get(URL + provinceId)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(getCitiesSuccess(response.data.data));
      }
    })
    .catch((error) => {});
};

export const getDistrictsStart = () => ({
  type: actionTypes.GET_DISTRICTS_START,
});

export const getDistrictsSuccess = (data) => ({
  type: actionTypes.GET_DISTRICTS_SUCCESS,
  districts: data,
});

/**
 * Get List Districts by cityId
 */
export const getDistricts = (cityId) => (dispatch) => {
  dispatch(getDistrictsStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_DISTRICT;
  axios
    .get(URL + cityId)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(getDistrictsSuccess(response.data.data));
      }
    })
    .catch((error) => {});
};

export const getBranchesStart = () => ({
  type: actionTypes.GET_BRANCHES_START,
});

export const getBranchesSuccess = (data) => ({
  type: actionTypes.GET_BRANCHES_SUCCESS,
  branches: data,
});

/**
 * Get List Branches by cityId
 */
export const getBranches = (data) => (dispatch) => {
  dispatch(getBranchesStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_BRANCHES;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(getBranchesSuccess(response.data.data));
      }
    })
    .catch((error) => {});
};

/**
 * Submit Branch as Default Ambil Sendiri
 * @param {*} data
 */
export const submitDefaultBranchForAmbilSendiri = (data) => (dispatch) => {
  const URL =
    constant.URL_MASTER_PATH + constant.URL_POST_DEFAULT_BRANCH_AMBIL_SENDIRI;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        // Expecting nothing happen
      }
    })
    .catch((error) => {
      // Expecting nothing happen
    });
};

/**
 * Get Default Branch for Ambil Sendiri
 */
export const getDefaultBranchForAmbilSendiri = (memberUuid) => (dispatch) => {
  dispatch(getDefaultBranchForAmbilSendiriStart());
  const URL =
    constant.URL_MASTER_PATH + constant.URL_GET_DEFAULT_BRANCH_AMBIL_SENDIRI;
  axios
    .get(URL + memberUuid)
    .then((response) => {
      if (response.data.code === 200) {
        if (response.data.data.id !== 0) {
          dispatch(getDefaultBranchForAmbilSendiriSuccess(response.data.data));
        }
      }
    })
    .catch((error) => {});
};

export const getDefaultBranchForAmbilSendiriStart = () => ({
  type: actionTypes.GET_DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI_START,
});

export const getDefaultBranchForAmbilSendiriSuccess = (data) => ({
  type: actionTypes.GET_DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI_SUCCESS,
  branch: data,
});

export const removeDefaultBranchForAmbilSendiri = () => ({
  type: actionTypes.REMOVE_DEFAULT_BRANCHES_FOR_AMBIL_SENDIRI,
});

/**
 * Get List Branches Nearby
 */
export const getBranchesNearby = (data) => (dispatch) => {
  console.log(data);
  dispatch(getBranchesNearbyStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_BRANCHES_NEARBY;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      dispatch(getBranchesNearbySuccess(response.data));
    })
    .catch((error) => {});
};

export const getBranchesNearbyStart = () => ({
  type: actionTypes.GET_BRANCHES_NEARBY_START,
});

export const getBranchesNearbySuccess = (data) => ({
  type: actionTypes.GET_BRANCHES_NEARBY_SUCCESS,
  branchesNearby: data,
});

/**
 * Get List Shipping Cost
 */
export const getShippingCost = (data) => (dispatch) => {
  dispatch(getShippingCostStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ALL_SHIPPING_COST;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      dispatch(getShippingCostSuccess(response.data));
    })
    .catch((error) => {});
};

export const getShippingCostStart = () => ({
  type: actionTypes.GET_SHIPPING_COST_START,
});

export const getShippingCostSuccess = (data) => ({
  type: actionTypes.GET_SHIPPING_COST_SUCCESS,
  shippingCost: data.shippings,
});

/**
 * Get List Branch Free Shipping
 */
export const getBranchFreeShipping = (branchId) => (dispatch) => {
  dispatch(getBranchFreeShippingStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_BRANCH_FREE_SHIPPING;
  axios
    .get(URL + branchId)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(getBranchFreeShippingSuccess(response.data.data));
      }
    })
    .catch((error) => {});
};

export const getBranchFreeShippingStart = () => ({
  type: actionTypes.GET_BRANCH_FREE_SHIPPING_START,
});

export const getBranchFreeShippingSuccess = (data) => ({
  type: actionTypes.GET_BRANCH_FREE_SHIPPING_SUCCESS,
  branchFreeShipping: data,
});

/**
 * Get List Branch Recommendation
 */
export const getBranchRecommendation = (data) => (dispatch) => {
  dispatch(storeBranchRecommendation(null));
  let URL = null;
  if (data.buyFromTDS) {
    URL = constant.URL_MASTER_PATH + constant.URL_GET_TDS_RECOMMENDATION;
  } else {
    URL = constant.URL_MASTER_PATH + constant.URL_GET_BRANCH_RECOMMENDATION;
  }

  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      dispatch(storeBranchRecommendation(response.data));
    })
    .catch((error) => {});
};

export const storeBranchRecommendation = (data) => ({
  type: actionTypes.BRANCH_RECOMMENDATION_STORE,
  data,
});
