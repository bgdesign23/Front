import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import Styles from "../favorites/favorites.module.css";

export default function Iconfavorites() {
  const [fav, setFav] = useState(false);

  const handleFav = () => {
    setFav(!fav);
  };

  return (
    <div className={fav ? Styles.IconFavLiked : Styles.IconFav}>
      <AiFillHeart onClick={handleFav} />
    </div>
  );
}
