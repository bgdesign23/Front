import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDesings } from "../../Redux/actions";
import FormaSvg from "./FormaSvg/FormaSvg";
import styles from "../Decoration/Decoration.module.css";

const Decoracion = () => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.desings);
  console.log(service);

  useEffect(() => {
    dispatch(getDesings());
  }, []);

  return (
    <div className={styles.contentContainer}>
      <section className={styles.contenedor}>
        {service.map((serv) => (
          <div className={styles.containerDeco}>
            <section className={styles.imgSection}>
              <img src={serv.image} alt={serv.name} />
            </section>

            <section className={styles.textSection}>
              <div className={styles.titleDeco}>
                <h1>{serv.name}</h1>
              </div>
              <div className={styles.textDeco}>
                <span>{serv.description}</span>
              </div>
              <div className={styles.estiloDeco}>
                <p>Estilo: {serv.type}</p>
              </div>
            </section>
            <div className={styles.buttonDeco}>
              <Link to="/form/decoracion">
                <button className={styles.boton}> Solicitar servicio </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Decoracion;
