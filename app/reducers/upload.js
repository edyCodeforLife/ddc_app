import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  imagePath: null,
};

const storeUploadImage = (state, action) => updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_IMAGE_STORE:
      return storeUploadImage(state, action);

    default:
      return state;
  }
};

export default reducer;
