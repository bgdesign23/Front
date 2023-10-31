import CartCard from "../CartShop/CartCard";
import Styles from "../CartShop/CartShop.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ShoppingCart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //total a pagar
  const numero = cart.reduce((accumulator, producto) => {
    return accumulator + producto.amount * producto.price;
  }, 0);

  //cantidad de productos en el carrito
  const cantidad = cart.reduce((accumulator, producto) => {
    return accumulator + producto.amount;
  }, 0);

  const deleteProduct = (productId) => {
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
    toast.success("Producto añadido");
  };

  const handleAmount_Down = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id && product.amount > 1) {
        // Clona el producto y actualiza la propiedad amount
        return { ...product, amount: (product.amount -= 1) };
      }
      return product;
    });
    // Actualiza el estado y el localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (updatedCart.length > 1) {
      toast.success("Producto eliminado");
    }
  };

  const calculateTotalPrice = (product) => {
    return product.amount * product.price;
  };

  function formatthousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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
              totalPriceProduct={calculateTotalPrice(producto)}
              formatthousand={formatthousand}
              disableDecreaseButton={producto.amount === 1}
            />
          ))}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              // marginTop: "900px",
              // marginLeft: "1800px",
              border: "1px solid #713200",
              padding: "16px",
              color: "#191919",
              background: "#ffff",
            },
          }}
        />
      </div>
      <div className={Styles.resumeCart}>
        <div>
          <p>Resumen de compra</p>
        </div>
        <div>
          <p>Cantidad productos: {cantidad}</p>
          <p>Total a pagar: ${formatthousand(numero)}</p>
          <p className={Styles.cupon}>Ingresar cupón descuento</p>
        </div>
        <button>Continuar con la compra</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
