

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFav, deleteFav } from "../../../Redux/actions"; 
import Product from "../../Product/Product"; 
import Styles from "./Favorites.module.css"


const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => (state.favorite ? state.favorite.product : []) || []);
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product); 

  useEffect(() => {
  dispatch(postFav());
}, [dispatch]);

  const handleAddToFavorites = (productId) => {
    console.log("product.id:", productId);
    dispatch(postFav(productId));
  };
  
  const handleRemoveFromFavorites = (productId) => {
    dispatch(deleteFav(productId));
  };

 
  return (
    <div className={Styles.boxRight}>
      <h1>{favorites.length > 0 ? 'Tus Favoritos' : 'Aún no tienes favoritos'}</h1>
      <div className={Styles.h1Compras}>
        {favorites.map((favProduct) => (
  <Product
    key={favProduct.id}
    id={favProduct.id}
    name={favProduct.name}
    description={favProduct.description}
    types={favProduct.type}
    stock={favProduct.stock}
    price={favProduct.price}
    image={favProduct.image}
    category={favProduct.CategoryId}
    amount={favProduct.amount}
    isFavorite={() => handleAddToFavorites(favProduct.id)}
    toggleFavorite={() => handleRemoveFromFavorites(favProduct.id)}
  />
))}
      </div>
    </div>
  );
};

export default Favorites;