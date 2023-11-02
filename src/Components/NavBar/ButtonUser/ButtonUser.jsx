import styles from "./ButtonUsers.module.css";
import { useNavigate } from "react-router-dom";

function ButtonUser() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/form/login");
    setMenuVisible(false);
  };

  const redirectToRegistro = () => {
    navigate("/form/register");
    setMenuVisible(false);
  };

  return (
    <div className={styles.Filters}>
      <select
        onChange={(event) => {
          if (event.target.value === "register") {
            redirectToRegistro();
          } else if (event.target.value === "login") {
            redirectToLogin();
          }
        }}
      >
        <option value="">Usuario</option>
        <option value="register">Registrarse</option>
        <option value="login">Iniciar Sesion</option>
      </select>
    </div>
  );
}

export default ButtonUser;
