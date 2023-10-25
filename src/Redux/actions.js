import axios from "axios";
import { GET_ALL_PRODUCTS } from "./actionsTypes";
// const URL = "http://localhost:3001/";
const URL = "https://backend-muebles.vercel.app/";

export const getProductsAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/product`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: console.log("no anda el action de getProductsAction"),
      });
    }
  };
};
