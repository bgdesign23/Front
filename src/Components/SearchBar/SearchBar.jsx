import styles from "../SearchBar/SearchBar.module.css";
const SearchBar = () => {

    return (
        <div className={styles.searchBar}>
            <input type="text"/>
            <button type="submit">Buscar</button>
        </div>
    )

}

export default SearchBar