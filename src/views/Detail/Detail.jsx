import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../../Redux/actions";
import styles from "../Detail/Detail.module.css";

const Detail = () => {
  const {id} = useParams();
  const detailProduct = useSelector(state => state.products_Details);
  const dispatch = useDispatch();

  console.log(detailProduct);
  useEffect(() => {
    dispatch(getDetail(id))
    return () => dispatch(cleanDetail())
  }, [])

  const back = () => {
    window.history.back();
  }

    return(
        <>
        <div className={styles.container}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={detailProduct?.image} alt={detailProduct?.name}/>
            </div>
           <div className={styles.detailsContainer}> 
              <h1 className={styles.name}>{detailProduct?.name}</h1>
              <span className={styles.description}>{detailProduct?.description}</span>
               <div className={styles.filas}>
              <h3 className={styles.type}>Tipo: {detailProduct?.type}</h3>
              <h3 className={styles.stock}>{detailProduct?.stock}</h3> 
              <h3 className={styles.color}>Color: {detailProduct?.color}</h3>
              <h3 className={styles.material}>Material: {detailProduct?.material}</h3>
              <h3 className={styles.category}>{detailProduct?.category?.name}</h3>
              </div>
               <h2 className={styles.price}>${detailProduct?.price},00</h2>
           
            <button  className={styles.buttons}>Agregar al Carrito</button>
            </div> 
        </div>
        <button className={styles.backButton} onClick={back}>Back</button>
    </>
    )

}

export default Detail