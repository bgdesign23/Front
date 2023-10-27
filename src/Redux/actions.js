import axios from "axios";
import {
  CLEAR_DETAIL,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  CLEAR_PRODUCTS,
  FILTER_BY_COLOR,
  FILTER_BY_TYPE,
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES,
} from "../Redux/actionsTypes";

const URL = "http://localhost:3001";
// const URL = "https://backend-muebles.vercel.app";

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

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/products/${id}`);

      return dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const orderbyprice = (product, orderDirection) => {
  try {
    const orderByprice = [...product];
    // console.log(orderByprice);
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
};

export const filterByColor = (byColor, product) => {
    try {
      const filteredProducts = product.filter(prod => prod.color === byColor);
      return{
        type: FILTER_BY_COLOR, 
        payload: filteredProducts
      }
    } catch (error) {
      console.log("NO LO ESTA FILTRANDO");
    }
}

export const filteredByType = (products, selectedCategory) => {
  try {
    let orderedProducts;

    if (selectedCategory === "Hogar") {
      orderedProducts = products.filter(product => product.type === "Hogar");
    } else if (selectedCategory === "Oficina") {
      orderedProducts = products.filter(product => product.type === "Oficina");
    } else if (selectedCategory === "Comercial") {
      orderedProducts = products.filter(product => product.type === "Comercial");
    } else {
      // Si no se selecciona una categoría específica, mostrar todos los productos
      orderedProducts = products;
    }

    return {
      type: FILTER_BY_TYPE,
      payload: orderedProducts,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/products/search/${name}`);
      return dispatch({
        type: GET_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/categories`);
      console.log(data);
      return dispatch({
        type: GET_CATEGORIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterCategories = (category, product) => {
  try {
    const filteredProducts = product.filter(prod => prod.category.name === category);
    return{
      type: FILTER_BY_CATEGORIES, 
      payload: filteredProducts
    }
  } catch (error) {
    console.error(error);
  }
};

export const reset_ProductList = () => {
  return {
    type: CLEAR_PRODUCTS,
  };
};
