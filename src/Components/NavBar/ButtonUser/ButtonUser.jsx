import styles from "./ButtonUsers.module.css";
import { useNavigate } from "react-router-dom";

function ButtonUser() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/form/login");
  };

  return (
    <div className={styles.Filters}>
      <button onClick={redirectToLogin}>Iniciar Sesion</button>
    </div>
  );
}

export default ButtonUser;
