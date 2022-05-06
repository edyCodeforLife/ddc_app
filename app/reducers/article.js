import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  hasMore: false,
  articles: [],
  article: null,
  otherArticles: [],
};

const storeArticle = (state, action) => {
  if (action.data.pushItems) {
    // Add more articles
    return updateObject(state, {
      loading: action.data.loading,
      hasMore: action.data.hasMore,
      articles: [...state.articles, ...action.data.articles],
    });
  }
  return updateObject(state, action.data);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_STORE:
      return storeArticle(state, action);
    default:
      return state;
  }
};

export default reducer;
