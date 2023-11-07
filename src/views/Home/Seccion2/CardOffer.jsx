import { useNavigate } from "react-router-dom";
import Styles from "./CardOffer.module.css";

export default function CardOffer({ id, name, price, image, stock }) {
  const navigate = useNavigate();
  return (
    <div className={Styles.fondoOffer}>
      <div className={Styles.cardContainer}>
        <div className={Styles.offerMessage}>Oferta</div>

        <img
          className={Styles.imagen}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />

        <h2 className={Styles.nombre}>{name}</h2>

        <div className={Styles.details}>
          <h2>Precio</h2>
          <h4>${price}.-</h4>
        </div>
      </div>
    </div>
  );
}
