import muebles from "../../../images/muebles.jpg";
import decoracion from "../../../images/deco.jpg";
import { useNavigate } from "react-router-dom";
import style from "../Home.module.css";

export default function Seccion3() {
  const navigate = useNavigate();
  return (
    <section className={style.contenedor}>
      <h1>Nuestros Servicios</h1>

      <div className={style.servicios}>
        <div className={style.servicio}>
          <div className={style.deco}>
            <img
              src={muebles}
              alt="Muebles"
              onClick={() => navigate("/home/product")}
              className={style.muebles}
            />
          </div>
          <h1>MUEBLES</h1>
        </div>

        <div className={style.servicio}>
          <div className={style.deco}>
            <img
              src={decoracion}
              alt="Decoración"
              onClick={() => navigate("/home/decoracion")}
              className={style.muebles}
            />
          </div>
          <h1>DECORACION</h1>
        </div>
      </div>
    </section>
  );
}
