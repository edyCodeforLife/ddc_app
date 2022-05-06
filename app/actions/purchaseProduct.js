import axios from 'axios';

import * as actionTypes from './actionTypes';

/**
 * Store Purchase Product
 * @param {*} data
 */
export const storePurchaseProduct = (data) => ({
  type: actionTypes.PURCHASE_PRODUCT_STORE,
  data,
});
