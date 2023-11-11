/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carts, cleanCarts, getUser } from "../../../Redux/actions";
import Menu from "../Menu/Menu.jsx";
import styles from "./ComprasUser.module.css";

function CartList() {
  const dispatch = useDispatch();
  const cartsState = useSelector((state) => state.carts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(carts(user?.user.id));
    }
    return () => dispatch(cleanCarts());
  }, []);

  return (
    <div className={styles.divCompras}>
      <div className={styles.divMenu}>
        <Menu />
      </div>
      <div className={styles.divListaCompras}>
        {cartsState && cartsState.length > 0 ? (
          <div>
            <h1 className={styles.h1Compras}>Historial de compras</h1>
            {cartsState.map((cart, index) => (
              <div key={cart.id}>
                <h1 className={styles.h1Compras}>{`Detalle de compra ${
                  index + 1
                }`}</h1>
                <p>{`Fecha de la compra: ${cart.createdAt.split("T")[0]}`}</p>
                <p>{`Valor total de la compra: $ ${calculateTotal(cart.products)}`}</p>
                {cart.products.map((productString) => {
                  const productArray = JSON.parse(productString);
                  return productArray.map((product) => (
                    <div key={product.id}>
                      <img
                        className={styles.imgCompras}
                        src={product.image}
                        alt={product.name}
                      />
                      <p>{`Producto: ${product.name}`}</p>
                      <p>{`Descripción: ${product.description}`}</p>
                      <p>{`Precio unitario: $ ${product.price}`}</p>
                      <p>{`Cantidad: ${product.amount}`}</p>
                    </div>
                  ));
                })}
              </div>
            ))}
          </div>
        ) : (
          <h1 className={styles.h1Compras}>Aún no has realizado compras</h1>
        )}
      </div>
    </div>
  );
}

function calculateTotal(products) {
  let total = 0;

  products.forEach((productString) => {
    const productArray = JSON.parse(productString);

    productArray.forEach((product) => {
      total += product.price * product.amount;
    });
  });

  return total;
}

export default CartList;
