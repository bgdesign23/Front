
import {
  CLEAR_DETAIL,
  FILTER_BY_COLOR,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  FILTER_BY_CATEGORIES,
  CLEAR_PRODUCTS,
  FILTER_BY_TYPE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FILTER_RESTART,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./actionsTypes";


let initialState = {
  products: [],
  error: null,
  products_Details: {},
  category: [],
  products_Copy: [],
  user: null, 
  loading: false
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        products_Copy: action.payload,
      };

    case ORDERBYPRICE:
      return {
        ...state,
        products: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        products_Details: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        products_Details: {},
      };
    case FILTER_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_BY_COLOR:
      return {
        ...state,
       products: action.payload
      };
    case FILTER_BY_TYPE:
        return{
          ...state,
           products: action.payload,
        }
    case GET_BY_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: state.products_Copy,
      };
case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FILTER_RESTART:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
  
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
    default:
      return { ...state };
  }
};

export default Reducer;
