// start update profil
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
  listBank: {},
  formData: null,
  loading: false,
  formError: [],
  formSuccess: false,
};

const editProfilStart = (state, action) =>
  updateObject(state, { loading: true});

const deleteMemberAddressSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });

const editProfilSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });

const editProfilStore = (state, action) =>
  updateObject(state, { formData: action.data });

const editProfilPhotoStore = (state, action) =>
  updateObject(state, {
    formData: action.data,
    formSuccess: true,
    loading: false,
  });

const editProfilReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

// const editProfilResetLoading = (state, action) =>
// updateObject(state, { loading: false});

const editProfilError = (state, action) =>
  updateObject(state, {
    formError: action.formError,
    loading: false,
  });

const editTokoError = (state, action) =>
  updateObject(state, {
    formError: action.formError,
    loading: false,
  });

const TokoPostStore = (state, action) =>
  updateObject(state, { formData: action.data });

const editTokoStoreName = (state, action) =>
  updateObject(state, { formData: action.data });

const storeDetailProfil = (state, action) =>
  updateObject(state, { formData: action.data });

const editTokoProfilStore = (state, action) => updateObject(state, action.data);

const updateProfilTokoStart = (state, action) =>
  updateObject(state, { formData: action.data, loading: true });

const updateProfilTokoError = (state, action) =>
  updateObject(state, { formError: action.formError, loading: false });

const storeProfilAddBank = (state, action) =>
  updateObject(state, { formData: action.data });

const storeUpdateBank = (state, action) =>
  updateObject(state, { formData: action.data });

const storeAddAddress = (state, action) =>
  updateObject(state, { formData: action.data });
const storePhotoIdCardNumber = (state, action) =>
  updateObject(state, action.data);

const editTokoStore = (state, action) =>
  updateObject(state, { loading: true, formError: [] });
const storeUpdateAddress = (state, action) =>
  updateObject(state, { loading: true, formError: [] });
const editTokoSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });

const editTokoReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const editTokoPostStart = (state, action) =>
  updateObject(state, { loading: true, formError: [] });

const editTokoPostSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });

const editTokoPostReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const addProfilBankReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });
const addProfilBankStart = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });
const addProfilBankSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const addProfilBankError = (state, action) =>
  updateObject(state, { loading: false, formError: action.formError });

const editTokoProfilReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });
const editTokoProfilStartImage = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });
const editTokoProfilSuccessImage = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const editTokoProfilErrorImage = (state, action) =>
  updateObject(state, { loading: false, formError: action.formError });

const updatePhotoStore = (state, action) =>
  updateObject(state, { formData: action.data });

const addAddressStart = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });
const addAddressSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const addAddressError = (state, action) =>
  updateObject(state, { loading: false, formError: true });
const addAddressReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const updateAddressStart = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });
const updateAddressSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const updateAddressError = (state, action) =>
  updateObject(state, { loading: false, formError: true });
const updateAddressReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const updateBankStart = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });
const updateBankSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const updateBankError = (state, action) =>
  updateObject(state, { loading: false, formError: true });
const updateBankReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const storeGetListBank = (state, action) =>
  updateObject(state, { listBank: action.data });

const storeUpdateMemberAddress = (state, action) => ({
  ...state,
  formData: Object.assign({}, state.formData, action.data),
});
const updateMemberAddressStart = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });

// const updateMemberAddressStartDummy = (state, action) =>
//   updateObject(state, formData.{ , formSuccess: false });

const updateMemberAddressSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const updateMemberAddressError = (state, action) =>
  updateObject(state, { loading: false, formError: true });
const updateMemberAddressReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

const storeUpdateVerification = (state, action) =>
  updateObject(state, { formData: action.data });
const updateVerificationStart = (state, action) =>
  updateObject(state, { loading: true, formSuccess: false });
const updateVerificationSuccess = (state, action) =>
  updateObject(state, { loading: false, formSuccess: true });
const updateVerificationError = (state, action) =>
  updateObject(state, { loading: false, formError: true });
const updateVerificationReset = (state, action) =>
  updateObject(state, { loading: false, formSuccess: false });

// end update profil
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_LIST_MEMBER_ADDRESS:
      // const newData = Object.assign([], state.formData);
      const newData = state.formData.memberDeliveryAddress;
      newData.splice(action.data, 1);
      return updateObject(state, {
        formData: {
          memberDeliveryAddress: newData,
        },
      });
    case actionTypes.UPDATE_PHOTO_STORE:
      return updatePhotoStore(state, action);
    case actionTypes.DELETE_MEMBER_ADDRESS_SUCCESS:
      return deleteMemberAddressSuccess(state, action);
    case actionTypes.STORE_PHOTO_ID_CARD_NUMBER:
      return storePhotoIdCardNumber(state, action);
    case actionTypes.UPDATE_VERIFICATION_START:
      return updateVerificationStart(state, action);
    case actionTypes.UPDATE_VERIFICATION_SUCCESS:
      return updateVerificationSuccess(state, action);
    case actionTypes.UPDATE_VERIFICATION_ERROR:
      return updateVerificationError(state, action);
    case actionTypes.UPDATE_VERIFICATION_RESET:
      return updateVerificationReset(state, action);
    case actionTypes.STORE_UPDATE_VERIFICATION:
      return storeUpdateVerification(state, action);
    case actionTypes.UPDATE_MEMBER_ADDRESS_START:
      return updateMemberAddressStart(state, action);
    case actionTypes.UPDATE_MEMBER_ADDRESS_SUCCESS:
      return updateMemberAddressSuccess(state, action);
    case actionTypes.UPDATE_MEMBER_ADDRESS_ERROR:
      return updateMemberAddressError(state, action);
    case actionTypes.UPDATE_MEMBER_ADDRESS_RESET:
      return updateMemberAddressReset(state, action);
    case actionTypes.STORE_UPDATE_MEMBER_ADDRESS:
      return storeUpdateMemberAddress(state, action);
    case actionTypes.UPDATE_BANK_START:
      return updateBankStart(state, action);
    case actionTypes.STORE_GET_LIST_BANK:
      return storeGetListBank(state, action);
    case actionTypes.UPDATE_BANK_SUCCESS:
      return updateBankSuccess(state, action);
    case actionTypes.UPDATE_BANK_ERROR:
      return updateBankError(state, action);
    case actionTypes.UPDATE_BANK_RESET:
      return updateBankReset(state, action);
    case actionTypes.STORE_UPDATE_BANK:
      return storeUpdateBank(state, action);
    case actionTypes.UPDATE_ADDRESS_START:
      return updateAddressStart(state, action);
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
      return updateAddressSuccess(state, action);
    case actionTypes.UPDATE_ADDRESS_ERROR:
      return updateAddressError(state, action);
    case actionTypes.UPDATE_ADDRESS_RESET:
      return updateAddressReset(state, action);
    case actionTypes.STORE_UPDATE_ADDRESS:
      return storeUpdateAddress(state, action);
    case actionTypes.ADD_ADDRESS_START:
      return addAddressStart(state, action);
    case actionTypes.ADD_ADDRESS_SUCCESS:
      return addAddressSuccess(state, action);
    case actionTypes.ADD_ADDRESS_ERROR:
      return addAddressError(state, action);
    case actionTypes.STORE_ADD_ADDRESS:
      return storeAddAddress(state, action);
    case actionTypes.ADD_ADDRESS_RESET:
      return addAddressReset(state, action);
    case actionTypes.EDIT_TOKO_PROFIL_START_IMAGE:
      return editTokoProfilStartImage(state, action);
    case actionTypes.EDIT_TOKO_PROFIL_SUCCESS_IMAGE:
      return editTokoProfilSuccessImage(state, action);
    case actionTypes.EDIT_TOKO_PROFIL_ERROR_IMAGE:
      return editTokoProfilErrorImage(state, action);
    case actionTypes.EDIT_TOKO_PROFIL_RESET:
      return editTokoProfilReset(state, action);
    case actionTypes.ADD_PROFIL_BANK_START:
      return addProfilBankStart(state, action);
    case actionTypes.EDIT_TOKO_PROFIL_STORE:
      return editTokoProfilStore(state, action);
    case actionTypes.ADD_PROFIL_BANK_SUCCESS:
      return addProfilBankSuccess(state, action);
    case actionTypes.ADD_PROFIL_BANK_ERROR:
      return addProfilBankError(state, action);
    case actionTypes.ADD_PROFIL_BANK_RESET:
      return addProfilBankReset(state, action);
    case actionTypes.EDIT_TOKO_POST_START:
      return editTokoPostStart(state, action);
    case actionTypes.EDIT_TOKO_POST_SUCCESS:
      return editTokoPostSuccess(state, action);
    case actionTypes.EDIT_TOKO_POST_ERROR:
      return editTokoPostError(state, action);
    case actionTypes.EDIT_TOKO_POST_RESET:
      return editTokoPostReset(state, action);
    case actionTypes.STORE_DETAIL_PROFIL:
      return storeDetailProfil(state, action);
    case actionTypes.STORE_PROFIL_ADD_BANK:
      return storeProfilAddBank(state, action);
    case actionTypes.EDIT_TOKO_STORE_NAME:
      return editTokoStoreName(state, action);
    case actionTypes.TOKO_POST_STORE:
      return TokoPostStore(state, action);
    case actionTypes.STORE_DETAIL_PROFIL:
      return storeDetailProfil(state, action);
    case actionTypes.EDIT_TOKO_POST_START:
      return editTokoPostStart(state, action);
    case actionTypes.EDIT_TOKO_SUCCESS:
      return editTokoSuccess(state, action);
    case actionTypes.EDIT_TOKO_ERROR:
      return editTokoError(state, action);
    case actionTypes.EDIT_TOKO_RESET:
      return editTokoReset(state, action);
    case actionTypes.EDIT_PROFIL_START:
      return editProfilStart(state, action);
    case actionTypes.EDIT_PROFIL_SUCCESS:
      return editProfilSuccess(state, action);
    case actionTypes.EDIT_PROFIL_STORE:
      return editProfilStore(state, action);
    case actionTypes.EDIT_PROFIL_PHOTO_STORE:
      return editProfilPhotoStore(state, action);
    case actionTypes.EDIT_PROFIL_RESET:
      return editProfilReset(state, action);
    case actionTypes.EDIT_PROFIL_ERROR:
      return editProfilError(state, action);
    default:
      return state;
  }
};
export default reducer;
