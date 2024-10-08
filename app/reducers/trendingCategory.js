import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  categories: null,
};

const setTrendingCategories = (state, action) =>
  updateObject(state, {
    categories: action.categories,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRENDING_CATEGORIES:
      return setTrendingCategories(state, action);
    default:
      return state;
  }
};

export default reducer;
