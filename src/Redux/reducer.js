import { GET_ALL_PRODUCTS,  ORDERBYPRICE } from "./actionsTypes";

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

    default:
      return {...state};
  }
};

export default Reducer;
