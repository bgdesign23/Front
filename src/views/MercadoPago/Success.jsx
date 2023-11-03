import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart, getUser } from "../../Redux/actions";
import styles from "./Success.module.css";
import { useNavigate } from "react-router-dom";

function Success() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = localStorage.getItem("cart");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onClick_Handler = () => {
    dispatch(createCart(cart, user.token));
    navigate("/home/product");
  };

  return (
    <div className={styles.divSuccess}>
      <button onClick={onClick_Handler}>Compra exitosa. Haga clic aquí para continuar</button>
    </div>
  );
}

export default Success;
