import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  toolbar: {
    title: null,
    hideBackButton: false,
    hideBurgerMenu: false,
    showCart: false,
    showWishlist: false,
    showProfile: false,
    showAddAddress: false,
    icon: 'arrow-left',
  },
  footer: {
    showFooter: true,
  },
  curtain: {
    show: false,
    title: 'Urutkan',
  },
  homePageContent: { loading: true, data: {} },
  memberCount: 100000,
};

const setToolbarState = (state, action) =>
  updateObject(state, {
    toolbar: {
      title: action.title,
      showWishlist: action.showWishlist,
      showCart: action.showCart,
      showProfile: action.showProfile,
      showAddAddress: action.showAddAddress,
      hideBurgerMenu: action.hideBurgerMenu,
      hideBackButton: action.hideBackButton,
      icon: action.icon ? action.icon : 'arrow-left',
    },
    footer: {
      showFooter: action.showFooter,
    },
  });

const setCurtainState = (state, action) =>
  updateObject(state, {
    curtain: {
      show: action.show,
      title: action.title,
    },
  });

// Change HomePage Redux State
const storeHomePageContent = (state, action) =>
  updateObject(state, {
    homePageContent: {
      loading: action.loading,
      data: action.data,
    },
  });

const storeMemberCount = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_SET_TOOLBAR_STATE:
      return setToolbarState(state, action);
    case actionTypes.APP_SET_CURTAIN_STATE:
      return setCurtainState(state, action);
    case actionTypes.HOMEPAGE_STORE:
      return storeHomePageContent(state, action);
    case actionTypes.LANDING_PAGE_COUNT_NUMBER:
      return storeMemberCount(state, action);
    default:
      return state;
  }
};

export default reducer;
