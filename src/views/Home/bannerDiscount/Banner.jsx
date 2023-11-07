import React from "react";
import Style from "../bannerDiscount/banner.module.css";

export default function banner() {
  return (
    <div className={Style.banner}>
      <h2>
        Recorda que tenes disponible un descuento del 20% en tu primera compra !
      </h2>
    </div>
  );
}
