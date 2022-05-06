import axios from 'axios';
import _ from 'lodash';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

/**
 * GET Transactions
 */
export const getTransactions = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
    transactions: [],
  };
  dispatch(storeTransaction(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_ORDER_PAYMENTS;
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
          transactions: response.data.data,
        };
        dispatch(storeTransaction(dataSuccess));
      } else {
        const dataError = {
          loading: false,
        };
        dispatch(storeTransaction(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storeTransaction(dataError));
    });
};

/**
 * GET Shipment Tracking
 */
export const getShipmentTracking = (data) => (dispatch) => {
  const URL = constant.URL_MASTER_PATH + constant.URL_GET_SHIPMENT_TRACKING;
  axios
    .get(URL, {
      params: {
        ...data,
      },
    })
    .then((response) => {
      if (response.data.shippingManifest.length > 0) {
        // Add prop createAt
        let trackingsUnsorted = response.data.shippingManifest.map((track) => {
          track.createAt = track.manifestDate.concat(' ', track.manifestTime);
          return track;
        });

        // Sort createAt asc
        trackingsUnsorted = _.sortBy(trackingsUnsorted, ['createAt']);

        const dataSuccess = {
          trackings: {
            [data.id]: trackingsUnsorted,
          },
        };
        dispatch(storeShipmentTracking(dataSuccess));
      }
    })
    .catch((error) => {});
};

/**
 * PUT Change Order Status
 * Change Order status
 */
export const putOrderStatus = (data) => (dispatch) => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeTransaction(dataStart));
  const URL = constant.URL_MASTER_PATH + constant.URL_PUT_ORDER_TO_TDS;

  axios
    .put(URL + data.uuid, JSON.stringify(data))
    .then((response) => {
      if (response.data.code === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
        };
        dispatch(storeTransaction(dataSuccess));
      } else {
        const dataError = {
          loading: false,
        };
        dispatch(storeTransaction(dataError));
      }
    })
    .catch((error) => {
      const dataError = {
        loading: false,
      };
      dispatch(storeTransaction(dataError));
    });
};

export const storeTransaction = (data) => ({
  type: actionTypes.TRANSACTION_STORE,
  data,
});

export const storeShipmentTracking = (data) => ({
  type: actionTypes.TRACKING_STORE,
  data,
});
