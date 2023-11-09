import React from "react";
import Styles from "../CartShop/emptyCart.module.css";
import { BsHandbagFill } from "react-icons/bs";

export default function EmptyCart() {
  return (
    <div>
      <div className={Styles.containerBag}>
        <h1 className={Styles.carVacio}>Tu carrito esta vacío!</h1>
        <BsHandbagFill className={Styles.Bag} />
      </div>
    </div>
  );
}
