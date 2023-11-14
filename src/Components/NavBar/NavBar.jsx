import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import logo from "../../images/home9.png";
import ButtonCarrito from "../SearchBar/ButtonCarrito/ButtonCarrito";
import { Link, useNavigate } from "react-router-dom";
import ButtonUserAuth from "./ButtonUser/ButtonUserAuth";
import ButtonUser from "./ButtonUser/ButtonUser";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className={styles.navBar}>
      <div className={styles.uno}>
        <div className={styles.user}>
          {user && user.authenticated ? <ButtonUserAuth /> : <ButtonUser />}
        </div>
      </div>
      <div className={styles.dos}>
        <button
          onClick={() => navigate("/")}
          className={`${styles.btn} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Inicio
        </button>
      </div>
      <div className={styles.dos}>
        <button
          onClick={() => navigate("/home/product")}
          className={`${styles.btn} ${
            location.pathname === "/home/product" ? styles.active : ""
          }`}
        >
          Productos
        </button>
      </div>

      <div className={styles.tres}>
        <img
          onClick={() => navigate("/")}
          src={logo}
          className={styles.logo}
          alt="Black Group Design"
        />
      </div>
      <div className={styles.cuatro}>
        <SearchBar />
      </div>
      <button className={styles.buttonCarrito}>
        <ButtonCarrito />
      </button>
    </div>
  );
};

export default NavBar;
