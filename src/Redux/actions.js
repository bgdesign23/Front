import axios from "axios";
import Swal from "sweetalert2";
import {
  CLEAR_DETAIL,
  GET_ALL_PRODUCTS,
  EDIT_PRODUCTS,
  RESTORE_PRODUCTS,
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
  CREATE_COUPON,
  GET_USER_COUPONS,
  APPLY_COUPON,
  COUPONS_ERROR,
  GET_ALL_USERS,
  DELETE_USER,
  RESTORE_USER,
  DELETE_COUPON,
  DELETE_PRODUCT,
  CLEAR_ERRORS,
  GET_ADMIN,
  CREATE_ADMIN,
  DELETE_ADMIN,
  RESTORE_ADMIN,
  EDIT_ADMIN,
} from "../Redux/actionsTypes";

import { URL } from "../utils/toggleUrl";

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

export const editProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL}/products/${id}`);
      return dispatch({
        type: EDIT_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    };
  };
};

export const restoreProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/products/restore/${id}`);
      return dispatch({
        type: RESTORE_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/products/delete/${id}`);
      const { data } = await axios.get(`${URL}/products`);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/users`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/users/${id}`);
      const { data } = await axios.get(`${URL}/users`);
      return dispatch({
        type: DELETE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const restoreUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/users/restore/${id}`);
      return dispatch({
        type: RESTORE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAdmin = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin`);
      return dispatch({
        type: GET_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createAdmin = (admin) => {
  return {
    type: CREATE_ADMIN,
    payload: admin,
  };
};

export const restoreAdmin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/admin/restore/${id}`);
      return dispatch({
        type: RESTORE_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    };
  };
};

export const editAdmin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL}/admin/${id}`);
      return dispatch({
        type: EDIT_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    };
  };
};

export const deleteAdmin =  (id) => {
  return async (dispatch) => {
  try {
    const { data } = await axios.delete(`${URL}/admin/delete/${id}`)
    return dispatch({
      type: DELETE_ADMIN,
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
        (product) => product.type === "Oficina"
      );
    } else if (selectedCategory === "Comercial") {
      orderedProducts = products.filter(
        (product) => product.type === "Comercial"
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
      showConfirmButton: false,
      timer: 3000,
      background: "#3b3838",
      color: "#ffffff",
    });
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    navigate("/form/login");
  } catch (error) {
    await Swal.fire({
      title: "Error al registrarse 🤔",
      text: error.response.data.error,
      icon: "error",
      background: "#3b3838",
      color: "#ffffff",
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
    if (response.data.user.cart.products) {
      localStorage.setItem("cart", response.data.user.cart.products[0]);
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    await Swal.fire({
      title: `¡Hola ${response.data.user.username}! 👋`,
      text: "Has iniciado sesión exitosamente",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
      background: "#3b3838",
      color: "#ffffff",
    });
    navigate("/");
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    await Swal.fire({
      title: "Error al iniciar sesión 😧",
      text: error.response.data.error,
      icon: "error",
      background: "#3b3838",
      color: "#ffffff",
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

export const updateUser = (formData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const response = await axios.put(`${URL}/users`, formData, config);
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
    await Swal.fire({
      title: "Cambios realizados exitosamente",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
      background: "#3b3838",
      color: "#ffffff",
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.message,
    });
    await Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      background: "#3b3838",
      color: "#ffffff",
    });
  }
};

export const logoutUser = (navigate) => (dispatch) => {
  Swal.fire({
    icon: "warning",
    title: "Te vas? 😢",
    showDenyButton: true,
    confirmButtonText: "Así es",
    denyButtonText: "Volver",
    confirmButtonColor: "#d10a06",
    denyButtonColor: "#394754",
    background: "#3b3838",
    color: "#ffffff",
  }).then(async (result) => {
    if (result.isConfirmed) {
      dispatch(saveCart());
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      navigate("/form/login");
      dispatch({ type: LOGOUT });
    }
  });
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
        title: "¡Creación exitosa! 😎",
        text: "Producto agregado exitosamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        background: "#3b3838",
        color: "#ffffff",
      });
      await Swal.fire({
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Agregar otro producto",
        denyButtonText: "Ver Productos",
        confirmButtonColor: "#394754",
        denyButtonColor: "#394754",
        background: "#3b3838",
        color: "#ffffff",
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
        background: "#3b3838",
        color: "#ffffff",
      });
    }
  };
};

export const googleUser = (payload) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: payload,
      });
      if (payload.user.cart?.products) {
        localStorage.setItem("cart", payload.user.cart.products[0]);
      }
      localStorage.setItem("token", payload.token);
      await Swal.fire({
        title: `¡Hola ${payload.user.username}! 👋`,
        text: "Has iniciado sesión exitosamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        background: "#3b3838",
        color: "#ffffff",
      });
    } catch (error) {
      await Swal.fire({
        title: "Hubo un error al iniciar con google",
        text: error.response.data.error,
        icon: "error",
        background: "#3b3838",
        color: "#ffffff",
      });
    }
  };
};

export const createCoupon = (coupon) => {
  return {
    type: CREATE_COUPON,
    payload: coupon,
  };
};

export const deleteCoupon = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}/coupon/delete/${id}`);
      return dispatch({
        type: DELETE_COUPON,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUserCoupons = () => {
  return (dispatch) => {
    axios
      .get(`${URL}/coupon`)
      .then((response) => {
        dispatch({
          type: GET_USER_COUPONS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: COUPONS_ERROR,
          payload: error.response.data,
        });
      });
  };
};

export const applyCoupon = (couponCode) => {
  return {
    type: APPLY_COUPON,
    payload: couponCode,
  };
};

export const createPreference = (cart) => {
  return async () => {
    try {
      const response = await axios.post(`${URL}/payment/create-order`, cart);
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("Error al crear la preferencia:", error);
      return null;
    }
  };
};

export const createCart = (cart, token) => {
  return async function () {
    try {
      const config = {
        headers: {
          authorization: token,
        },
      };
      await axios.post(`${URL}/payment/success`, [cart], config);
    } catch (error) {
      await Swal.fire({
        title: "Hubo un error al crear el carrito",
        text: error.response.data.error,
        icon: "error",
        background: "#3b3838",
        color: "#ffffff",
      });
    }
  };
};

export const saveCart = () => {
  return async function () {
    const token = localStorage.getItem("token");
    const cart = localStorage.getItem("cart");
    try {
      const config = {
        headers: {
          authorization: token,
        },
      };
      await axios.post(`${URL}/payment/save`, [cart], config);
    } catch (error) {
      await Swal.fire({
        title: "Hubo un error al guardar el carrito",
        text: error.response.data.error,
        icon: "error",
        background: "#3b3838",
        color: "#ffffff",
      });
    }
  };
};

export function clearErrors() {
  return async function (dispatch) {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
}

export const requestPasswordResetAction = (result, navigate) => {
	return async function () {
		try {
			const response = await axios.post(`${URL}/users/request-password-reset`, result);
			await Swal.fire({
        title: "¡Pedido de recuperación enviado!",
        text: "Por favor ingresa a tu correo y sigue los pasos para restablecer tu contraseña",
        icon: "success",
        background: "#3b3838",
        color: "#ffffff",
      });
			if (response.data.redirectUrl) {
        window.open('https://accounts.google.com/', '_blank');}
        navigate("/form/login");
		} catch (error) {
			await Swal.fire({
				title: "Hubo un error al enviar petición para restablecer la contraseña",
        text: error.response.data.error,
				icon: 'error',
        background: "#3b3838",
        color: "#ffffff",
			});
      navigate("/form/login");
		}
	};
};

export const confirmPasswordReset = (token, password) => {
	return async function () {
		try {
			const result = await axios.post(`${URL}/users/password-reset`, {
				password,
        token,
			});
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 5000,
        background: "#3b3838",
        color: "#ffffff",
			});
		} catch (error) {
			await Swal.fire({
				title: "Hubo un error al confirmar el restablecimiento de la contraseña",
        text: error.response.data.error,
				icon: 'error',
        background: "#3b3838",
        color: "#ffffff",
			});
		}
	};
};