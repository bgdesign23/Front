import axios from "axios";
import Swal from "sweetalert2";
import {
  CLEAR_DETAIL,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_DETAIL,
  ORDERBYPRICE,
  CLEAR_PRODUCTS,
  GET_BY_HASHTAG,
  FILTER_BY_COLOR,
  FILTER_BY_TYPE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FILTER_RESTART,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES,
  FILTER_BY_MATERIAL,
  GET_DESING,
  SET_USER,
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
    const filteredProducts = product.filter((prod) => prod.color === byColor);
    return {
      type: FILTER_BY_COLOR,
      payload: filteredProducts,
    };
  } catch (error) {
    console.log("NO LO ESTA FILTRANDO");
  }
};

export const filteredByType = (products, selectedCategory) => {
  try {
    let orderedProducts;
    
    if (selectedCategory === "Hogar") {
      orderedProducts = products.filter((product) => product.type === "Hogar");
    } else if (selectedCategory === "Oficina") {
      orderedProducts = products.filter(
        (product) => product.type === "Oficina",
      );
    } else if (selectedCategory === "Comercial") {
      orderedProducts = products.filter(
        (product) => product.type === "Comercial",
      );
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

export const getByHashtag = (hashtag) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}/products/searchByHashtag/${hashtag}`
      );
      return dispatch({
        type: GET_BY_HASHTAG,
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
    const filteredProducts = product.filter(
      (prod) => prod.category.name === category
    );
    return {
      type: FILTER_BY_CATEGORIES,
      payload: filteredProducts,
    };
  } catch (error) {
    console.error(error);
  }
};

export const reset_ProductList = () => {
  return {
    type: CLEAR_PRODUCTS,
  };
};

export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${URL}/users/register`, userData);
    await Swal.fire({
      title: "¡Registro exitoso!",
      text: "Usuario registrado exitosamente.",
      icon: "success",
    });
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    navigate("/form/login");
  } catch (error) {
    await Swal.fire({
      title: "Hubo un problema",
      text: error.response.data.error,
      icon: "error",
    });
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.message,
    });
  }
};

export const filterRestart = () => (dispatch) => {
  dispatch({ type: FILTER_RESTART });
};

export const loginUser = (credentials, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${URL}/users/login`, credentials);
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    await Swal.fire({
      title: `¡Hola ${response.data.user.username}!`,
      text: "Has iniciado sesión correctamente",
      icon: "success",
    });
    navigate("/");
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    await Swal.fire({
      title: "Error al iniciar sesión",
      text: error.response.data.error,
      icon: "error",
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    let response = await axios.post(`${URL}/users`, {}, config);
    dispatch({
      type: SET_USER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const response = await axios.put(`${URL}/users/${userData.id}`, userData);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.message,
    });
  }
};

export const logoutUser = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  navigate("/form/login");
  dispatch({ type: LOGOUT });
};

export const filterByMaterial = (byMaterial, product) => {
  try {
    const filterMaterial = product.filter((mat) => mat.material === byMaterial);
    return {
      type: FILTER_BY_MATERIAL,
      payload: filterMaterial,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getDesings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/designs`);

      return dispatch({
        type: GET_DESING,
        payload: data,
      });
    } catch (error) {
      console.log("No esta llegando la info");
    }
  };
};

export const postProduct = (formData, navigate) => {
  return async function (dispatch) {
    try {
      await axios.post(`${URL}/products/create`, formData);
      dispatch(getProductsAction());
      dispatch(getCategories());
      await Swal.fire({
        title: "¡Creación exitosa!",
        text: "Producto agregado correctamente.",
        icon: "success",
      });
      await Swal.fire({
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Agregar otro producto",
        denyButtonText: "Ver Productos",
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          navigate("/home/product");
        }
      });
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
};
