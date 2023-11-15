import Styles from "../CartShop/cartCard.module.css";
import { useNavigate } from "react-router-dom";
import ButtonDelete from "./ButtonDelete";

function CartCard({
  id,
  name,
  image,
  amount,
  totalPriceProduct,
  deleteProduct,
  handleAmount_Up,
  handleAmount_Down,
  formatthousand,
  disableDecreaseButton,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className={Styles.CartCard_Container}>
        <div className={Styles.imagen_container}>
          <img
            className={Styles.imagen}
            src={image}
            alt=""
            onClick={() => navigate(`/detail/${id}`)}
          />
        </div>
        <div className={Styles.name_container}>
          <h2>{name}</h2>
        </div>
        <div className={Styles.botonera}>
          <div className={Styles.cantidad_Container}>
            <button
              disabled={disableDecreaseButton}
              onClick={() => handleAmount_Down(id)}
              className={Styles.botonesCantidad}
            >
              {" "}
              -{" "}
            </button>
            <div className={Styles.numero}>
              <p>{amount}</p>
            </div>
            <button
              onClick={() => handleAmount_Up(id)}
              className={Styles.botonesCantidad}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <div className={Styles.details}>
            <h3>${formatthousand(totalPriceProduct)}</h3>
          </div>

          <div className={Styles.eliminar} onClick={() => deleteProduct(id)}>
            <ButtonDelete />
            <h6>Eliminar</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
