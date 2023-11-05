import fondo from "../../../images/home7.jpg";
import style from "../Home.module.css";
import CarruselMobile from "../CarruselMobile/CarruselMobile";

export default function Seccion1() {
  return (
    <div className={style.primerseccion}>
      <div className={style.quienes}>
        <h1>¿Quienes</h1>
        <h1>Somos?</h1>
        <p className={style.texto}>
          Black Group Desing es una empresa familiar,
          <br />
          Somos una empresa dedicada a la venta de muebles y diseño de espacios,
          con una rica y amplia trayectoria que se remonta a casi 80 años atrás.
          Nuestra historia comienza con un joven soñador italiano que llegó a
          una tierra nueva, llena de ilusiones y sueños por cumplir. Hoy, sus
          bisnietos continuamos con este proyecto, brindándole un enfoque actual
          y actualizando la creación de muebles para adaptarla a los estándares
          contemporáneos.
          <br />
        </p>
      </div>
      <div className={style.imagen}>
        <img src={fondo} className={style.fondocontainer} />
      </div>

      <CarruselMobile className={style.carruselMobile} />

      <div className={style.textPrinc}>
        <h1>¡HOLA!</h1>
      </div>

      <p className={style.mobileText}>
        ¡Bienvenidos a Black Group Design, tu destino de elección para encontrar
        muebles excepcionales y diseño de espacios inspiradores! Somos una
        empresa familiar apasionada por brindar soluciones de decoración únicas
        que transformarán tus espacios en verdaderos hogares!
      </p>
    </div>
  );
}
