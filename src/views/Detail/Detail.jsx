/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../../Redux/actions";
import styles from "../Detail/Detail.module.css";
import { useLocalStorage } from "../../localStorage/localStorage";
import toast, { Toaster } from "react-hot-toast";
import logoWhatsapp from "../Detail/whatsapp (1).png";
import Swal from "sweetalert2";
import Rating from "../../Components/Rating/Rating";

const Detail = () => {
  const [thing, setThing] = useLocalStorage("cart", []); //localStorage hook
  const { id } = useParams();
  const copy = useSelector((state) => state.products_Copy);
  const detailProduct = useSelector((state) => state.products_Details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const colores = [...new Set(copy.map((prod) => prod.color))];
  // const materiales = [...new Set(copy.map((mat) => mat.material))];

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const [addedQuantity, setAddedQuantity] = useState(0);

  //monta el producto
  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(cleanDetail());
  }, []);

  const back = () => {
    window.history.back();
  };

  const addToCart = () => {
    const checkStock = thing.findIndex(
      (product) => product.id === detailProduct.id
    );
    if (thing[checkStock]?.amount === detailProduct.stock) {
      return Swal.fire({
        title: "No hay suficiente stock",
        icon: "warning",
        background: "#3b3838",
        color: "#ffffff",
      });
    }
    const availableQuantity = detailProduct.stock - addedQuantity;
    if (availableQuantity > 0) {
      setAddedQuantity((prev) => prev + 1);

      const existingProduct = thing.findIndex(
        (product) => product.id === detailProduct.id
      );

      if (existingProduct !== -1) {
        thing[existingProduct].color = selectedColor;
        thing[existingProduct].material = selectedMaterial;
        thing[existingProduct].amount += 1;
        setThing([...thing]);
      } else {
        const updatedProduct = {
          ...detailProduct,
          color: selectedColor,
          material: selectedMaterial,
          amount: 1,
        };
        thing.push(updatedProduct);
      }
      setThing([...thing]);

      toast.success("se agrego al carrito de compras");
      // console.log("Productos: ", thing);
    } else {
      Swal.fire({
        title: "No hay suficiente stock",
        icon: "warning",
        background: "#3b3838",
        color: "#ffffff",
      });
    }
  };

  function formatthousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className={styles.todo}>
      <div className={styles.containerDetail}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={detailProduct?.image}
            alt={detailProduct?.name}
          />
        </div>
        <div className={styles.detailsContainerRight}>
          <h1 className={styles.name}>{detailProduct?.name}</h1>
          <p className={styles.description} style={{ textAlign: "left" }}>
            {detailProduct?.description}
          </p>
          <div className={styles.filas}>
            <h1 className={styles.caracteristicas}>
              Caracteristicas del producto:
            </h1>
            <h3 className={styles.type}>Ambiente: {detailProduct?.type}</h3>
            <h3>Color: {detailProduct?.color}</h3>
            <h3>Material: {detailProduct?.material}</h3>

            {/* <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
            <option className={styles.filas} value="">Color</option> 
              {colores.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
            <option className={styles.filas} value="">Material</option> 
              {materiales.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select> */}

            <h4 className={styles.price}>
              ${formatthousand(Number(detailProduct?.price))}
            </h4>
            <h6 className={styles.stock}>
              {detailProduct?.stock ? "En Stock" : "Sin Stock"}
            </h6>
            <div className={styles.rating}>
              <Rating />
              <h4>{detailProduct?.rating?.toFixed(1)}</h4>
            </div>
          </div>
          {/* ⭐ */}
          <div className={styles.actions}>
            <button onClick={addToCart} className={styles.button}>
              Agregar al Carrito
            </button>
            <a
              href={`https://wa.me/2477516585/?text=Hola,%20quisiera%20tener%20más%20información%20sobre%20el%20producto`}
              target="_blank"
              className={styles.whatsappLink}
              rel="noreferrer"
            >
              <img src={logoWhatsapp} alt="" style={{ width: "66px" }} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.reviews}>
        <div className={styles.comentsContainer}>
          <h1>Comentarios de compradores</h1>
          {detailProduct &&
            detailProduct.comments?.map((comment, index) => {
              const [firstPart] = comment.split(":");
              return (
                <div key={index} className={styles.coments}>
                  <h1>{firstPart}</h1>
                  <p>
                    {"'"}
                    {comment.slice(firstPart.length + 1).trim()}
                    {"'"}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <button className={styles.backButton} onClick={back}>
        Back
      </button>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#191919",
            background: "#ffff",
          },
        }}
      />
    </div>
  );
};

export default Detail;
