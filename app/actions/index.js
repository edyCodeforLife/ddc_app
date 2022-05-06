/**
import { storeArticlesHomePage } from './articleHomePage';
 * index.js
 *
 * This is the action file for the application
 */

export {
  setToolbarState,
  toggleCurtain,
  getHomePageContent,
  getMemberCount,
} from './app';

export { submitRegistrationForm } from './landingPage';
export { getTrendingCategories } from './trendingCategory';
export { submitCatalogDownloadForm } from './catalogDownload';
export {
  submitForgotPassword,
  submitResetPassword,
  storeResetPassword,
} from './forgotPassword';

export { getPaymentMethod, getShippingMethod } from './shippingMethod';

export {
  submitRegistrationMemberNonReseller,
  checkReferralCode,
} from './registrationMemberNonReseller';

export {
  storeRegistrationReseller,
  storeRegistrationSimpleForm,
  storeRegistrationStep1,
  storeRegistrationStep2,
  storeRegistrationStep3,
  storeRegistrationStep4,
  submitRegistrationMemberReseller,
  getDataProvince,
  getDataDistrict,
  getDataCity,
  getStaterKitProducts,
} from './registrationMemberReseller';

export { storeGetListBank, getListBank } from './listBank';

export {
  submitEditProfil,
  editProfilReset,
  editProfilResetLoading,
  editProfilPhotoStore,
  submitEditToko,
  editTokoReset,
  editProfilStrore,
  editTokoResetLoading,
  submitEditPictureToko,
  getProfileDetail,
  storeDetailProfil,
  submitEditNameShop,
  submitPostEditToko,
  TokoPostStore,
  editTokoStoreName,
  getProfileAddBank,
  storeProfilAddBank,
  submitProfileAddBank,
  addProfilBankReset,
  editTokoProfilStore,
  submitAddAddress,
  storeAddAddress,
  addAddressReset,
  uploadPhoto,
  storeUpdateAddress,
  submitUpdateAddress,
  updateAddressReset,
  submitUpdateBank,
  storeUpdateBank,
  updateBankReset,
  submitUpdateMemberAddress,
  storeUpdateMemberAddress,
  updateMemberAddressReset,
  submitVerificationProfil,
  storeUpdateVerification,
  updateVerificationReset,
  storePhotoIdCardNumber,
  submitEditPictureKtp,
  deleteListMemberAddress,
  SubmitdeleteListMemberAddress,
  deleteMemberAddressSuccess,
  updatePhotoStore,
} from './updateProfil';

export { storeUpgradeMember } from './UpgradeMember';

export {
  storeRenewalByPoin,
  orderRenewalByPoin,
  renewalSuccessReset,
  storeRenewalTop,
  storeRenewalTopReset,
  orderRenewalTop,
} from './orderRenewal';
export {
  storeRequestTarikSaldo,
  requestTarikSaldo,
  storeRequestTarikSaldoReset,
} from './tarikSaldo';

export {
  getTdsNearby,
  searchTds,
  getTdsNearbySuccess,
  getTdsNearbyReset,
} from './searchNearbyTds';

export { getTdsCity, getTdsProvinceSuccess } from './tdsCity';
export {
  getArticles,
  getArticle,
  getOtherArticles,
} from './article';

export { getArticleCategories } from './articleCategory';

export {
  getCommentArticle,
  getCommentArticleSuccess,
  submitCommentArticle,
  submitCommentArticleSuccess,
  storeCommentArticle,
} from './getCommentArticle';

export {
  checkMemberAktifbyPhone,
  checkMemberAktifReset,
  checkMemberAktifbyEmail,
  checkMemberAktifbyEmailReset,
} from './checkMemberAktif';
export {
  submitLogin,
  logout,
  authCheckState,
  getLoginInformation,
} from './authentication';

export {
  getDetailArticleSuccess,
  storeDetailArticle,
  getListArticlesCard,
  getArticleCategory,
} from './detailArticle';
export {
  getProducts,
  setCatalogSort,
  removeProducts,
  getCategories,
  getSearchProducts,
  getProduct,
} from './product';

export {
  storeSearchProductStockAdjusment,
  getSearchProductStockAdjusment,
} from './searchProductStockAdjusment';

export {
  productsSerupaStart,
  productsSerupaSuccess,
  productsSerupaFail,
  getProductsSerupa,
} from './productSerupa';
export {
  getProvinces,
  getCities,
  getDistricts,
  getBranches,
  getBranchesNearby,
  getShippingCost,
  getBranchFreeShipping,
  submitDefaultBranchForAmbilSendiri,
  getDefaultBranchForAmbilSendiri,
  getDefaultBranchForAmbilSendiriSuccess,
  removeDefaultBranchForAmbilSendiri,
  getBranchRecommendation,
} from './order';

export {
  storeGetSaldoMember,
  getSaldoIns,
  getSaldoOuts,
  postOTPTarikSaldo,
  storeSaldo,
  postTarikSaldo,
  storeSearchSaldoDetail,
  startSearchSaldoDetail,
  getSearchSaldoDetail,
  storeGetSaldoMemberOut,
  getSearchWithdrawSaldoDetail,
  storeSearchWithdrawSaldoDetail,
} from './saldo';

export { getWishlist, getWishlists, addToWishlist } from './wishlist';

export {
  addToCart,
  editCart,
  storeCart,
  getCarts,
  getCartQuantity,
  getCartByUuid,
  deleteCart,
  postCustomDelivery,
} from './cart';

export { getPaymentMethods } from './paymentMethod';

export {
  postPaymentConfirmation,
  storePaymentConfirmation,
} from './paymentConfirmation';

export { postPayment, getPaymentTotalPrice, storePayment } from './payment';

export {
  postRequestTDS,
  postOpenCloseStoreTDS,
  getTDSInventory,
  getTDSOrders,
  putTDSOrder,
  updateAdjustments,
  storeAdjustments,
  storeRequestTDS,
  storeRequestOpenStore,
  storeStockAdjusment,
  postStockAdjusment,
  resetStoreStockAdjusment,
} from './requestTDS';

export { postReviewProduct, storeReviewProduct } from './reviewProduct';

export {
  getTransactions,
  getShipmentTracking,
  putOrderStatus,
  storeTransaction,
} from './transaction';

export { storeGetCareer, getCareer } from './getCareer';

export { postUpdateStatusStore, storeUpdateStatus } from './store';

export {
  getRedeemPointProducts,
  getRedeemPointHistories,
  postRedeemPoint,
  storeRedeemPoint,
} from './redeemPoint';

export {
  storeReviewTDS,
  getReviewsTDS,
  getReviewTDS,
  postReviewTDS,
  putReviewTDS,
  storeAddReviewTDS,
} from './reviewTDS';

export {
  replyCommentTDS,
  replyReviewTdsStore,
  resetReviewTdsStore,
} from './tdsReview';

export {
  postUploadImage,
  storeUploadImage,
  postUploadImageIDcard,
  postUploadImageStore,
  postUploadImageProfile,
} from './upload';

export { storePurchaseProduct } from './purchaseProduct';

export { infusionsoftApi } from './infusionsoft';
export {storeArticlesHomePage, getArticlesHomePage} from './articleHomePage';
