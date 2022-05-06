import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const checkMemberAktifbyPhone = (data) => (dispatch) => {
//   const params = {
//       phone : data.phone,
//   }
  dispatch(checkMemberAktifStart());
  const URL = constant.URL_MASTER_PATH + constant.URL_CHECK_MEMBERBY_PHONE;
  axios
    .get(`${URL}/${data}`)
    .then((response) => {
      dispatch(checkMemberAktifSuccess(response.data.data));
    })
    .catch((error) => {});
};

export const checkMemberAktifStart = () => ({
  type: actionTypes.CHECK_MEMBER_AKTIF_START,
});

export const checkMemberAktifReset = () => ({
    type: actionTypes.CHECK_MEMBER_AKTIF_RESET,
  });

export const checkMemberAktifSuccess = (data) => ({
  type: actionTypes.CHECK_MEMBER_AKTIF_SUCCESS,
  data,
});


export const checkMemberAktifbyEmail = (data) => (dispatch) => {
  //   const params = {
  //       phone : data.phone,
  //   }
    dispatch(checkMemberAktifbyEmailStart());
    const URL = constant.URL_MASTER_PATH + constant.URL_CHECK_MEMBERBY_EMAIL;
    axios
      .get(`${URL}/${data}`)
      .then((response) => {
        dispatch(checkMemberAktifbyEmailSuccess(response.data.data));
      })
      .catch((error) => {});
  };
  
  export const checkMemberAktifbyEmailStart = () => ({
    type: actionTypes.CHECK_MEMBER_AKTIFBY_EMAIL_START,
  });
  
  export const checkMemberAktifbyEmailReset = () => ({
      type: actionTypes.CHECK_MEMBER_AKTIFBY_EMAIL_RESET,
    });
  
  export const checkMemberAktifbyEmailSuccess = (data) => ({
    type: actionTypes.CHECK_MEMBER_AKTIFBY_EMAIL_SUCCESS,
    data,
  });
  