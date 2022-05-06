import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formSuccess: false,
  transactions: [],
  trackings: {},
};

const storeTransaction = (state, action) => updateObject(state, action.data);

/**
 * Store Object Tracking to Trackings Object Array
 * @param {*} state 
 * @param {*} action 
 */
const storeShipmentTracking = (state, action) =>
  updateObject(state, {
    trackings: Object.assign(action.data.trackings, state.trackings),
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRANSACTION_STORE:
      return storeTransaction(state, action);
    case actionTypes.TRACKING_STORE:
      return storeShipmentTracking(state, action);

    default:
      return state;
  }
};

export default reducer;
