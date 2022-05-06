import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  productsSerupa: null, // List Product
  offset: 0,
};

const productsSerupaStart = (state, action) =>
  updateObject(state, { loading: true});

const productsSerupaFail = (state, action) =>
  updateObject(state, { loading: false});

const productsSerupaSuccess = (state, action) =>
  updateObject(state, {
    productsSerupa: action.data,
    loading: false,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS_SERUPA_START:
      return productsSerupaStart(state, action);
    case actionTypes.PRODUCTS_SERUPA_FAIL:
      return productsSerupaFail(state, action);
    case actionTypes.PRODUCTS_SERUPA_SUCCESS:
      return productsSerupaSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
