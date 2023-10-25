import Styles from "../Product/card.module.css";
import { useNavigate } from "react-router-dom";

export default function Card({ id, name, type, price, image, category }) {
  const navigate = useNavigate();

  //completing number id with 4 zeros
  let id_ = String(id).padStart(4, "0");
  //if number is more than 4 digits should cut the number in 4
  let numeroId = id_.substring(0, 4);

  return (
    <>
      <div className={Styles.cardContainer}>
        <div onClick={() => navigate(`/detail/${id}`)}>
          <img className={Styles.imagen} src={image} alt="" />
        </div>

        <div className={Styles.details}>
          <h1>id:{numeroId}</h1>
          <h2>{name}</h2>
          <h3>Tipo:{type}</h3>
          <h3>Precio:{price}</h3>
          <h3>categoria:{category} </h3>
        </div>
      </div>
    </>
  );
}
