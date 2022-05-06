import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  formError: [],
  formSuccess: false,
  ListArticleComment: null,
};

// GET_COMMENT_LIST
const getCommentArticleStart = (state, action) =>
  updateObject(state, { loading: true });

const getCommentArticleSuccess = (state, action) =>
  updateObject(state, { ListArticleComment: action.data });
// GET_COMMENT_LIST

const submitCommentArticleStart = (state, action) =>
  updateObject(state, { loading: true });

const submitCommentArticleSuccess = (state, action) =>
  updateObject(state, { formSuccess: true });

const storeCommentArticle = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_COMMENT_ARTICLE:
      return storeCommentArticle(state, action);
    case actionTypes.GET_COMMENT_ARTICLE_START:
      return getCommentArticleStart(state, action);
    case actionTypes.GET_COMMENT_ARTICLE_SUCCESS:
      return getCommentArticleSuccess(state, action);
    case actionTypes.SUBMIT_COMMENT_ARTICLE_START:
      return submitCommentArticleStart(state, action);
    case actionTypes.SUBMIT_COMMENT_ARTICLE_SUCCESS:
      return submitCommentArticleSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
