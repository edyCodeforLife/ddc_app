import axios from 'axios';

import constant from '../utils/configs/constant';
import * as actionTypes from './actionTypes';

export const setDataProvince = (dataProvince) => ({
    type: actionTypes.SET_DATA_PROVINCE,
    dataProvince,
  });
  
  export const setDataCity = (dataCity) => ({
    type: actionTypes.SET_DATA_CITY,
    dataCity,
  });
  
  export const setDataDistrict = (dataDistrict) => ({
    type: actionTypes.SET_DATA_DISTRICT,
    dataDistrict,
  });

export const getDataProvince = () =>{
    const URL = constant.URL_MASTER_PATH + constant.URL_GET_PROVINCE;
    return (dispatch)=>{
      axios
      .get(URL)
      .then((response)=>{
        if(response.data.code === 200){
          dispatch(setDataProvince(response.data.data));
          console.log(response.data.data)
        }
      })
      .catch((error) => error);
    };
  };
  
//   export const getDataCity = (id) =>{
//     const URL = constant.URL_MASTER_PATH + constant.URL_GET_CITY;
//     return (dispatch)=>{
//       axios
//       .get(URL,{
//         id_city :id
//       })
//       .then((response)=>{
//         if(response.data.code === 200){
//           dispatch(setDataCity(response.data.data));
//           console.log(response.data.data)
//         }
//       })
//       .catch((error) => error);
//     };
//   };
  
//   export const getDataDistrict = (id) =>{
//     const URL = constant.URL_MASTER_PATH + constant.URL_GET_DISTRICT;
//     return (dispatch)=>{
//       axios
//       .get(URL,{
//         id_district : id
//       })
//       .then((response)=>{
//         if(response.data.code === 0){
//           dispatch(setDataDistrict(response.data.data));
//           console.log(response.data.data)
//         }
//       })
//       .catch((error) => error);
//     };
//   };