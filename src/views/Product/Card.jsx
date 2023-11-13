import Rating from "../../Components/Rating/Rating";
import Styles from "../Product/card.module.css";
import { useNavigate } from "react-router-dom";
import Iconfavorites from "./favorites/Iconfavorites";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Card({ id, name, price, image, rating, comments }) {
  const PrecioEnCuota = (price / 12).toFixed(2);
  const navigate = useNavigate();

  function formatthousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      <div className={Styles.cardContainer}>
        <Iconfavorites />
        <img
          className={Styles.imagen}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />
        <Rating product={{ rating, comments }} />

        <h6 className={Styles.titulo}>{name}</h6>
        <div className={Styles.details}>
          <h6>Precio</h6>
          <h4>${formatthousand(price)}.-</h4>
        </div>
        <div className={Styles.cuota}>
          <h4>Paga en 12x ${PrecioEnCuota} </h4>
        </div>
      </div>
    </>
  );
}
