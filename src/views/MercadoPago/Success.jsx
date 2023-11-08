/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart, getUser } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./Success.module.css";
import Swal from "sweetalert2";

function Success() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = localStorage.getItem("cart");
  const products = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();
  const [sweet, setSweet] = useState(false);
  let totalPriceSum = 0;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser());
      setSweet(true);
    };
    fetchData();
    return () => localStorage.removeItem("cart");
  }, [dispatch]);

  useEffect(() => {
    if (sweet) {
      Swal.fire({
        title: "¡Compra realizada con éxito!",
        icon: "success",
        background: "#3b3838",
        color: "#ffffff",
        showConfirmButton: false,
        timer: 3000,
      })
      dispatch(createCart(cart, user.token));
    }
  }, [sweet]);

  return (
    <div className={styles.divSuccess}>
      <h1 className={styles.h1}>Resumen de la compra</h1>
      <div>{products.map((product, index) => {
        const totalPrice = product.price * product.amount;
        totalPriceSum += totalPrice;
        return (
        <div className={styles.h2} key={index}>
          <img className={styles.img} key={index} src={product.image} alt={product.name} title={product.name}/>
          Nombre: {product.name}
          Descripción: {product.description}
          Categoría: {product.category.name}
          Ambiente: {product.type}
          Precio: {product.price} x {product.amount} = {totalPrice}
        </div>
        )})}
        <h2 className={styles.h2}>
          Valor total de la compra = ${totalPriceSum}
        </h2>
      </div>
      <button className={styles.btn} onClick={() => navigate("/home/product")}>
        Volver
      </button>
      <button className={styles.btn} onClick={() => navigate("/form/perfil")}>
        Ver historial de compras
      </button>
    </div>
  );
}

export default Success;
