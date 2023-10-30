import { useNavigate } from "react-router-dom";
import Styles from "./CardOffer.module.css";

export default function CardOffer({ id, name, price, image }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={Styles.cardContainer}>
        <div className={Styles.offerMessage}>Oferta</div>

        <img
          className={Styles.imagen}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />

        <h2>{name}</h2>

        <div className={Styles.details}>
          <h3>${price}</h3>
        </div>
        <button>Agregar al Carrito</button>
      </div>
    </>
  );
}
