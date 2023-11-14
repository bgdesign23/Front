import { useNavigate } from "react-router-dom";
import Styles from "./CardOffer.module.css";

export default function CardOffer({ id, name, price, image, stock }) {
  const navigate = useNavigate();
  return (
    <div className={Styles.fondoOffer}>
      <div className={Styles.cardContainerOffer}>
        <div className={Styles.offerMessage}>Oferta</div>

        <img
          className={Styles.imagenOffer}
          src={image}
          alt=""
          onClick={() => navigate(`/detail/${id}`)}
        />

        <h3 className={Styles.nombreOffer}>{name}</h3>

        <div className={Styles.detailsOffer}>
          <span>Precio</span>
          <h4>${price}.-</h4>
        </div>
      </div>
    </div>
  );
}
