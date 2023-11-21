import Menu from "../../userPerfil/Menu/Menu";
import Card from "../../Product/Card";
import { deleteFav } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../Favorites/MyFavorites.module.css";

const MyFavs = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user)

  const handleDeleteFav = (Favoriteid) => {
    dispatch(deleteFav(Favoriteid, user?.user.id));
  };

  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <Menu />
      </div>
      <div className={Styles.boxRight}>
        <div className={Styles.containerFavortite}>
          {favorites && favorites.length ? favorites.map((product) => (
            <div key={product.id} className={Styles.containerProduct}>
              <Card
                Favoriteid={product.Favoriteid}
                id={product.id}
                name={product.name}
                description={product.description}
                types={product.type}
                stock={product.stock}
                price={product.price}
                image={product.image}
                material={product.material}
                color={product.color}
                rating={product.rating}
                category={product.category}
                comments={product.comments}
              />
              <button
                onClick={() => handleDeleteFav(product.Favoriteid)}
                className={Styles.buttonDelete}
              >
                Eliminar
              </button>
            </div>
          )) : <div className={Styles.divEmpty}>No tiene favoritos</div>}
        </div>
      </div>
    </div>
  );
};

export default MyFavs;
