import muebles from "../../../images/muebles.jpg";
import decoracion from "../../../images/deco.jpg";
import { useNavigate } from "react-router-dom";
import style from "../Home.module.css";

export default function Seccion3() {
  const navigate = useNavigate();
  return (
    <section className={style.contenedor}>
      <h1>Servicios</h1>

      <article className={style.servicios}>
        <div className={style.servicio}>
          <img
            src={muebles}
            alt="Muebles"
            onClick={() => navigate("/home/product")}
            className={style.muebles}
          />
          <h1>MUEBLES</h1>
        </div>

        <div className={style.servicio}>
          <img
            src={decoracion}
            alt="Decoración"
            onClick={() => navigate("/home/decoracion")}
            className={style.muebles}
          />
          <h1>DECORACION</h1>
        </div>
      </article>
    </section>
  );
}
