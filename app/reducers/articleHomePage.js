import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';
const initialState = {
  loading: false,
  hasMore: false,
  articlesHomePage: [],
  article: null,
  otherArticles: [],
};

const storeArticlesHomePage = (state, action) => {
  if (action.data.pushItems) {
    // Add more articles
    return updateObject(state, {
      loading: action.data.loading,
      hasMore: action.data.hasMore,
      articles: [...state.articlesHomePage, ...action.data.articles],
    });
  }
  return updateObject(state, action.data);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_STORE_HOME_PAGE:
      return storeArticlesHomePage(state, action);
    default:
      return state;
  }
};

export default reducer;
