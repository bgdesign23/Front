import { useNavigate } from "react-router-dom";
import styles from "./NotFound404.module.css";
import error from "../../images/error.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.general}>
      <div className={styles.divNotFound}>
        <div>
          <img src={error} className={styles.imageError} />
        </div>
        <button className={styles.notFound} onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
