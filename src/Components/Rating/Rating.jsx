import { useState } from "react";
import Styles from "../../Components/Rating/Rating.module.css";
import { AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { putReview } from "../../Redux/actions";
import Filter from "bad-words-es";
const filter = new Filter({languages: ['es']});

export default function Rating(detailProduct) {
  const [hoveredStars, setHoveredStars] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const handleStarHover = (starIndex) => {
    setHoveredStars(starIndex);
  };

  const handleStar = () => {
    if (!user) {
      Swal.fire({
        title: "Usuario no autorizado",
        text: "Debes comprar el producto para poder valorarlo",
        icon: "warning",
        background: "#3b3838",
        color: "#ffffff",
        timer: 2000,
      });
    } else {
      const userHasCommented = detailProduct?.detailProduct.comments.some(
        (comment) => {
          const [username] = comment.split(" ");
          return username.trim() == user.user.username;
        }
      );
      if (userHasCommented) {
        Swal.fire({
          title: "Comentario existente",
          text: "Ya valoraste este producto",
          icon: "warning",
          background: "#3b3838",
          color: "#ffffff",
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: "Escribe tu comentario sobre el producto",
          input: "text",
          showDenyButton: true,
          confirmButtonText: "Enviar comentario",
          denyButtonText: "Cancelar",
          confirmButtonColor: "#394754",
          denyButtonColor: "#394754",
          background: "#3b3838",
          color: "#ffffff",
          preConfirm: (value) => {
            if (filter.isProfane(value)) {
              Swal.showValidationMessage(
                '<i class="fa fa-info-circle"></i> No se permiten comentarios con vocabulario inapropiado'
              );
            }
            if (!value) {
              Swal.showValidationMessage(
                '<i class="fa fa-info-circle"></i> Es necesario que ingreses tu comentario'
              );
            }
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            dispatch(putReview(hoveredStars, id, user, result));
          }
        });
      }
    }
  };

  return (
    <div className={Styles.containerStars}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <AiFillStar
          key={starIndex}
          className={`${Styles.star} ${
            starIndex <= hoveredStars ? Styles.starHovered : ""
          }`}
          onMouseEnter={() => handleStarHover(starIndex)}
          onMouseLeave={() => handleStarHover(0)}
          onClick={handleStar}
        />
      ))}
    </div>
  );
}
