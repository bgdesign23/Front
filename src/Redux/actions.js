import axios from "axios";
import { GET_ALL_PRODUCTS, ORDERBYPRICE } from "../Redux/actionsTypes";
const URL = "http://localhost:3001";
// const URL = "https://backend-muebles.vercel.app/";

export const getProductsAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
        
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const orderbyprice = (product, orderDirection) => {
  try {
    const orderByprice = [...product];
    console.log(orderByprice);
    if (orderDirection === "Menor") {
      orderByprice.sort((a, b) => a.price - b.price);
    }
    if (orderDirection === "Mayor") {
      orderByprice.sort((a, b) => b.price - a.price);
    }

    return {
      type: ORDERBYPRICE,
      payload: orderByprice,
    };
  } catch (error) {
    console.log(error.message);
  }
}
