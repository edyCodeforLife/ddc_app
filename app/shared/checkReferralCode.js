/**
 * checkReferralCode.js
 * Created by @anonymoussc on 07/05/2018 3:13 PM.
 */

import axios from 'axios';
import constant from '../utils/configs/constant';

const refcode = (id) => {
  const url = `${constant.URL_MASTER_PATH + constant.URL_GET_REFERAL_CODE}/${id}`;

  return axios.get(url);
};

export default refcode;
