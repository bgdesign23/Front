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
    <div>
      <button
        type="button"
        className={styles.buttonUser}
        onClick={handleButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1H1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      {menuVisible && (
        <div className={styles.divUsers}>
          <button onClick={redirectToLogin} className={styles.menuButton}>
            Iniciar sesión
          </button>
          <button onClick={redirectToRegistro} className={styles.menuButton}>
            Registrarse
          </button>
        </div>
      )}
    </div>
  );
}

export default ButtonUser;
