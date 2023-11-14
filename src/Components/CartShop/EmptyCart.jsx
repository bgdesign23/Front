import Styles from "../CartShop/emptyCart.module.css";
import { BsHandbagFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={Styles.containerBag} onClick={() => navigate("/home/product")}>
        <h1 className={Styles.carVacio}>Tu carrito esta vacío!</h1>
        <BsHandbagFill className={Styles.Bag}/>
      </div>
    </div>
  );
}
