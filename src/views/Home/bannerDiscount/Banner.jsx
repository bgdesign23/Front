import React from "react";
import Style from "../bannerDiscount/banner.module.css";

export default function banner() {
  return (
    <div className={Style.banner}>
      <h2>
        * 20% Off - - Recorda que tenes disponible un descuento en tu primera
        compra ! - - 20% Off *
      </h2>
    </div>
  );
}
