import style from "../Footer/Footer.module.css";
import logo from "../../../images/logosinfondo.png";
import mercadopago from "../../../images/mercadopago.png";

function Footer() {
  return (
    <footer className={style.Footer}>
      <section className={style.sectionFooterOne}>
        {/* <div className={style.imagenFooter}><img src={logo} /> </div> */}

        <div className={style.containerTeam}>
          <h4 className={style.textoTeam}>Equipo de Desarrollo</h4>
          <div className={style.TeamSection}>
            <div>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/valentina-perez-077611214/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Valentina Perez
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/agustina-solaberrieta-146b74277/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agustina Solaberrieta
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/bernardo-heduvan-b953b2231/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bernardo Heduvan
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/daniel-quinayas-tello/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Daniel Tello
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mayra-soledad-camiccia/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mayra Camiccia
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/matias-pablo-spano-102b24116/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Matias Spano
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/benjaminmuratore/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Benjamin Muratore
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={style.contactos}>
          <h4 className={style.contactoOne}>Contáctate con nosotros</h4>
          <ul className={style.listaContactos}>
            <li>+54 2477 456785</li>
            <li>bgd.grupo12@gmail.com</li>
            <li>instagram</li>
          </ul>
        </div>

        <div className={style.imagenFooter}>
          <img src={logo} />{" "}
        </div>
      </section>

      <section className={style.FooterCopyright}>
        <p> A© 2023 Black Group Design. Todos los derechos reservados </p>
      </section>

      <img src={mercadopago} alt="mercadopago" className={style.mercadopago} />
      <h4 className={style.metodoPago}>Metodos de Pagos</h4>
    </footer>
  );
}

export default Footer;
