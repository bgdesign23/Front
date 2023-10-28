import CartCard from "../CartShop/CartCard";
import Styles from "../CartShop/cartShop.module.css";
import { useState } from "react";

function ShoppingCart() {
  // const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const deleteProduct = (productId) => {
    // Filtra el producto con el id especificado y actualiza el carrito
    const updatedCart = cart.filter((product) => product.id !== productId);

    // Actualiza el estado y el localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className={Styles.all_container}>
      <div className={Styles.ShoppingCart_container}>
        <div>
          {cart.map((producto, index) => (
            <CartCard
              key={producto.id}
              id={producto.id}
              name={producto.name}
              description={producto.description}
              types={producto.type}
              stock={producto.stock}
              price={producto.price}
              image={producto.image}
              category={producto.CategoryId}
              deleteProduct={deleteProduct}
            />
          ))}
          <button> finalizar compra </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
