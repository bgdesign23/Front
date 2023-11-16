import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDesings } from "../../Redux/actions";
// import FormaSvg from "./FormaSvg/FormaSvg";
import styles from "../Decoration/Decoration.module.css";
import logoWhatsapp from "../Detail/whatsapp (1).png";

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
              <button className={styles.boton}>
                <a
                  href="https://wa.me/5492477399289/?text=¡Hola!%20Quisiera%20más%20información%20sobre%20los%20servicios%20de%20decoración.%20✨"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsappLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: "7px",
                  }}
                >
                  Contactar por WhatsApp
                  <img
                    src={logoWhatsapp}
                    alt=""
                    style={{
                      width: "26px",
                      height: "26px",
                      marginLeft: "10px",
                    }}
                  />
                </a>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Decoracion;
