import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getByName, reset_ProductList } from "../../Redux/actions";
import ButtonSearch from "./ButtonSearch/ButtonSearch";
import ButtonCarrito from "./ButtonCarrito/ButtonCarrito";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState("");

  const handle_Submit = (event) => {
    event.preventDefault();
    dispatch(getByName(searchState));
    navigate(`/home/product`);
  };

  const handle_input = (event) => {
    setSearchState(event.target.value);
  };

 
  return (
    <div className={styles.searchBar_Container}>
      <form onSubmit={handle_Submit}>
        <input className={styles.lineInput}  placeholder="Buscar "type="text" value={searchState} onChange={handle_input} />

      </form>
        <button type="submit" className={styles.noStyleButton}>
          <ButtonSearch/>
        </button>
    </div>
  );
};

export default SearchBar;
