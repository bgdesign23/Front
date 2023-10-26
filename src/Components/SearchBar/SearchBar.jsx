import { useParams } from "react-router-dom";
import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getByName } from "../../Redux/actions";

const SearchBar = () => {
const {name} = useParams();
const dispatch = useDispatch();
const [nombre, setNombre] = useState(name || "");


useEffect(() => {
    if(name){
        dispatch(getByName(name))}
    }, [name])
    

const handleName = (event) => {
    setNombre(event.target.value);
}

const handleSearch = () => {
    if(nombre){
        dispatch(getByName(nombre));
    }
}

    return (
        <div className={styles.searchBar}>
            <input type="text" onChange={handleName}/>
            <button type="submit" onClick={handleSearch}>Buscar</button>
        </div>
    )

}

export default SearchBar