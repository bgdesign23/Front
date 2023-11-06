import { useNavigate } from "react-router-dom";
import CartCard from "../CartShop/CartCard";
import Styles from "../CartShop/CartShop.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { applyCoupon, createPreference } from "../../Redux/actions";
import { useDispatch } from "react-redux";

function validateCoupon(couponCode) {
  const currentDate = new Date();

  const welcomeCoupon = {
    status: "activo",
    expiration: "2023-12-31",
    discount: 0.2,
    usagesAvailable: 1,
    code: "bgdesign",
  };

  if (
    welcomeCoupon.code === couponCode &&
    welcomeCoupon.status === "activo" &&
    new Date(welcomeCoupon.expiration) >= currentDate &&
    welcomeCoupon.usagesAvailable > 0
  ) {
    return welcomeCoupon.discount; 
  }

  return 0; 
}
function ShoppingCart() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0); 


  initMercadoPago("TEST-f0c64837-0fc1-441b-85ea-20be004df16e");
  const navigate = useNavigate();
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
    // show alert confirmation
    Swal.fire({
      title: "ojo!",
      text: "Estas sacando un producto de tu orden, estas seguro?",
      icon: "Atención",
      showCancelButton: true,
      background: "#1A1A1A",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete pokemon if is confirmed
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        Swal.fire({
          title: "Eliminado",
          text: "El producto ya no esta en cariito",
          background: "#1A1A1A",
          confirmButtonColor: "#3085d6",
        });
      }
    });
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
    if (updatedCart.length) {
      toast.success("Producto eliminado");
    }
  };

  const calculateTotalPrice = (product) => {
    const discountedPrice = product.price * (1 - discount);
  return product.amount * discountedPrice;
  };

  function formatthousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


const [localCouponCode, setLocalCouponCode] = useState("");

const handleApplyCoupon = () => {
  const newDiscount = validateCoupon(couponCode);
  setLocalCouponCode(couponCode);
  
  // Calcula el precio con descuento antes de continuar
  if (newDiscount > 0) {
    const totalWithDiscount = numero * (1 - newDiscount);
    setDiscount(newDiscount);
    setTotalWithDiscount(totalWithDiscount);
  } else {
    setDiscount(0);
    setTotalWithDiscount(numero);
  }
  dispatch(applyCoupon(couponCode));
  setCouponCode("");
};

const handleBuy = async () => {
  console.log("La función handleBuy se está ejecutando.");

  try {
    const id = await dispatch(createPreference(cart));

    setPreferenceId(id);
  } catch (error) {
    console.log("Error al crear la preferencia:", error);
  }
};

 
  
 return (
  <div className={Styles.all_container}>
    <div className={Styles.ShoppingCart_container}>
      <button
        className={Styles.backBtn}
        onClick={() => navigate("/home/product")}
      >
        Back
      </button>
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
        {discount > 0 && (
          <p>Total a pagar con descuento: ${formatthousand(totalWithDiscount)}</p>
        )} 
      </div>
      <div className={Styles.cupon_container}>
        <input
          type="text"
          placeholder="Ingresa el código del cupón"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className={Styles.btncupon} onClick={handleApplyCoupon}>
          Aplicar Cupón
        </button>
      </div>
      <button className={Styles.btn} onClick={handleBuy}>
        Continuar con la compra
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  </div>
);
}

export default ShoppingCart;
