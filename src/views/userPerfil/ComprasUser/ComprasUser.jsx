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
    <div className={styles.containerAll}>
      <div className={styles.boxLeft}>
        <Menu />
      </div>
      <div className={styles.boxRight}>
        {cartsState && cartsState.length > 0 ? (
          <div className={styles.containerCompras}>
            <div className={styles.contCompr}>
              {cartsState.map((cart, index) => (
                <div className={styles.cartCompra} key={cart.id}>
                  <div className={styles.contDate}>
                    <p>{`Fecha de Operacion: ${
                      cart.createdAt.split("T")[0]
                    }`}</p>
                  </div>
                  {cart.products.map((productString) => {
                    const productArray = JSON.parse(productString);
                    return productArray.map((product) => (
                      <div className={styles.secondCompra} key={product.id}>
                        <img
                          className={styles.imgCompras}
                          src={product.image}
                          alt={product.name}
                        />
                        <div className={styles.contName}>
                          <h4>{product.name}</h4>
                          <p>{product.description}</p>
                        </div>
                        <div className={styles.contInfo}>
                          <p>{`Cantidad: ${product.amount}`}</p>
                        </div>
                        <div className={styles.contPrecUni}>
                          <p>{`Precio unitario: $${product.price}`}</p>
                        </div>
                      </div>
                    ));
                  })}
                  <div className={styles.contTotal}>
                    <p>{`Total: $ ${calculateTotal(cart.products)}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.h1Compras}>
            <h1>Aún no has realizado compras</h1>
          </div>
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
