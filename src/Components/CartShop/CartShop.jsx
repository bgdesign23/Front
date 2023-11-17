import { useNavigate } from "react-router-dom";
import CartCard from "../CartShop/CartCard";
import Styles from "../CartShop/CartShop.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { addNumber, applyCoupon, getUserCoupons, createPreference, lowNumber, quitNumber } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../CartShop/EmptyCart.jsx";
import  { isCouponValid, coupons }   from "../../views/userPerfil/Cupon/validateCoupon";

function ShoppingCart() {
  initMercadoPago("TEST-f0c64837-0fc1-441b-85ea-20be004df16e"); //esta es la key-publi para la pasarela de pago
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [preferenceId, setPreferenceId] = useState(null);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  ); //se accede al localStorage
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const userCoupons = useSelector((state) => state.userCoupons);
const [appliedCoupons, setAppliedCoupons] = useState([]);



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
        const changeNumber = cart.filter((product) => product.id == productId);
        dispatch(quitNumber(changeNumber[0].amount))
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
    const checkStock = cart.findIndex((product) => product.id === product.id);
    if (cart[checkStock]?.amount === cart[checkStock]?.stock) {
      return Swal.fire({
        title: "No hay suficiente stock",
        icon: "warning",
        background: "#3b3838",
        color: "#ffffff",
      });
    }
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
    dispatch(addNumber())
  };

  const handleAmount_Down = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id && product.amount > 1) {
        return { ...product, amount: (product.amount -= 1) };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (updatedCart.length) {
      toast.success("Producto eliminado");
      dispatch(lowNumber())
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
    console.log("Inicio handleApplyCoupon");
  
    // Verificar si appliedCoupons es un array, si no, inicializarlo como un array vacío
    setAppliedCoupons((prevCoupons) => (Array.isArray(prevCoupons) ? prevCoupons : []));
  
    if (!userCoupons.length) {
      try {
        await dispatch(getUserCoupons(user)); // Asegúrate de que getUserCoupons sea una acción asíncrona
        console.log("Obteniendo cupones del usuario");
      } catch (error) {
        console.error("Error al obtener cupones del usuario:", error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
        return;
      }
    }
  
    if (!couponCode) {
      toast.error("Ingrese un código de cupón válido");
      console.log("Código de cupón no válido");
      return;
    }
  
    const couponValidation = await isCouponValid(couponCode, numero, appliedCoupons, user);
    console.log("Resultado de isCouponValid:", couponValidation);
  
    if (couponValidation.isValid) {
      const { coupon, discountedTotal } = couponValidation;
  
      // Actualizar estados con el descuento aplicado
      setDiscount(coupon.descuento || 0);
      setTotalWithDiscount(discountedTotal);
  
      // Actualizar estados con el cupón aplicado
      setAppliedCoupons((prevCoupons) => [...prevCoupons, couponCode]);
  
      // Mensaje de éxito
      toast.success(`Cupón "${coupon.codigo}": ${coupon.descripcion} fue aplicado con éxito`);
    } else {
      // Mensaje de error
      toast.error(couponValidation.message);
      console.log("Error al aplicar cupón:", couponValidation.message);
    }
  };

  const handleButtonBuy = async () => {
    if (user && localStorage.getItem("token")) return handleBuy();
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
            <EmptyCart />
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
          position="bottom-right"
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
