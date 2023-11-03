import fondo from "../../../images/home7.jpg";
import style from "../Home.module.css";
import logo from "../../../images/home8.png";
export default function Seccion1() {
  return (
    <div className={style.primerseccion}>
      <div className={style.quienes}>
        {/* <img className={style.logo} src={logo} /> */}
        <h1>¿Quienes</h1>
        <h1>Somos?</h1>
        <p className={style.texto}>
          Black Group Desing es una empresa familiar,
          <br />
          dedicada a la venta de muebles y diseño de espacios. dedicada a la
          venta de muebles y diseño de espacios. dedicada a la venta de muebles
          y diseño de espacios. dedicada a la venta de muebles y diseño de
          espacios.
          <br /> aca hay que poner chamuyo
        </p>
      </div>

      <div className={style.imagen}>
        <img src={fondo} className={style.fondocontainer} />
      </div>
    </div>
  );
}
