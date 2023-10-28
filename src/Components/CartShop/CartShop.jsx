import React, { useState } from "react";

function ShoppingCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const removeFromCart = () => {};

  return (
    <div>
      <h2> ShoppingCart </h2>

      {cart.map((producto, index) => (
        <div key={index}>
          <img src={producto.image} alt="" />
          <h1>{producto.name}</h1>
          <p>Precio: $ {producto.price},00 </p>

          <button onClick={() => removeFromCart()}> Eliminar </button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
