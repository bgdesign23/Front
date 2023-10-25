import Styles from "../Product/card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, price, image,}) {
  

  return (
    <>
      <div className={Styles.cardContainer}>
       <Link to={`/detail/${id}`}>
          <img className={Styles.imagen} src={image} alt="" />
       </Link> 
       

        <div className={Styles.details}>
          <h2>{name}</h2>
          <h3>${price}</h3>
        </div>
        <button>Agregar al Carrito</button>
      </div>
    </>
  );
}
