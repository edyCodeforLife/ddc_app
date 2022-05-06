import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const editProfilStart = () => ({
  type: actionTypes.EDIT_PROFIL_START,
});
export const editProfilStore = (data) => ({
  type: actionTypes.EDIT_PROFIL_STORE,
  data,
});
export const editProfilPhotoStore = (data) => ({
  type: actionTypes.EDIT_PROFIL_PHOTO_STORE,
  data,
});
export const editProfilSuccess = () => ({
  type: actionTypes.EDIT_PROFIL_SUCCESS,
});
export const editProfilError = (formError) => ({
  type: actionTypes.EDIT_PROFIL_ERROR,
  formError,
});
export const editProfilReset = () => ({
  type: actionTypes.EDIT_PROFIL_RESET,
});
export const editProfilResetLoading = () => ({
  type: actionTypes.EDIT_PROFIL_RESET_LOADING,
});

export const submitEditProfil = (data) => (dispatch) => {
  dispatch(editProfilStart());
  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    image: data.image,
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_UPDATE_PROFIL;
  axios
    .put(URL, JSON.stringify(formData))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(editProfilPhotoStore(dataSuccess));
      } else {
        dispatch(editProfilError(response.data.data));
        dispatch(editProfilStore(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(editProfilError(error));
    });
};

export const updatePhotoStore = (data) => ({
  type: actionTypes.UPDATE_PHOTO_STORE,
  data,
});
export const submitAddPhotoProfil = (upload) => (dispatch) => {
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_PHOTO;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    // .post(`${URL}/profile`, formData, config)
    .post(`${URL}`, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        formSuccess: true,
      };
      dispatch(editProfilPhotoStore(dataSuccess));
    })
    .catch((error) => {});
};

export const updateVerificationSuccess = () => ({
  type: actionTypes.UPDATE_VERIFICATION_SUCCESS,
});
export const updateVerificationError = (formError) => ({
  type: actionTypes.UPDATE_VERIFICATION_ERROR,
  formError,
});
export const updateVerificationReset = () => ({
  type: actionTypes.UPDATE_VERIFICATION_RESET,
});
export const storeUpdateVerification = (data) => ({
  type: actionTypes.STORE_UPDATE_VERIFICATION,
  data,
});
export const updateVerificationStart = () => ({
  type: actionTypes.UPDATE_VERIFICATION_START,
});

export const submitVerificationProfil = (data, token, upload, idcard) => (
  dispatch
) => {
  console.log(data, token, upload, idcard);
  dispatch(updateVerificationStart());
  const params = {
    idCardNumber: data.idCardNumber,
  };
  const config = {
    headers: { Authorization: token },
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_UPDATE_PROFIL;
  axios
    .put(URL, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        // dispatch(editTokoSuccess(response));
        if (upload) {
          // console.log('Upload');
          // Success with upload
          dispatch(
            submitEditPictureKtp(upload, response.data.data.idCardNumber)
          );
        } else {
          // console.log('Form');
          // Success without upload
          // const dataSuccess = {
          //   loading: false,
          //   formSuccess: true,
          // };
          dispatch(updateVerificationSuccess(response));
        }
      } else {
        dispatch(storeUpdateVerification(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(updateVerificationError(error));
    });
};

export const editTokoStart = () => ({
  type: actionTypes.EDIT_TOKO_START,
});
export const editTokoSuccess = () => ({
  type: actionTypes.EDIT_TOKO_SUCCESS,
});
export const editTokoError = (formError) => ({
  type: actionTypes.EDIT_TOKO_ERROR,
  formError,
});
export const editTokoReset = () => ({
  type: actionTypes.EDIT_TOKO_RESET,
});
export const editTokoResetLoading = () => ({
  type: actionTypes.EDIT_TOKO_RESET_LOADING,
});

export const TokoPostStore = (data) => ({
  type: actionTypes.TOKO_POST_STORE,
  data,
});

export const editTokoStoreName = (data) => ({
  type: actionTypes.EDIT_TOKO_STORE_NAME,
  data,
});

export const editTokoProfilStore = (data) => ({
  type: actionTypes.EDIT_TOKO_PROFIL_STORE,
  data,
});

export const submitEditToko = (data, id) => (dispatch) => {
  console.log('ini edit broh');
  dispatch(editTokoStart());
  const params = {
    name: data.name,
    image: data.image,
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_UPDATE_TOKO_NAME;
  axios
    .put(`${URL + id}/store`, JSON.stringify(params))
    .then((response) => {
      if (response.data.code === 200) {
        // dispatch(editTokoSuccess(response));
        dispatch(editTokoSuccess(response));
      } else {
        dispatch(editTokoStoreName(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(editTokoError(error));
    });
};

export const editTokoPostStart = () => ({
  type: actionTypes.EDIT_TOKO_POST_START,
});
export const editTokoPostSuccess = () => ({
  type: actionTypes.EDIT_TOKO_POST_SUCCESS,
});
export const editTokoPostError = (formError) => ({
  type: actionTypes.EDIT_TOKO_POST_ERROR,
  formError,
});
export const editTokoPostReset = () => ({
  type: actionTypes.EDIT_TOKO_POST_RESET,
});

export const submitPostEditToko = (data) => (dispatch) => {
  console.log('ini Post broh');
  dispatch(editTokoPostStart());
  const params = {
    name: data.name,
    image: data.image,
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_ADD_STORE;
  axios
    .post(URL, JSON.stringify(params))
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(editTokoPostSuccess(response));
      } else {
        dispatch(TokoPostStore(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(editTokoPostError(error));
    });
};

export const editTokoProfilStartImage = () => ({
  type: actionTypes.EDIT_TOKO_PROFIL_START_IMAGE,
});
export const editTokoProfilSuccessImage = () => ({
  type: actionTypes.EDIT_TOKO_PROFIL_SUCCESS_IMAGE,
});
export const editTokoProfilErrorImage = (formError) => ({
  type: actionTypes.EDIT_TOKO_PROFIL_ERROR_IMAGE,
  formError,
});
export const editTokoProfilReset = () => ({
  type: actionTypes.EDIT_TOKO_PROFIL_RESET,
});

export const storePhotoIdCardNumber = (data) => ({
  type: actionTypes.STORE_PHOTO_ID_CARD_NUMBER,
  data,
});

export const submitEditPictureKtp = (upload, idCardNumber) => (dispatch) => {
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_PHOTO;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(`${URL}/idcard`, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        formSuccess: true,
      };
      dispatch(storePhotoIdCardNumber(dataSuccess));
    })
    .catch((error) => {});
};

export const updateProfilTokoStart = () => ({
  type: actionTypes.UPDATE_PROFIL_TOKO_START,
});

export const updateProfilTokoError = (formError) => ({
  type: actionTypes.UPDATE_PROFIL_TOKO_ERROR,
  formError,
});

export const submitAddPictureToko = (upload) => (dispatch) => {
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_PHOTO;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(`${URL}/store`, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        formSuccess: true,
      };
      dispatch(editProfilPhotoStore(dataSuccess));
    })
    .catch((error) => {});
};
export const submitEditPictureToko = (upload) => (dispatch) => {
  dispatch(updateProfilTokoStart());
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_PHOTO;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(`${URL}/store`, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        formSuccess: true,
        formData: { memberStore: {} },
      };
      dispatch(editTokoProfilStore(dataSuccess));
    })
    .catch((error) => {});
};

// export const submitEditPictureToko = (data, token, id) => (dispatch) => {
//   console.log(data, token);
//   dispatch(editTokoProfilStartImage());
//   const data = {
//     name: data.name,
//   };

//   const params = {
//     headers: { Authorization: token },
//   };
//   const config = { headers: { 'Content-Type': 'multipart/form-data' } };
//   const URL = constant.URL_MASTER_PATH + constant.URL_UPLOAD_PHOTO_TOKO;
//   axios
//     .put(`${URL + id}/upload`, JSON.stringify(data, params), config)
//     .then((response) => {
//       if (response.data.code === 200) {
//         dispatch(editTokoProfilSuccessImage(response));
//       } else {
//         dispatch(editTokoProfilStore(response.data.data));
//       }
//     })
//     .catch((error) => {
//       dispatch(editTokoProfilErrorImage(error));
//     });
// };

export const storeDetailProfil = (data) => ({
  type: actionTypes.STORE_DETAIL_PROFIL,
  data,
});

export const getProfileDetail = (token) => {
  const config = {
    headers: { Authorization: token },
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_DETAIL_PROFIL;
  return (dispatch) => {
    axios
      .get(URL, config)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeDetailProfil(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeProfilAddBank = (data) => ({
  type: actionTypes.STORE_PROFIL_ADD_BANK,
  data,
});
export const addProfilBankStart = () => ({
  type: actionTypes.ADD_PROFIL_BANK_START,
});
export const addProfilBankSuccess = () => ({
  type: actionTypes.ADD_PROFIL_BANK_SUCCESS,
});
export const addProfilBankError = (formError) => ({
  type: actionTypes.ADD_PROFIL_BANK_ERROR,
  formError,
});
export const addProfilBankReset = () => ({
  type: actionTypes.ADD_PROFIL_BANK_RESET,
});

export const submitProfileAddBank = (data, token) => (dispatch) => {
  dispatch(addProfilBankStart());
  const params = {
    accountName: data.accountName,
    accountNumber: data.accountNumber,
    bankId: parseInt(data.bankId, 0),
  };
  const config = {
    headers: { Authorization: token },
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_ADD_BANK_STORE;
  axios
    .post(URL, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(addProfilBankSuccess(response));
      } else {
        dispatch(storeProfilAddBank(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(addProfilBankError(error));
    });
};

export const storeAddAddress = (data) => ({
  type: actionTypes.STORE_ADD_ADDRESS,
  data,
});
export const addAddressStart = () => ({
  type: actionTypes.ADD_ADDRESS_START,
});
export const addAddressSuccess = () => ({
  type: actionTypes.ADD_ADDRESS_SUCCESS,
});
export const addAddressError = (formError) => ({
  type: actionTypes.ADD_ADDRESS_ERROR,
  formError,
});
export const addAddressReset = () => ({
  type: actionTypes.ADD_ADDRESS_RESET,
});
export const submitAddAddress = (data, token) => (dispatch) => {
  console.log(data, token);
  dispatch(addAddressStart());
  const params = {
    name: data.name,
    address: data.address,
    default: data.default,
    receiverName: data.receiverName,
    phone: data.phone,
    provinceId: data.provinceId,
    cityId: data.cityId,
    districtId: data.districtId,
    postalCode: data.postalCode,
  };
  const config = {
    headers: { Authorization: token },
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_ADD_ADDRESS;
  axios
    .post(URL, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(addAddressSuccess(response));
      } else {
        dispatch(storeAddAddress(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(addAddressError(error));
    });
};

export const storeUpdateAddress = (data) => ({
  type: actionTypes.STORE_UPDATE_ADDRESS,
  data,
});
export const updateAddressStart = () => ({
  type: actionTypes.UPDATE_ADDRESS_START,
});
export const updateAddressSuccess = () => ({
  type: actionTypes.UPDATE_ADDRESS_SUCCESS,
});
export const updateAddressError = (formError) => ({
  type: actionTypes.UPDATE_ADDRESS_ERROR,
  formError,
});
export const updateAddressReset = () => ({
  type: actionTypes.UPDATE_ADDRESS_RESET,
});

export const submitUpdateAddress = (data, token, id) => (dispatch) => {
  console.log(data, token, id);
  dispatch(updateAddressStart());
  // let params = {};
  // if (data.default) {
  //   params = {
  //     default: data.default,
  //   };
  // } else {
  console.log(data);
  const params = {
    name: data.name,
    Address: data.Address,
    default: data.default,
    receiverName: data.receiverName,
    phone: data.phone,
    provinceId: data.provinceId,
    cityId: data.cityId,
    districtId: data.districtId,
    postalCode: data.postalCode,
  };
  // }

  const config = {
    headers: { Authorization: token },
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_MEMBER_UPDATE_ADDRESS;
  axios
    .put(`${URL + id}/address`, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(updateAddressSuccess(response));
      } else {
        dispatch(storeUpdateAddress(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(updateAddressError(error));
    });
};

export const storeUpdateBank = (data) => ({
  type: actionTypes.STORE_UPDATE_BANK,
  data,
});
export const updateBankStart = () => ({
  type: actionTypes.UPDATE_BANK_START,
});
export const updateBankSuccess = () => ({
  type: actionTypes.UPDATE_BANK_SUCCESS,
});
export const updateBankError = (formError) => ({
  type: actionTypes.UPDATE_BANK_ERROR,
  formError,
});
export const updateBankReset = () => ({
  type: actionTypes.UPDATE_BANK_RESET,
});

export const submitUpdateBank = (data, token, id) => (dispatch) => {
  console.log(data, token, id);
  dispatch(updateBankStart());
  const params = {
    accountName: data.accountName,
    accountNumber: data.accountNumber,
    bankId: parseInt(data.bankId),
  };
  const config = {
    headers: { Authorization: token },
  };

  const URL = constant.URL_MASTER_PATH + constant.URL_PROFIL_EDIT_BANK;
  axios
    .put(URL + id, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(updateBankSuccess(response));
      } else {
        dispatch(storeUpdateBank(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(updateBankError(error));
    });
};

export const storeGetListBank = (data) => ({
  type: actionTypes.STORE_GET_LIST_BANK,
  data,
});

export const getListBank = () => {
  const URL = constant.URL_MASTER_PATH + constant.URL_LIST_BANK;
  return (dispatch) => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          dispatch(storeGetListBank(response.data.data));
        }
      })
      .catch((error) => {});
  };
};

export const storeUpdateMemberAddress = (data) => ({
  type: actionTypes.STORE_UPDATE_MEMBER_ADDRESS,
  data,
});

export const updateMemberAddressStart = () => ({
  type: actionTypes.UPDATE_MEMBER_ADDRESS_START,
});
export const updateMemberAddressSuccess = () => ({
  type: actionTypes.UPDATE_MEMBER_ADDRESS_SUCCESS,
});
export const updateMemberAddressError = (formError) => ({
  type: actionTypes.UPDATE_MEMBER_ADDRESS_ERROR,
  formError,
});
export const updateMemberAddressReset = () => ({
  type: actionTypes.UPDATE_MEMBER_ADDRESS_RESET,
});
export const submitUpdateMemberAddress = (data, token, id) => (dispatch) => {
  console.log(data, token, id);
  dispatch(updateMemberAddressStart());
  // let params = {};
  // if (data.default) {
  //   params = {
  //     default: data.default,
  //   };
  // } else {

  console.log(data);
  const params = {
    default: data.default,
    name: data.name,
    receiverName: data.receiverName,
    address: data.address,
    phone: data.phone,
    provinceId: data.provinceId,
    cityId: data.cityId,
    districtId: data.districtId,
    postalCode: data.postalCode,
  };
  // }

  const config = {
    headers: { Authorization: token },
  };
  const URL = constant.URL_MASTER_PATH + constant.URL_MEMBER_UPDATE_ADDRESS;
  axios
    .put(`${URL + id}/address`, JSON.stringify(params), config)
    .then((response) => {
      if (response.data.code === 200) {
        dispatch(updateMemberAddressSuccess(response));
      } else {
        dispatch(storeUpdateMemberAddress(response.data.data));
      }
    })
    .catch((error) => {
      dispatch(updateMemberAddressError(error));
    });
};

// export const deleteMemberAddressStart = () => ({
//   type: actionTypes.DELETE_MEMBER_ADDRESS_START,
// });
// export const deleteMemberAddressSuccess = () => ({
//   type: actionTypes.DELETE_MEMBER_ADDRESS_SUCCESS,
// });
// export const deleteMemberAddressError = (formError) => ({
//   type: actionTypes.DELETE_MEMBER_ADDRESS_ERROR,
//   formError,
// });
export const deleteMemberAddressSuccess = (data) => ({
  type: actionTypes.DELETE_MEMBER_ADDRESS_SUCCESS,
  data,
});

export const SubmitdeleteListMemberAddress = (id) => (dispatch) => {
  //  const dataStart = {
  //   loading:true,
  // };
  //   dispatch(deleteListMemberAddress(dataStart));
  const URL =
    constant.URL_MASTER_PATH + constant.URL_DELETE_MEMBER_DELIVERY_ADDRESS;
  axios
    .delete(`${URL}/${id}`)
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(deleteMemberAddressSuccess(dataSuccess));
      }
    })
    .catch((error) => {});
};
