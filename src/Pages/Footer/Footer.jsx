import style from "../Footer/Footer.module.css"

function Footer() {
    return (
      <footer className={style.Footer}>
        <div>
          <img 
            src='../../../public/BG_Design_sin_fondo.png'
            alt="Logo"
            className={style.Logo}></img>
        </div>
        <div>
          <p>Equipo de Desarrollo</p>
            <div className={style.TeamSection}>
              <div>
                
                  <ul>            
                    <li>Valentina Perez</li>
                    <li>Agustina Solaberrieta</li>
                    <li>Bernardo Heduvan</li>
                    <li>Daniel Tello</li>
                  </ul>
              </div>
              <div>
                <ul>
                  <li>Mayra Camiccia</li>
                  <li>Matias spano</li>
                  <li>Benjamin Muratore</li>            
                </ul>
              </div>
            </div>
        </div>
        <div>
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
        
    );
  }
  
  export default Footer;