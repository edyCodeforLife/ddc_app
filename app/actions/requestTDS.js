import axios from 'axios';
import { message } from 'antd';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * POST Request TDS
 */
export const postRequestTDS = () => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeRequestTDS(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_REQUEST_TDS;
  axios
    .post(URL)
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeRequestTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeRequestTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeRequestTDS(dataError));
    });
};

/**
 * POST Open Close Store TDS
 */
export const postOpenCloseStoreTDS = () => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    formError: false,
  };
  dispatch(storeRequestTDS(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_OPEN_CLOSE_STORE_TDS;
  axios
    .post(URL)
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
          data: response.data.data,
        };
        dispatch(storeRequestTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storeRequestTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeRequestTDS(dataError));
    });
};

/**
 * GET TDS Inventory
 */
export const getTDSInventory = () => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    inventory: [],
  };
  dispatch(storeRequestTDS(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_TDS_INVENTORY;
  axios
    .get(URL, {})
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          inventory: response.data.data,
        };
        dispatch(storeRequestTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
        };
        dispatch(storeRequestTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storeRequestTDS(dataError));
    });
};

/**
 * GET TDS Orders
 */
export const getTDSOrders = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    orders: null,
  };
  dispatch(storeRequestTDS(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ORDER_TO_TDS;
  axios
    .get(URL, {
      params: {
        ...data,
        limit: 50, // limit unlimited
        sortby: 'id',
        order: 'desc',
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          orders: response.data.data,
        };
        dispatch(storeRequestTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
        };
        dispatch(storeRequestTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storeRequestTDS(dataError));
    });
};

/**
 * PUT Order To TDS
 * Change Order status
 */
export const putTDSOrder = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeRequestTDS(dataStart));
  let URL = constant.URL_MASTER_PATH + constant.URL_PUT_ORDER_TO_TDS;
  if (data.resiNumber) {
    URL = constant.URL_MASTER_PATH + constant.URL_PUT_ORDER_TO_TDS_RESI;
  }

  axios
    .put(URL + data.uuid, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeRequestTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true,
        };
        dispatch(storeRequestTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
        formError: true,
      };
      dispatch(storeRequestTDS(dataError));
    });
};

export const updateAdjustments = (data) => (dispatch) => {
  dispatch(storeAdjustments(data));
};

export const storeRequestTDS = (data) => ({
  type: actionTypes.REQUEST_TDS_STORE,
  data,
});

export const storeAdjustments = (data) => ({
  type: actionTypes.ADJUSTMENTS_STORE,
  data,
});

export const postStockAdjusment = (data) => (dispatch) => {
  const dataStart = {
    loading: true,
  };
  dispatch(storeRequestTDS(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_POST_ADJUSTMENT;
  axios
    .post(URL, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        message.success('Stok berhasil di update');
        dispatch(storeRequestTDS(dataSuccess));
      } else {
        const dataError = {
          loading: false,
        };
        message.error('Terjadi kesalahan');
        dispatch(storeRequestTDS(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      message.error('Terjadi kesalahan');
      dispatch(storeRequestTDS(dataError));
    });
};
