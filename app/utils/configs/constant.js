import APP_CONFIG from './environments';

const constant = {
  DEBUG_MODE: APP_CONFIG.DEBUG_MODE,
  GET_TIER_PRICE: ['Reseller', 'TDS'], // Member Types
  GET_CHEAPEST_TIER_PRICE: ['TDS'], // Member Types

  // Third Party
  GTM_ID: APP_CONFIG.GTM_ID,
  PLUGIN_FACEBOOK_ID: APP_CONFIG.PLUGIN_FACEBOOK_ID,

  INFUSIONSOFT: {
    API_URL: 'https://api.infusionsoft.com/crm/rest/v1/',
    API_TOKEN: '5csxbs27mb7u8kkqamprsnk7',
    REFRESH_TOKEN: 'k28xn6qf88uaayk2hf685p9y',
    API_PATH: { CONTACTS: 'contacts', TAGS: 'tags' },
    TAGS: {
      DOWNLOAD_ECATALOG: 517,
      PREREGISTER: 515,
      NEW_RESELLER_WAITING_PAYMENT: 513, // Reseller Prospect
      NEW_RESELLER: 511, // Reseller Active
    },
  },

  URL_MASTER_PATH: APP_CONFIG.API_ROOT,
  URL_MASTER_PUBLIC_PATH: APP_CONFIG.URL_MASTER_PUBLIC_PATH,
  URL_IMAGE_PATH: 'https://api3dev.dusdusan.com/storage/',
  URL_IMAGE_THUMB_PATH: 'https://api3dev.dusdusan.com/storage/thumbs/',
  URL_IMAGE_OLD_PATH: 'https://api3dev.dusdusan.com/',
  URL_MASTER_PATH_IMAGE: 'https://images.dusdusan.com',

  PLACEHOLDER: {
    PRODUCT_IMAGE: 'CrashKatalog.png',
  },

  CONFIG_GLOBAL: {
    TRIAL_ACTIVE_DAYS: 14,
  },

  CONFIG_ORDER: {
    REGISTRATION_VOUCHER: ['2019sukses', '2019Sukses', '2019SUKSES'],
    PAKET_DAFTAR_ID: 2154, // Paket Daftar
    FREE_SHIPPING_BRANCH_ID: 3, // 2 = Gudang Cikarang (Dev) dan 3 (Staging)
    BASE_BRANCH_ID: 3, // 2 = Gudang Cikarang (Dev) dan 3 (Staging)
    BASE_BRANCH_DISTRICT_ID: 3216023, // 2 = Gudang Cikarang (Dev) dan 3 (Staging)
    GROSS_WEIGHT_FACTOR: 6000,
    PAYMENT_COUNTDOWN: {
      MANUAL_TRANSFER: 3, // Days
      VA: 1, // Days
    },
  },

  CONFIG_PROMO: {
    PROMO_START_DATE: '2019-01-28 00:00:01',
    PROMO_END_DATE: '2019-01-31 23:59:59',
  },

  CONFIG_PAYMENT: {
    MDR: 0.032, // Credit Card Charge Rate 3.2%
    HANDLING_FEE: 5000,
    RENEWAL_POIN: 250,
    RENEWAL_PRICE: 100000,
  },
  URL_ADD_REVIEW_TDS: 'tdsReviewComment/',
  URL_UPGRADE_MEMBER: 'orderUpgrade',
  URL_GET_COMMENT_ARTICLE: 'articleComment',
  URL_SUBMIT_COMMENT_ARTICLE: 'createArticleComment',
  URL_GET_REFERAL_CODE: 'referalCode/',
  URL_GET_TRENDING_CATEGORY: 'trendingProductCategory',
  URL_GET_REVIEW_TDS: 'tdsReview/',
  URL_GET_ARTICLES: 'articles',
  URL_GET_ARTICLE: 'articles/detail/',
  URL_GET_ARTICLE_CATEGORY: 'articles/category',
  URL_GET_CAREER: 'getCareer',
  URL_POST_REGISTER_NON_RESELLER: 'registerMemberNonReseller',
  URL_UPDATE_PROFIL: 'profile',
  URL_UPDATE_TOKO_NAME: 'profileUpdate/',
  URL_UPLOAD_PHOTO_TOKO: 'storePhoto/',
  URL_UPLOAD_PHOTO: 'uploadPhoto',
  URL_GET_DETAIL_PROFIL: 'profileDetail',
  URL_PROFIL_ADD_STORE: 'profileAddStore',
  URL_PROFIL_ADD_BANK_STORE: 'profileAddBank',
  URL_DELETE_MEMBER_DELIVERY_ADDRESS: 'deleteMemberDeliveryAddress',
  URL_ADD_ADDRESS: 'profile/address',
  URL_MEMBER_UPDATE_ADDRESS: 'profile/',
  URL_PROFIL_EDIT_BANK: 'profileEditBank/',
  URL_LIST_BANK: 'bank',
  URL_PROFIL_BALANCE: 'profileBalance',
  URL_DEV: 'https://appdev.dusdusan.com',
  URL_POST_LOGIN: 'loginMember',
  // URL_GET_LOGIN: 'authMember', // Not Complete
  URL_GET_LOGIN: 'profileDetail',

  URL_DOWNLOAD_CATALOG: 'preMember',
  URL_POST_WISHLIST: 'wishlist',
  URL_ORDER_RENEWAL: 'orderRenewal',
  URL_ORDER_RENEWAL_TOP: 'renewal',
  URL_POST_REGISTER_RESELLER: 'registerMemberReseller',
  URL_SUBMIT_FORGOT_PASSWORD: 'forgotPassword/',
  URL_RESET_PASSWORD: 'forgotPassword',
  URL_GET_PAYMENT_METHOD: 'payment',
  URL_GET_SHIPPING_METHOD: 'courier',
  URL_GET_PROVINCE: 'province',
  URL_GET_CITY: 'city/',
  URL_GET_DISTRICT: 'district/',
  URL_POST_ADJUSTMENT: 'stockAdjustmentsTds',

  PAYMENT_METHOD: {
    PAYMENTCATEGORYID_TF: '1',
    PAYMENTCATEGORYID_VA: '2',
    PAYMENTCATEGORYID_CDB: '3',
    PAYMENTCATEGORYID_R: '4',
  },
  PAYMENT_METHOD_TRANSFER_BANK: {
    BCA: 'BCA',
    MANDIRI: 'MANDIRI',
    BRI: 'BRI',
  },
  SHIPPING_METHOD: {
    TIKI: 'TIKI',
    JNT: 'JNT',
    POS: 'POS',
    SICEPAT: 'SICEPAT',
  },

  REGEX_NUMBER_ONLY: /^[0-9+]*$/,
  REGEX_PHONE_NUMBER: '^0[0-9]{7,12}$',
  MODAL_SUCCESS: 'MODAL_SUCCESS',
  MODAL_ERROR: 'MODAL_ERROR',
  MODAL_DEFAULT: 'MODAL_DEFAULT',

  URL_GET_WISHLIST: 'wishlist',
  URL_GET_WISHLISTS: 'detailWishlist',
  URL_GET_PRODUCTS: 'product',
  URL_GET_PRODUCT: 'product/',
  URL_GET_SEARCH_PRODUCT_AND_CATEGORY_BY_NAME: 'productSearch',
  URL_GET_CATEGORIES: 'trendingProductCategory',

  URL_GET_PROVINCES: 'province',
  URL_GET_CITIES: 'city/',
  URL_GET_BRANCHES: 'tds',
  URL_GET_BRANCHES_NEARBY: 'getBranch',
  URL_GET_ALL_SHIPPING_COST: 'getShippings', // shippingRequest
  URL_GET_BRANCH_FREE_SHIPPING: 'branchFreeShipping/',
  URL_CHECK_MEMBERBY_PHONE: 'checkMemberPhone',
  URL_CHECK_MEMBERBY_EMAIL: 'checkMemberEmail',
  URL_POST_DEFAULT_BRANCH_AMBIL_SENDIRI: 'tdsFavorite',
  URL_GET_DEFAULT_BRANCH_AMBIL_SENDIRI: 'tdsFavorite/',

  URL_GET_TDS_RECOMMENDATION: 'getBranchTDSRecommend',
  URL_GET_BRANCH_RECOMMENDATION: 'getBranchRecommend',

  URL_GET_HOMEPAGE_CONTENT: 'homepageContent',

  URL_GET_CART: 'groupingCart',
  URL_POST_CART: 'groupingCart',
  URL_PUT_CART: 'updateGroupingCart/',
  URL_GET_CART_QUANTITY: 'totalCart',
  URL_GET_CART_DETAIL: 'getGroupingCartByUuid/',
  URL_DELETE_CART: 'deleteGroupingCart/',
  URL_POST_CART_CUSTOM_DELIVERY: 'createCustomDelivery',

  URL_POST_PAYMENT_CONFIRMATION: 'paymentConfirmation',
  URL_POST_PAYMENT_CONFIRMATION_IMAGE: 'upload/orderConfirmationPhoto/',
  URL_POST_PAYMENT: 'order',
  URL_POST_PAYMENT_MEMBERSHIP: 'orderUpgrade',
  URL_POST_RENEWAL_PAYMENT: 'orderRenewal',
  URL_GET_ORDER_PAYMENTS: 'order',
  URL_GET_ORDER_PAYMENT_TOTAL_PRICE: 'getTotalPrice',
  URL_GET_ORDER_TO_TDS: 'orderToTds',
  URL_PUT_ORDER_TO_TDS: 'updateOrderStatusToTds/',
  URL_PUT_ORDER_TO_TDS_RESI: 'updateResi/',
  URL_GET_SHIPMENT_TRACKING: 'getWaybill',

  URL_POST_REVIEW_PRODUCT: 'productReview',

  URL_GET_REVIEW: 'tdsReviewDetail/',
  URL_PUT_REVIEW: 'tdsReviewUpdate/',

  URL_POST_REQUEST_TDS: 'profileTdsRequest',

  URL_POST_OPEN_CLOSE_STORE_TDS: 'profileTdsActive',
  URL_POST_TDS_INVENTORY: 'profileTdsInventory',

  URL_GET_REDEEM_POINT_HISTORIES: 'pointHistory',
  URL_POST_REDEEM_POINT: 'productRedeem',

  URL_TARIK_SALDO: 'profileBalanceWithdraw',
  URL_POST_OTP_TARIK_SALDO: 'balanceSendSms',
  URL_POST_TARIK_SALDO: 'profileBalanceWithdraw',

  URL_COUNT_MEMBER: 'countMember',

  URL_UPLOAD_IMAGE: 'upload/confirmationPhoto',
  URL_UPLOAD_PROFILE_IMAGE: 'upload/profilePhoto',
  URL_UPLOAD_STORE_IMAGE: 'upload/storePhoto',
  URL_IDCARD_IMAGE: 'upload/idcardPhoto',

  COPYRIGHT: 'Copyright © 2018 Dusdusan.com. All Rights Reserved',

  FOOTER_HELPER: {
    CALL_CENTER: '021-53661376',
    EMAIL_SUPPORT: 'support@dusdusan.com',
    FB: 'https://www.facebook.com/DusdusanID',
    IG: 'https://www.instagram.com/dusdusan/',
    FB_GROUP: 'Sahabat Dusdusan.com',
    WA_BUSINESS: '628111611820',
  },

  EMAIL: {
    CAREER: 'hc@dusdusan.com',
    CAREER_CC: 'haumanto@dusdusan.com',
  },
};
export default constant;
