/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { deleteFav, postFav } from "../../../Redux/actions";
import { BsSuitHeartFill } from "react-icons/bs";
import Styles from "../favorites/favorites.module.css";
import Swal from "sweetalert2";

export default function Iconfavorites({id, name, type, material, description, price, stock, color, image, rating, amount, comments, category}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const favorites = useSelector((state) => state.favorites)

  const productData = {
    userId: user?.user.id,
    id,
    name,
    type,
    material,
    description,
    price,
    stock,
    color,
    image,
    rating,
    amount,
    comments,
    category
  }

  const handleFav = () => {
    if (!user) {
      Swal.fire({
        title: "Usuario no autorizado",
        text: "Debes iniciar sesión para agregar el producto a favoritos",
        icon: "warning",
        background: "#3b3838",
        color: "#ffffff",
        timer: 3000,
      });
    } else {
      if (!findId(id)) {
        dispatch(postFav(productData))
      } else {
        const found = favorites.find(product=>product.id == id);
        const favoriteid = found.Favoriteid;
        const Favoriteid = favoriteid;
        dispatch(deleteFav(Favoriteid, user?.user.id))
      }
    }
  };

  const findId = (id) => {
    const found = favorites.some(product=>product.id == id)
    return found
  }

  return (
    <div className={findId(id) ? Styles.IconFavLiked : Styles.IconFav}>
      <BsSuitHeartFill onClick={handleFav} />
    </div>
  );
}
