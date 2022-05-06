import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  form: null,
};

const registrationFormStart = (state, action) =>
  updateObject(state, { form: action.form, loading: true });

const registrationFormSuccess = (state, action) =>
  // const newOrder = updateObject(action.orderData, { id: action.orderId });
  updateObject(state, {
    loading: false,
    // purchased: true,
    // orders: state.orders.concat(newOrder),
  });

const registrationFormFail = (state, action) =>
  updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LANDING_PAGE_REGISTRATION_FORM_START:
      return registrationFormStart(state, action);
    case actionTypes.LANDING_PAGE_REGISTRATION_FORM_SUCCESS:
      return registrationFormSuccess(state, action);
    case actionTypes.LANDING_PAGE_REGISTRATION_FORM_FAIL:
      return registrationFormFail(state, action);
    default:
      return state;
  }
};

export default reducer;
