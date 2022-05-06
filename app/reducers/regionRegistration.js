import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  formData: null,
};

const setDataProvince = (state, action)=>
updateObject(state,{formData:action.dataProvince,
});

const setDataCity = (state, action)=>
updateObject(state,{dataCity:action.dataCity,
});

const setDataDistrict = (state, action)=>
updateObject(state,{dataDistrict:action.dataDistrict,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_PROVINCE:
      return setDataProvince(state,action);
    case actionTypes.SET_DATA_CITY:
      return setDataCity(state,action);
    case actionTypes.SET_DATA_DISTRICT:
      return setDataDistrict(state,action);
    default:
      return state;
  }
};

export default reducer;
