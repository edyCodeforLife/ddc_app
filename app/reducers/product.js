import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  products: null, // List Products
  categories: [], // List Categories
  searchProducts: [], // List Search Products
  searchCategories: [], // List Search Categories
  product: null,
  searchName: '',
  offset: 0,
  hasMoreItems: true,
};

const productsStart = (state, action) => updateObject(state, { loading: true, searchName: action.searchName });

const productsFail = (state, action) =>
  updateObject(state, { loading: false, hasMoreItems: false });

const setProducts = (state, action) => {
  if (!action.products || action.products.length === 0) {
    return updateObject(state, { loading: false, hasMoreItems: false });
  } else if (state.products === null) {
    // Store Product to Redux
    return updateObject(state, {
      products: action.products,
      loading: false,
      hasMoreItems: true,
    });
  }
  // Push Product to Redux
  return {
    ...state,
    products: [...state.products, ...action.products],
    loading: false,
  };
};

const removeProducts = (state, action) =>
  updateObject(state, { products: [], hasMoreItems: true });

const storeCategories = (state, action) =>
  updateObject(state, {
    categories: action.data,
  });

const storeSearchProducts = (state, action) =>
  updateObject(state, {
    searchProducts: action.products,
    searchCategories: action.categories,
  });

const startSearchProducts = (state, action) =>
  updateObject(state, {
    searchName: action.searchName,
    searchProducts: [],
    searchCategories: [],
  });

const storeProduct = (state, action) =>
  updateObject(state, {
    product: action.product,
    loading: false,
  });

const startProduct = (state, action) => updateObject(state, { product: null, loading: true });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS_START:
      return productsStart(state, action);
    case actionTypes.PRODUCTS_FAIL:
      return productsFail(state, action);
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.REMOVE_PRODUCTS:
      return removeProducts(state, action);
    case actionTypes.STORE_CATEGORIES:
      return storeCategories(state, action);

    case actionTypes.START_SEARCH_PRODUCTS:
      return startSearchProducts(state, action);
    case actionTypes.STORE_SEARCH_PRODUCTS:
      return storeSearchProducts(state, action);
    case actionTypes.START_PRODUCT:
      return startProduct(state, action);
    case actionTypes.STORE_PRODUCT:
      return storeProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
