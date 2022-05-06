/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';

import appReducer from './reducers/app';
import landingPageReducer from './reducers/landingPage';
import trendingCategoryReducer from './reducers/trendingCategory';
import catalogDownloadReducer from './reducers/catalogDownload';
import registrationMemberNonResellerReducer from './reducers/registrationMemberNonReseller';
import registrationMemberResellerReducer from './reducers/registrationMemberReseller';
import authenticationReducer from './reducers/authentication';
import productReducer from './reducers/product';
import orderReducer from './reducers/order';
import forgotPasswordReducer from './reducers/forgotPassword';
import wishlistReducer from './reducers/wishlist';
import editProfil from './reducers/updateProfil';
import cartReducer from './reducers/cart';
import paymentMethodReducer from './reducers/paymentMethod';
import paymentConfirmationReducer from './reducers/paymentConfirmation';
import paymentReducer from './reducers/payment';
import requestTDSReducer from './reducers/requestTDS';
import reviewProductReducer from './reducers/reviewProduct';
import transactionReducer from './reducers/transaction';
import listBank from './reducers/listBbank';
import statusStore from './reducers/store';
import saldoReducer from './reducers/saldo';
import tarikSaldo from './reducers/tarikSaldo';
import searchTds from './reducers/searchNearbyTds';
import shipping from './reducers/ShippingMethod';
import SearchMemberAktif from './reducers/checkMemberAktif';
import detailArticle from './reducers/detailArticle';
import listArticleComment from './reducers/getCommentArticle';
import redeemPointReducer from './reducers/redeemPoint';
import career from './reducers/getCareer';
import renewal from './reducers/orderRenewal';
import reviewTDSReducer from './reducers/reviewTDS';
import productsSerupa from './reducers/productSerupa';
import tdsReviewComment from './reducers/tdsReview';
import uploadReducer from './reducers/upload';
import listTdsCity from './reducers/tdsCity';
import purchaseProductReducer from './reducers/purchaseProduct';
import articleReducer from './reducers/article';
import articleCategoryReducer from './reducers/articleCategory';
import getArticlesHomePage  from './reducers/articleHomePage';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    app: appReducer,
    landingPage: landingPageReducer,
    trendingCategory: trendingCategoryReducer,
    catalogDownload: catalogDownloadReducer,
    registrationMemberNonReseller: registrationMemberNonResellerReducer,
    registrationMemberReseller: registrationMemberResellerReducer,
    authentication: authenticationReducer,
    product: productReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    wishlist: wishlistReducer,
    paymentMethod: paymentMethodReducer,
    paymentConfirmation: paymentConfirmationReducer,
    payment: paymentReducer,
    requestTDS: requestTDSReducer,
    reviewProduct: reviewProductReducer,
    transaction: transactionReducer,
    updateProfil: editProfil,
    cart: cartReducer,
    shippingMethod: shipping,
    ListBank: listBank,
    StatusStore: statusStore,
    saldo: saldoReducer,
    tariksaldo: tarikSaldo,
    searchtds: searchTds,
    searchMemberAktif: SearchMemberAktif,
    article: articleReducer,
    articleCategory: articleCategoryReducer,
    DetailArticle: detailArticle,
    ListArticleComment: listArticleComment,
    redeemPoint: redeemPointReducer,
    Career: career,
    renewalByPoin: renewal,
    reviewTDS: reviewTDSReducer,
    ProductsSerupa: productsSerupa,
    TdsReviewComment: tdsReviewComment,
    upload: uploadReducer,
    ListTdsByCity: listTdsCity,
    purchaseProduct: purchaseProductReducer,
    articleHome: getArticlesHomePage,
    ...injectedReducers,
  });
}
