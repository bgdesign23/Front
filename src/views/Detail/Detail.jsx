import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../../Redux/actions";
import styles from "../Detail/Detail.module.css";
import { useLocalStorage } from "../../localStorage/localStorage";

const Detail = () => {
  const [thing, setThing] = useLocalStorage("cart", []); //localStorage del carrito
  const { id } = useParams();
  const detailProduct = useSelector((state) => state.products_Details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(cleanDetail());
  }, []);

  const back = () => {
    window.history.back();
  };


  const addToCart = () => {
    //agregando al carrito el producto
    setThing([...thing, detailProduct]);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={detailProduct?.image}
            alt={detailProduct?.name}
          />
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.name}>{detailProduct?.name}</h1>
          <span className={styles.description}>
            {detailProduct?.description}
          </span>
          <div className={styles.filas}>
          <h3 className={styles.type}>Ambiente: {detailProduct?.type}</h3>
          
          <h3 className={styles.color}>Color: {detailProduct?.color}</h3>
          <h3 className={styles.material}>Material: {detailProduct?.material}</h3>
          <h3 className={styles.category}> {detailProduct?.category?.name}</h3>
        <h3 className={styles.stock}>{detailProduct?.stock}</h3>
        </div>
          <h2  className={styles.price}>${detailProduct?.price},00</h2>
          <a href={`https://wa.me/2477516585/?text=Hola,%20quisiera%20tener%20más%20información%20sobre%20el%20producto`} 
          target="_blank">
          <button>Contactar en WhatsApp</button>
          </a>
          <button onClick={addToCart} className={styles.button}>
            Agregar al Carrito
          </button>

        </div>
      </div>
      <button className={styles.backButton} onClick={back}>
        Back
      </button>
    </>
  );
};

export default Detail;
