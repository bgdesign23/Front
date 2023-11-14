import { useNavigate } from "react-router-dom";
import styles from "./ButtonUsers.module.css";

function ButtonAuth() {
  const navigate = useNavigate();
  const redirectToUserProfile = () => {
    navigate("/form/perfil");
  };

  return (
    <div className={styles.Filters}>
      <button onClick={redirectToUserProfile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="500px"
          height="25px"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="7" r="5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7m10 2.5l1.5 1.5l2.5-3"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default ButtonAuth;
