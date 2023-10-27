import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import logo from "../../images/logo.png";



const NavBar = () => {

    return (
      <nav className={styles.navBar}>
      <div className={styles.placeholder}></div>
      {/* <div className={styles.logoContainer}>
          <img src={logo} className={styles.logo} alt="Logo"/>
      </div> */}
      <div className={styles.placeholder}></div>
      <SearchBar/>
  </nav>
    )

}

export default NavBar;