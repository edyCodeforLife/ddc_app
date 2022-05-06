import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const setTrendingCategories = (categories) => ({
  type: actionTypes.SET_TRENDING_CATEGORIES,
  categories,
});

export const getTrendingCategories = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_TRENDING_CATEGORY;

  return (dispatch) => {
    axios
      .get(URL, {
        params: {
          query: 'trending:1',
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(setTrendingCategories(response.data.data));
        }
      })
      .catch((error) => error);
  };
};
