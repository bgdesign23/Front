
import {
  CLEAR_DETAIL,
  FILTER_BY_COLOR,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES,
  CLEAR_PRODUCTS,
  FILTER_BY_TYPE
} from "./actionsTypes";


let initialState = {
  products: [],
  products_Copy: [],
  error: null,
  products_Details: {},
  categories: [],
  categories_Copy: [],
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
      case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categories_Copy: action.payload,
      };
    case FILTER_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload
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


    default:
      return { ...state };
  }
};

export default Reducer;
