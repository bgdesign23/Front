import repisa from "../../../images/repisa1.jpg";
import repisas from "../../../images/repisa2.jpg";
import style from "../Home.module.css";

export default function Seccion1() {
  return (
    <section className={style.primerseccion}>
      <div className={style.quienes}>
        <h1>¿Quienes</h1>
        <h1>Somos?</h1>
      </div>

      <span className={style.texto}>
        Black Group Desing es una empresa familiar,
        <br />
        dedicada a la venta de muebles y diseño de espacios.
      </span>

      <article>
        <img src={repisa} className={style.repisa} />
        <img src={repisas} className={style.repisas} />
      </article>
    </section>
  );
}
