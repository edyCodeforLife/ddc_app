import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const setToolbarState = (data) => ({
  type: actionTypes.APP_SET_TOOLBAR_STATE,
  title: data.title,
  hideBackButton: data.hideBackButton,
  hideBurgerMenu: data.hideBurgerMenu,
  showWishlist: data.showWishlist,
  showCart: data.showCart,
  showProfile: data.showProfile,
  showFooter: data.showFooter,
  showAddAddress: data.showAddAddress,
  icon: data.icon,
});

export const toggleCurtain = (data) => ({
  type: actionTypes.APP_SET_CURTAIN_STATE,
  show: data.show,
  title: data.title,
});

/**
 * Get HomePage Content
 */
export const getHomePageContent = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeHomePageContent(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_HOMEPAGE_CONTENT;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      // Success
      const dataSuccess = {
        loading: false,
        data: response.data,
      };
      dispatch(storeHomePageContent(dataSuccess));
    })
    .catch((error) => {});
};

export const storeHomePageContent = (data) => ({
  type: actionTypes.HOMEPAGE_STORE,
  loading: data.loading,
  data: data.data,
});

export const getMemberCount = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_COUNT_MEMBER;
  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeMemberCount({ memberCount: response.data.data }));
        }
      })
      .catch((error) => {});
  };
};

export const storeMemberCount = (data) => ({
  type: actionTypes.LANDING_PAGE_COUNT_NUMBER,
  data,
});
