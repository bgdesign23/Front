import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getByName, reset_ProductList } from "../../Redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState("");

  const handle_Submit = (event) => {
    event.preventDefault();
    console.log(searchState);
    dispatch(getByName(searchState));
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
