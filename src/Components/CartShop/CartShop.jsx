import CartCard from "../CartShop/CartCard";
import Styles from "../CartShop/CartShop.module.css";
import { useEffect, useState } from "react";

function ShoppingCart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //total a pagar
  const total = cart.reduce((accumulator, producto) => {
    return accumulator + producto.amount * producto.price;
  }, 0);

  //cantidad de productos en el carrito
  const cantidad = cart.reduce((accumulator, producto) => {
    return accumulator + producto.amount;
  }, 0);

  const deleteProduct = (productId) => {
    console.log(productId);
    // Filtra el producto con el id especificado y actualiza el carrito
    const updatedCart = cart.filter((product) => product.id !== productId);
    // Actualiza el estado y el localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAmount_Up = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id) {
        // Clona el producto y actualiza la propiedad amount
        return { ...product, amount: (product.amount += 1) };
      }
      return product;
    });
    // Actualiza el estado y el localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAmount_Down = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id) {
        // Clona el producto y actualiza la propiedad amount
        return { ...product, amount: (product.amount -= 1) };
      }
      return product;
    });
    // Actualiza el estado y el localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = (product) => {
    return product.amount * product.price;
  };

  return (
    <div className={Styles.all_container}>
      <div className={Styles.ShoppingCart_container}>
        <div className={Styles.tittle}>
          <h1>tu carrito de compras</h1>
        </div>
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
              amount={producto.amount}
              deleteProduct={deleteProduct}
              handleAmount_Up={handleAmount_Up}
              handleAmount_Down={handleAmount_Down}
              totalPrice={calculateTotalPrice(producto)}
            />
          ))}
        </div>
      </div>
      <div className={Styles.resumeCart}>
        <div>
          <p>Resumen de compra</p>
        </div>
        <div>
          <p>Productos {cantidad}</p>
          <p>Total: ${total},00</p>
          <p className={Styles.cupon}>Ingresar cupón descuento</p>
        </div>
        <button>Continuar con la compra</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
