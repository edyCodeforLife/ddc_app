import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';
import { getLoginInformation } from './authentication';

export const storeRegistrationSimpleForm = (formData) => ({
  type: actionTypes.STORE_REGISTRATION_SIMPLE_FORM,
  formData: {
    // firstName: formData.name.substr(0, formData.name.indexOf(' ')),
    // lastName: formData.name.substr(formData.name.indexOf(' ') + 1),
    name: formData.name,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
  },
  showFormStep: true,
  activeFormStep: 0,
});

export const setDataProvince = (provinces) => ({
  type: actionTypes.SET_DATA_PROVINCE,
  provinces,
});

export const setDataCity = (city) => ({
  type: actionTypes.SET_DATA_CITY,
  city,
});

export const setDataDistrict = (district) => ({
  type: actionTypes.SET_DATA_DISTRICT,
  district,
});

export const storeRegistrationStep1 = (formData) => ({
  type: actionTypes.STORE_REGISTRATION_STEP1,
  formData,
  showFormStep: true,
  activeFormStep: 1,
});

export const storeRegistrationStep2 = (formData) => ({
  type: actionTypes.STORE_REGISTRATION_STEP2,
  formData: {
    address: formData.address,
    provinceId: formData.provinceId,
    cityId: formData.cityId,
    districtId: formData.districtId,
    postalCode: formData.postalCode,
  },
  showFormStep: true,
  activeFormStep: 2,
});

export const storeRegistrationStep3 = (formData) => ({
  type: actionTypes.STORE_REGISTRATION_STEP3,
  formData: {
    productId: formData.productId,
  },
  showFormStep: true,
  activeFormStep: 2,
});

export const registrationMemberResellerStart = () => ({
  type: actionTypes.REGISTRATION_MEMBER_RESELLER_START,
});

export const registrationMemberResellerSuccess = (data) => ({
  type: actionTypes.REGISTRATION_MEMBER_RESELLER_SUCCESS,
  token: data.token,
});

export const registrationMemberResellerFail = (formError) => ({
  type: actionTypes.REGISTRATION_MEMBER_RESELLER_FAIL,
  formError,
});

export const submitRegistrationMemberReseller = (data) => (dispatch) => {
  // console.log(data);
  dispatch(registrationMemberResellerStart());
  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
    address: data.address,
    provinceId: data.provinceId,
    cityId: data.cityId,
    districtId: data.districtId,
    postalCode: data.postalCode,
    productId: data.productId,
    referralCode: data.referralCode,
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_REGISTER_RESELLER;
  axios
    .post(URL, JSON.stringify(formData))
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(registrationMemberResellerSuccess(response.data.data));
        dispatch(getLoginInformation({ token: response.data.data.token }));
        // const curtainData = {
        //   show: true,
        //   title: 'Registration Member Reseller Success',
        // };
        // dispatch(actions.toggleCurtain(curtainData));
      } else {
        dispatch(registrationMemberResellerFail(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(registrationMemberResellerFail(error));
    });
};

// update profil

export const getDataProvince = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PROVINCE;

  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(setDataProvince(response.data.data));
        }
      })
      .catch((error) => error);
  };
};

export const getDataCity = (id) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_CITY;
  const params = {
    id,
  };
  return (dispatch) => {
    axios
      .get(URL + id)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(setDataCity(response.data.data));
        }
      })
      .catch((error) => error);
  };
};

export const getDataDistrict = (id) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_DISTRICT;
  const params = {
    id,
  };
  return (dispatch) => {
    axios
      .get(URL + id)
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(setDataDistrict(response.data.data));
        }
      })
      .catch((error) => error);
  };
};

export const staterKitProductsStart = () => ({
  type: actionTypes.STATER_KIT_PRODUCTS_START,
});

export const staterKitProductsSuccess = (data) => ({
  type: actionTypes.STATER_KIT_PRODUCTS_SUCCESS,
  starterKitProducts: data,
});


/**
 * Get List Starter Kit Products
 */
export const getStaterKitProducts = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_PRODUCTS;

  return (dispatch) => {
    dispatch(staterKitProductsStart());
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(staterKitProductsSuccess(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeRegistrationReseller = (data) => ({
  type: actionTypes.REGISTRATION_RESELLER_STORE,
  data,
});
