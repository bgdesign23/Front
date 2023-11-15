import { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { postFav } from "../../../Redux/actions";
import Styles from "../favorites/favorites.module.css";

const Iconfavorites = () => {
  const dispatch = useDispatch();
const product = useSelector((state) => state.product); 
  const user = useSelector((state) => state.user); 
  console.log("Estado del usuario:", user);

  const [favoriteStatus, setFavoriteStatus] = useState(false);

  const handleFav = () => {
    if (user.authenticated) {  
      setFavoriteStatus(!favoriteStatus);
      dispatch(postFav(product)); 
    } else {
      console.log("Usuario no autenticado");
    }
  };

  console.log("Estado de los productos:", product);

  const favClassName = favoriteStatus ? Styles.IconFavLiked : Styles.IconFav;


  return (
    <div className={favClassName} onClick={handleFav}>
      <BsSuitHeartFill />
    </div>
  );
};

export default Iconfavorites;
