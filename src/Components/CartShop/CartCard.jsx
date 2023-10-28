import Styles from "../CartShop/CartCard.module.css";

function CartCard({ id, name, image, price, deleteProduct }) {
  return (
    <>
      <div className={Styles.CartCard_Container}>
        <div className={Styles.imagen_container}>
          <img
            className={Styles.imagen}
            src={image}
            alt=""
            onClick={() => navigate(`/detail/${id}`)}
          />
        </div>
        <div className={Styles.name_container}>
          <h2>{name}</h2>
        </div>
        <div className={Styles.details}>
          <h3>Precio: ${price}</h3>
        </div>
        <div className={Styles.botonera}>
          <button onClick={() => deleteProduct(id)}>quitar </button>
          <div>
            <button className={Styles.botonesCantidad}> + </button>
            <button className={Styles.botonesCantidad}> - </button>
          </div>
          <div className={Styles.numero}>
            <p>1</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
