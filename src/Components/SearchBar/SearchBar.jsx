import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  reset_ProductList,
  getByHashtag,
  getByName,
} from "../../Redux/actions";

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
    handleSearch();
    navigate(`/home/product`);
  };

  const handle_input = (event) => {
    setSearchState(event.target.value);
  };

  const handle_reset = () => {
    dispatch(reset_ProductList());
  };

  return (
    <div className={styles.searchBar_Container}>
      <form onSubmit={handle_Submit}>
        <input type="text" value={searchState} onChange={handle_input} />
        <button type="submit">Search</button>
        <button type="button" onClick={handle_reset}>
          clean
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
