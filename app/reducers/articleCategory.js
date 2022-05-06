import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  articleCategories: [],
};

const storeArticleCategories = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_CATEGORY_STORE:
      return storeArticleCategories(state, action);
    default:
      return state;
  }
};

export default reducer;
