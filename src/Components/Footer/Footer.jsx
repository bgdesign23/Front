import style from "../Footer/Footer.module.css";
import logo from "../../images/logosinfondo.png";


function Footer() {
    return (
     <div className={style.mainContent}>
      <footer className={style.Footer}>
        <div className={style.imagenFooter}>
          <img src={logo}/>
        </div>
        <div>
          <p className={style.textoTeam}>Equipo de Desarrollo</p>
            <div className={style.TeamSection}>
              <div>
                  <ul>            
                    <li>
                      <a 
                      href="https://www.linkedin.com/in/valentina-perez-077611214/"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Valentina Perez
                      </a>

                     </li>
                    <li>
                      <a
                      href="https://www.linkedin.com/in/agustina-solaberrieta-146b74277/"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Agustina Solaberrieta</a>
                      </li>

                    <li>
                      <a
                      href="https://www.linkedin.com/in/bernardo-heduvan-b953b2231/"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Bernardo Heduvan</a>
                      </li>
                    <li>
                      <a 
                      href="https://www.linkedin.com/in/daniel-quinayas-tello/"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Daniel Tello
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
                    >Mayra Camiccia
                    </a>
                    </li>
                  <li>
                    <a
                    href="https://www.linkedin.com/in/matias-pablo-spano-102b24116/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Matias Spano</a>
                   </li>
                  <li>
                    <a
                    href="https://www.linkedin.com/in/benjaminmuratore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Benjamin Muratore
                    </a>
                    </li>            
                </ul>
              </div>
            </div>
        </div>
        <div className={style.contactos}>
          <p>Contáctate con nosotros</p>
            <ul>
              <li>+54 2477 456785</li>
              <li>bgd.grupo12@gmail.com</li>
              <li>instagram</li>
            </ul>
        </div>
        <div className={style.FooterCopyright}>
          <p> A© 2023 Black Group Design. Todos los derechos reservados </p>
        </div>
      </footer>
      </div>     
    );
  }
  
  export default Footer;