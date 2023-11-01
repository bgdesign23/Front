import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import logo from "../../images/logo.png";
import ButtonCarrito from "../SearchBar/ButtonCarrito/ButtonCarrito";
import { useNavigate } from "react-router-dom";
import ButtonUserAuth from "./ButtonUser/ButtonUserAuth";
import ButtonUser from "./ButtonUser/ButtonUser";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <nav className={styles.navBar}>
    
          {user && user.authenticated ? <ButtonUserAuth /> : <ButtonUser />}

      <img
        onClick={() => navigate("/")}
        src={logo}
        className={styles.logo}
        alt="Black Group Design"
      />
       

      {location.pathname !== "/CartShop" && <SearchBar />}

      <button type="button" className={styles.buttonCarrito}>
        <ButtonCarrito />
      </button>

    </nav>
  );
};

export default NavBar;
