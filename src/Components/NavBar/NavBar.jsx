import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import logo from "../../images/logo.png";
import ButtonCarrito from "../SearchBar/ButtonCarrito/ButtonCarrito";
import { Link, useNavigate } from "react-router-dom";
import ButtonUserAuth from "./ButtonUser/ButtonUserAuth";
import ButtonUser from "./ButtonUser/ButtonUser";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <nav className={styles.navBar}>
      <section className={styles.sectionLeft}>
        <img
          onClick={() => navigate("/")}
          src={logo}
          className={styles.logo}
          alt="Black Group Design"
        />
      </section>

      <section className={styles.sectionRight}>
        <div className={styles.buttonsLogin}>
          {user && user.authenticated ? <ButtonUserAuth /> : <ButtonUser />}
        </div>

        {location.pathname !== "/CartShop" && <SearchBar />}

        <button type="button" className={styles.buttonCarrito}>
          <ButtonCarrito />
        </button>

        <div className={styles.buttonsNav}>
          <Link to="/" className={styles.navLink}>
            Inicio{" "}
          </Link>
          <Link to="/home/product">Productos</Link>
        </div>

        {user && user.user.role === 1 ? (
          <Link to="/home/nuevo">Nuevo Mueble</Link>
        ) : null}
      </section>
    </nav>
  );
};

export default NavBar;
