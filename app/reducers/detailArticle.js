import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: [],
  formSuccess: false,
  article: null,
  listArticlesCard: null,
};

const getArticleCardStart = (state, action) =>
  updateObject(state, { loading: false });

const getArticleCardSuccess = (state, action) => {
  if (!state.articles) {
    return updateObject(state, { listArticlesCard: action.data });
  }
  return updateObject(state, {
    articles: [...state.articles, ...action.data],
  });
};
// GET_TDS_NEARBY
const getDetailArticleStart = (state, action) =>
  updateObject(state, { article: null });

const getDetailArticleSuccess = (state, action) =>
  updateObject(state, { article: action.data });
// GET_TDS_NEARBY

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_CARD_START:
      return getArticleCardStart(state, action);
    case actionTypes.GET_ARTICLE_CARD_SUCCESS:
      return getArticleCardSuccess(state, action);
    case actionTypes.GET_DETAIL_ARTICLE_START:
      return getDetailArticleStart(state, action);
    case actionTypes.GET_DETAIL_ARTICLE_SUCCESS:
      return getDetailArticleSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
