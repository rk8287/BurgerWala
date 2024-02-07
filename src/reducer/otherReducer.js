import { CLEAR_ERROR, CLEAR_MESSAGE } from "../constant/orderConstant";
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../constant/userConstant";


export const contactDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case CONTACT_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CONTACT_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload, // Change state.state to state.message
        };
  
      case CONTACT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
  
      case CLEAR_MESSAGE:
        return {
          ...state,
          message: null,
        };
  
      default:
        return state;
    }
  };