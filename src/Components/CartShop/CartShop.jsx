import { useNavigate } from "react-router-dom";
import CartCard from "../CartShop/CartCard";
import Styles from "../CartShop/CartShop.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { applyCoupon, createPreference } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
  initMercadoPago("TEST-f0c64837-0fc1-441b-85ea-20be004df16e"); //esta es la key-publi para la pasarela de pago
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [preferenceId, setPreferenceId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  ); //se accede al localStorage

  //total a pagar
  const numero = cart.reduce((accumulator, producto) => {
    return accumulator + producto.amount * producto.price;
  }, 0);

  //cantidad de productos en el carrito
  const cantidad = cart.reduce((accumulator, producto) => {
    return accumulator + producto.amount;
  }, 0);

  const deleteProduct = (productId) => {
    Swal.fire({
      title: "Ojo!",
      text: "Estas sacando un producto de tu orden, estas seguro?",
      icon: "warning",
      showCancelButton: true,
      background: "#1A1A1A",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#394754",
      confirmButtonText: "Eliminar",
      cancelButtonText: "cancelar",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        Swal.fire({
          title: "Eliminado",
          text: "El producto ya no está en tu carrito",
          background: "#1A1A1A",
          confirmButtonColor: "#394754",
          color: "#ffffff",
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
    const totalPrice = product.price * product.amount;
    return totalPrice;
  };

  function formatthousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleApplyCoupon = async () => {
    const newDiscount = validateCoupon(couponCode);
    setDiscount(newDiscount);
    dispatch(applyCoupon(couponCode));
    setCouponCode("");

    if (newDiscount > 0) {
      const totalWithDiscount = numero * (1 - newDiscount);
      setTotalWithDiscount(totalWithDiscount);
    } else {
      setDiscount(0);
      setTotalWithDiscount(numero);
    }
  };

  const handleButtonBuy = async () => {
    if (user || localStorage.getItem("token")) return handleBuy();
    else
      Swal.fire({
        title: "Usuario no autorizado",
        text: "Inicia sesión para realizar la compra",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Iniciar sesión",
        denyButtonText: "Cancelar",
        confirmButtonColor: "#394754",
        denyButtonColor: "#394754",
        background: "#3b3838",
        color: "#ffffff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/form/login");
        }
      });
  };

  const handleBuy = async () => {
    const updatedCart = cart.map((producto) => {
      const discountedPrice = producto.price * (1 - discount);
      return {
        ...producto,
        price: discountedPrice,
      };
    });
    try {
      const id = await dispatch(createPreference(updatedCart));
      setPreferenceId(id);
    } catch (error) {
      console.log("Error al crear la preferencia:", error);
    }
  };

  return (
    <div className={Styles.all_container}>
      <button
        className={Styles.backBtn}
        onClick={() => navigate("/home/product")}
      >
        Back
      </button>
      <div className={Styles.ShoppingCart_container}>
        <div className={Styles.tittle}>
          <p>Tu carrito de compras</p>
        </div>
        <div>
          {cart.length === 0 ? (
            <h1 className={Styles.carVacio}>Tu carrito esta vacío!</h1>
          ) : (
            cart.map((producto, index) => (
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
            ))
          )}
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
        <div className={Styles.titulo}>
          <p>Resumen de compra</p>
        </div>
        <div>
          <div className={Styles.details}>
            <div className={Styles.detailsHijo}>
              <p>Productos: ({cantidad})</p>
              <div className={Styles.cupon_container}>
                <input
                  type="text"
                  placeholder=" Ingresa el código del cupón"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className={Styles.btncupon} onClick={handleApplyCoupon}>
                  Aplicar Cupón
                </button>
              </div>
              <p>Total: ${formatthousand(numero)}</p>
            </div>{" "}
            {discount > 0 && (
              <p>
                Total a pagar con descuento: $
                {formatthousand(totalWithDiscount)}
              </p>
            )}{" "}
          </div>
        </div>
        <button className={Styles.btn} onClick={handleButtonBuy}>
          CONTINUAR CON LA COMPRA
        </button>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
    </div>
  );
}

export default ShoppingCart;
