import Menu from "../../userPerfil/Menu/Menu";
import Card from "../../Product/Card";
import { getFav, deleteFav } from "../../../Redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../Favorites/MyFavorites.module.css";
const MyFavs = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFav());
  }, [dispatch]);

  const handleDeleteFav = (id) => {
    dispatch(deleteFav(id));
  };

  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <Menu />
      </div>
      <div className={Styles.boxRight}>
        <div className={Styles.containerFavortite}>
          {favorites?.map((product) => (
            <div key={product.id} className={Styles.containerProduct}>
              <Card
                id={product.id}
                name={product.name}
                description={product.description}
                types={product.type}
                stock={product.stock}
                price={product.price}
                image={product.image}
                material={product.material}
                color={product.color}
              />
              <button
                onClick={() => handleDeleteFav(product.id)}
                className={Styles.buttonDelete}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFavs;
