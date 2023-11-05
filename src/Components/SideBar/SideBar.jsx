import { Link, useNavigate } from "react-router-dom";
import styles from "../SideBar/SideBar.module.css";

const SideBar = ({ isOpen }) => {
  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.open : ""}`}>
      <Link to="/">Inicio</Link>
      <Link to="/home/product">Productos</Link>
    </div>
  );
};

export default SideBar;
