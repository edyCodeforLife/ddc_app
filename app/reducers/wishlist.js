import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  products: null,
  wishlist: null,
  wishlistCount: 0,
};

// Change Wishlist Redux State
const storeWishlist = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WISHLIST_STORE:
      return storeWishlist(state, action);

    default:
      return state;
  }
};

export default reducer;
