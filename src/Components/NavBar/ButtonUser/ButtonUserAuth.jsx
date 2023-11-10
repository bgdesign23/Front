import { useNavigate } from "react-router-dom";
import styles from "./ButtonUsers.module.css";

function ButtonAuth() {
  const navigate = useNavigate();
  const redirectToUserProfile = () => {
    navigate("/form/perfil");
  };

  return (
    <div className={styles.Filters}>
      <button onClick={redirectToUserProfile}>Perfil</button>
    </div>
  );
}

export default ButtonAuth;
