import SearchBar from "../../Components/SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
const NavBar = () => {

    return (
        <nav className={styles.navBar}>
          <div>
            <SearchBar/>
          </div>
        </nav>
    )

}

export default NavBar;