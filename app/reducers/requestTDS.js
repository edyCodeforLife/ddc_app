import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  formError: false,
  transactions: null,
  inventory: null,
  adjustments: null,
  adjustmentProductCount: null,
  adjustmentQuantityCount: null,
  orders: null,
  order: null,
  data: null,
};

const storeRequestTDS = (state, action) => updateObject(state, action.data);

const storeAdjustments = (state, action) => {
  // console.log(state);
  // console.log(action);
  let adjustments = state.adjustments;
  if (!adjustments) {
    // If Array === null
    adjustments = [];
    adjustments.push(action.data);
  } else {
    // If Array exist
    const adjustmentIndex = adjustments.findIndex(
      (product) => product.productId === action.data.productId
    );
    // console.log(productExist);
    if (adjustmentIndex === -1) {
      // If same product exist
      adjustments.push(action.data);
    } else {
      // Remove same product
      adjustments.splice(adjustmentIndex, 1);
      adjustments.push(action.data);
      // if (action.data.quantity !== action.data.maxQuantity) {
      //   // If decrease
      //   adjustments.push(action.data);
      // }
    }
  }
  const adjustmentProductCount = adjustments.length;
  const adjustmentQuantityCount = adjustments.reduce(
    (sum, current) => sum + current.marginQuantity,
    0
  );

  /**
   * Sort by name
   */
  adjustments.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return updateObject(state, {
    adjustments,
    adjustmentProductCount,
    adjustmentQuantityCount,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_TDS_STORE:
      return storeRequestTDS(state, action);
    case actionTypes.ADJUSTMENTS_STORE:
      return storeAdjustments(state, action);
    default:
      return state;
  }
};

export default reducer;
