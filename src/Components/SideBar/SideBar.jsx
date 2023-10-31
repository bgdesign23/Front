import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";
import ButtonUserAuth from "./ButtonUser/ButtonUserAuth";
import ButtonUser from "./ButtonUser/ButtonUser";

const SideBar = ({ isOpen, closeSideBar }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.open : ""}`}>
      <Link to="/" onClick={closeSideBar}>
        Inicio
      </Link>
      <Link to="/home/product" onClick={closeSideBar}>
        Productos
      </Link>
      {user && user.user.role === 1 ? (
        <Link to="/home/nuevo" onClick={closeSideBar}>
          Nuevo Mueble
        </Link>
      ) : null}

      <div className={styles.divUser}>
        {user && user.authenticated ? <ButtonUserAuth /> : <ButtonUser />}
      </div>
    </div>
  );
};

export default SideBar;
