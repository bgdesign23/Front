import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getByName, getByHashtag } from "../../Redux/actions";
import ButtonSearch from "./ButtonSearch/ButtonSearch";

const SearchBar = () => {
  const copy = useSelector((state) => state.products_Copy);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState("");

  const handleSearch = () => {
    dispatch(getByName(searchState));
    if (products.length !== copy.length) {
      dispatch(getByHashtag(searchState));
    }
  };

  const handle_Submit = (event) => {
    event.preventDefault();
    if (searchState.trim() !== "") {
      handleSearch();
      navigate(`/home/product`);
    }
  };

  const handle_input = (event) => {
    setSearchState(event.target.value);
  };

  return (
    <div className={styles.searchBar_Container}>
      <form onSubmit={handle_Submit}>
        <input
          className={styles.lineInput}
          placeholder="Buscar "
          type="text"
          value={searchState}
          onChange={(event) => handle_input(event)}
        />
      </form>
      <div className={styles.buttonSearch}>
        <button
          type="submit"
          disabled={searchState.trim() === ""}
          className={styles.noStyleButton}
          onClick={(event) => handle_Submit(event)}
        >
          <ButtonSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
