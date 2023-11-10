import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import Styles from "../favorites/favorites.module.css";

export default function Iconfavorites() {
  const [fav, setFav] = useState(false);

  const handleFav = () => {
    setFav(!fav);
  };

  return (
    <div className={fav ? Styles.IconFavLiked : Styles.IconFav}>
      <BsSuitHeartFill onClick={handleFav} />
    </div>
  );
}
