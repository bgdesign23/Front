import {
  CLEAR_DETAIL,
  FILTER_BY_COLOR,
  GET_ALL_PRODUCTS,
  EDIT_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES,
  CLEAR_PRODUCTS,
  GET_BY_HASHTAG,
  FILTER_BY_TYPE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FILTER_RESTART,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  LOGOUT,
  FILTER_BY_MATERIAL,
  GET_DESING,
  SET_USER,
  CREATE_COUPON, 
  GET_USER_COUPONS, 
  APPLY_COUPON,
  COUPONS_ERROR,
  GET_ALL_USERS,
  GET_ADMIN,
  EDIT_ADMIN,
  CLEAR_ERRORS,
  DELETE_PRODUCT,
  DELETE_USER,
  RESTORE_USER,
  CARTS_REQUEST,
  CARTS_SUCCESS,
  CARTS_FAILURE,
  EDIT_USERS,
  RESTORE_PRODUCTS,
  GET_CARTS,
  CLEAN_CARTS,
} from "./actionsTypes";

let initialState = {
  products: [],
  products_Copy: [],
  error: null,
  products_Details: {},
  user: null,
  loading: false,
  categories: [],
  categories_Copy: [],
  desings: [],
  desings_Copy: [],
  userCoupons: [], 
  appliedCoupons: [],
  users: [],
  users_copy: [],
  admin: [],
  admin_copy: [],
  errors: {},
  carts: [],
  carts_copy: []
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: state.products.map(prod =>
          prod.id === action.payload.prod.id
          ? {...prod, ...action.payload.updateData }
          : prod),
        products_Copy: action.payload,
      };
      case EDIT_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        products_Copy: action.payload
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload,
        products_Copy: action.payload
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        users_copy: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        users: action.payload,
        users_copy: action.payload
      }
    case EDIT_USERS:
      return{
        ...state,   
        users:action.payload,
        users_copy: action.payload     
      }
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
        admin_copy: action.payload,
      }; 
    case EDIT_ADMIN:
      return {
        ...state,
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
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categories_Copy: action.payload,
      };
    case FILTER_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload,        
      };
    case FILTER_BY_COLOR:
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        products: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        products: action.payload,
        products_Copy: action.payload
      };
    case GET_BY_HASHTAG:
      return {
        ...state,
        products: action.payload,
      };
    case CLEAR_PRODUCTS:      
      return {
        ...state,
        products: [...state.products_Copy],
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
        loading: false,
        error: null,
        
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
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
      authenticated: true, 

      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    case FILTER_BY_MATERIAL:
      return {
        ...state,
        products: action.payload,
        products_Copy: action.payload
      };
    case GET_DESING:
      return {
        ...state,
        desings: action.payload,
        desings_Copy: action.payload,
      };

 case CREATE_COUPON:
      return {
        ...state,
        userCoupons: [...state.userCoupons, action.payload],
      };

    case GET_USER_COUPONS:
      return {
        ...state,
        userCoupons: action.payload,
      };

    case APPLY_COUPON:
      return {
        ...state,
        appliedCoupons: [...state.appliedCoupons, action.payload],
      };
       case COUPONS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case RESTORE_USER:
      return{
        ...state,
        users: action.payload,
        users_copy: action.payload
      };
    case RESTORE_PRODUCTS:
      return{
        ...state,
        products: action.payload,
        products_Copy: action.payload
      };
    case GET_CARTS:
      return{
        ...state,
        carts: action.payload,
        carts_copy: action.payload
      };
      case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

      case CARTS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case CARTS_SUCCESS:
        return {
          loading: false,
          carts: action.payload.carts,
          error: ''
        };
      case CARTS_FAILURE:
        return {
          loading: false,
          carts: [],
          error: action.payload
        };
        case CLEAN_CARTS:
      return {
        ...state,
        carts: [],
      };
            
    default:
      return { ...state };
  }
};

export default Reducer;
