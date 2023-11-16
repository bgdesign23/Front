import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFav } from "../../../Redux/actions";
import { BsSuitHeartFill } from "react-icons/bs";
import Styles from "../favorites/favorites.module.css";

export default function Iconfavorites({id, name, type, material,description, price, stock, color, image}) {
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const productData = {
    id,
    userId: user?.user.id,
    name,
    type,
    material,
    description,
    price,
    stock,
    color,
    image
  }
  
  const handleFav = () => {
    console.log("Entra al handle?: ", productData);
    setFav(!fav);
    dispatch(postFav(productData))
    console.log("Esto llega hasta acá?");
  };
  

  return (
    <div className={fav ? Styles.IconFavLiked : Styles.IconFav}>
      <BsSuitHeartFill onClick={handleFav} />
    </div>
  );
}
