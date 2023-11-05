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
        <button onClick={() => navigate("/")} className={styles.btn}>
          Inicio
        </button>
        <button
          onClick={() => navigate("/home/product")}
          className={styles.btn}
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

      {user && user.user.role === 1 ? (
        <Link to="/home/nuevo">Nuevo Mueble</Link>
      ) : null}
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
