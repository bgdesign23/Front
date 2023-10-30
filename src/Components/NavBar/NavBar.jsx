import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import logo from "../../images/logo.png";
import ButtonCarrito from "../SearchBar/ButtonCarrito/ButtonCarrito";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <img src={logo} className={styles.logo} alt="Black Group Design" />
      {location.pathname !== "/CartShop" &&
      <SearchBar />
  }
      <button type="button" className={styles.buttonCarrito}>
        <ButtonCarrito />
      </button>
    </nav>
  );
};

export default NavBar;
