import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";
import ButtonUserAuth from "./ButtonUser/ButtonUserAuth";
import ButtonUser from "./ButtonUser/ButtonUser";

// eslint-disable-next-line react/prop-types
const SideBar = ({ isOpen }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.open : ""}`}>
      <Link to="/">Inicio</Link>
      <Link to="/home/product">Productos</Link>
      {user && user.user.role === 1 ? (
        <Link to="/home/nuevo">Nuevo Mueble</Link>
      ) : null}

      <div className={styles.divUser}>
        {user && user.authenticated ? <ButtonUserAuth /> : <ButtonUser />}
      </div>
    </div>
  );
};

export default SideBar;
