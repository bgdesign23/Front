import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import logo from "../../images/logo.png";
import ButtonCarrito from "../SearchBar/ButtonCarrito/ButtonCarrito";
import ButtonUserAuth from "../../Components/NavBar/ButtonUser/ButtonUserAuth"
import ButtonUser from "../../Components/NavBar/ButtonUser/ButtonUser"
import {useSelector} from "react-redux"

const NavBar = () => {
  const authenticated = useSelector((state) => {
  return state.authenticated;
});
    return (
      <nav className={styles.navBar}>
       
             {authenticated ? (
              <button type="button" className={styles.buttonUser}>
        <ButtonUserAuth />
        </button>
      ) : (
        <button type="button" className={styles.buttonUser}>
          <ButtonUser/> </button>
       
      )}
        <img src={logo} className={styles.logo} alt="Logo"/>
        <SearchBar />
        <button type="button" className={styles.buttonCarrito}>
          <ButtonCarrito/>
</button>
          
      </nav>
 
    )

}

export default NavBar;

