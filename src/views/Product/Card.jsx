import Rating from "../../Components/Rating/Rating";
import Styles from "../Product/card.module.css";
import { useNavigate } from "react-router-dom";

export default function Card({ id, name, price, image }) {
  const navigate = useNavigate();

  const PrecioEnCuota = (price / 12).toFixed(2);

  return (
    <>
      <div className={Styles.cardContainer}>
        <img
          className={Styles.imagen}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />

        <Rating />

        <h2>{name}</h2>

        <div className={Styles.details}>
          <h2>Precio</h2>
          <h4>${price}.-</h4>
        </div>
        <div className={Styles.cuota}>
          <h4>Paga en 12x ${PrecioEnCuota} </h4>
        </div>
      </div>
    </>
  );
}
