<<<<<<< Updated upstream
import {
  CLEAR_DETAIL,
  FILTER_BY_COLOR,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  FILTER_BY_CATEGORIES,
  CLEAR_PRODUCTS,
  FILTER_BY_TYPE
} from "./actionsTypes";
=======
import { CLEAR_DETAIL,  FILTER_BY_COLOR,  GET_ALL_PRODUCTS,  GET_DETAIL,  ORDERBYPRICE } from "./actionsTypes";
>>>>>>> Stashed changes

let initialState = {
  products: [],
  error: null,
  products_Details: {},
  category: [],
  products_Copy: []
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
<<<<<<< Updated upstream
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
=======
        products: action.payload
      }
>>>>>>> Stashed changes

    default:
      return { ...state };
  }
};

export default Reducer;
