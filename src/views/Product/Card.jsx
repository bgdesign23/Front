import Styles from "../Product/card.module.css";
import { useNavigate } from "react-router-dom";

export default function Card({ id, name, price, image }) {
  const navigate = useNavigate();

  return (
    <>
      <div className={Styles.cardContainer}>
        <img
          className={Styles.imagen}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />

        <h2>{name}</h2>

        <div className={Styles.details}>
          <h2>Precio</h2>
          <h4>${price}.-</h4>
        </div>
      </div>
    </>
  );
}
