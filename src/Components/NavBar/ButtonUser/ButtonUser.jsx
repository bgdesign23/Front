import styles from "./ButtonUsers.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ButtonUser() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const redirectToLogin = () => {
    navigate("/form/login");
    setMenuVisible(false);
  };

  const redirectToRegistro = () => {
    navigate("/form/register");
    setMenuVisible(false);
  };

  const handleButtonClick = () => {
    toggleMenu();
  };

  return (
    <div className= {styles.btn}>
      <div  onClick={handleButtonClick}>
        Usuario No Registrado
        {menuVisible ? "▲" : "▼"} 
      </div>

      {menuVisible && (
        <div >
          <button onClick={redirectToRegistro} >
                               Registrarse          </button>
          <button onClick={redirectToLogin}>
            Iniciar Sesion
          </button>
        </div>
      )}
    </div>
  );
  
}

export default ButtonUser;
