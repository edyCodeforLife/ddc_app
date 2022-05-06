import axios from 'axios';
import { message } from 'antd';
import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const postUploadImage = (upload) => (dispatch) => {
  const dataStart = {
    loading: true,
  };
  dispatch(storeUploadImage(dataStart));
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_IMAGE;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(URL, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        imagePath: response.data.data,
      };
      dispatch(storeUploadImage(dataSuccess));
      if (response.data.message === 'File is not image') {
        message.error('Hanya Dapat Upload Gambar!!');
      }
    })
    .catch((error) => {});
};

export const postUploadImageProfile = (upload) => (dispatch) => {
  const dataStart = {
    loading: true,
  };
  dispatch(storeUploadImage(dataStart));
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_PROFILE_IMAGE;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(URL, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        imagePath: response.data.data,
      };
      dispatch(storeUploadImage(dataSuccess));
      if (response.data.message === 'File is not image') {
        message.error('Hanya Dapat Upload Gambar!!');
      }
    })
    .catch((error) => {});
};


export const postUploadImageStore = (upload) => (dispatch) => {
  const dataStart = {
    loading: true,
  };
  dispatch(storeUploadImage(dataStart));
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_UPLOAD_STORE_IMAGE;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(URL, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        imagePath: response.data.data,
      };
      dispatch(storeUploadImage(dataSuccess));
      if (response.data.message === 'File is not image') {
        message.error('Hanya Dapat Upload Gambar!!');
      }
    })
    .catch((error) => {});
};

export const postUploadImageIDcard = (upload) => (dispatch) => {
  const dataStart = {
    loading: true,
  };
  dispatch(storeUploadImage(dataStart));
  // console.log('Upload Init');
  // console.log(upload);
  const formData = new FormData();
  formData.append('image', upload);
  // console.log(formData);

  const URL = constant.URL_MASTER_PUBLIC_PATH + constant.URL_IDCARD_IMAGE;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios
    .post(URL, formData, config)
    .then((response) => {
      // console.log(response);
      const dataSuccess = {
        loading: false,
        imagePath: response.data.data,
      };
      dispatch(storeUploadImage(dataSuccess));
      if (response.data.message === 'File is not image') {
        message.error('Hanya Dapat Upload Gambar!!');
      }
    })
    .catch((error) => {});
};

export const storeUploadImage = (data) => ({
  type: actionTypes.UPLOAD_IMAGE_STORE,
  data,
});
