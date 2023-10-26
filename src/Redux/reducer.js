import { CLEAR_DETAIL, GET_ALL_PRODUCTS,  GET_DETAIL,  ORDERBYPRICE } from "./actionsTypes";

let initialState = {
  products: [],
  error: null,
  products_Details: {},
  category: [],
  products_Copy: [],
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
      return{
        ...state,
        products: action.payload,

      }  
    case GET_DETAIL: 
      return{
        ...state, 
        products_Details: action.payload
      }
    case CLEAR_DETAIL:
      return{
        ...state, 
        products_Details: {}
      }

    default:
      return {...state};
  }
};

export default Reducer;
