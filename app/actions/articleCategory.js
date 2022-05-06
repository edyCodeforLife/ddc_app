import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const getArticleCategories = (data) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ARTICLE_CATEGORY;
  return (dispatch) => {
    axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          const dataSuccess = {
            articleCategories: response.data.data,
          };
          dispatch(storeArticlesCategory(dataSuccess));
        }
      })
      .catch((error) => {});
  };
};

export const storeArticlesCategory = (data) => ({
  type: actionTypes.ARTICLE_CATEGORY_STORE,
  data,
});
