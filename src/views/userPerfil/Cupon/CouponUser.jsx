import Menu from "../Menu/Menu.jsx";
import Styles from "../Cupon/Cupon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserCoupons } from "../../../Redux/actions.js";
import { useState } from "react";

function CuponesPage() {
  const userCoupons = useSelector((state) => state.userCoupons);
  const [coupon, setCoupon] = useState(false);
  const [visibleCoupon, setVisibleCoupon] = useState(false);

  const dispatch = useDispatch();

  // aplica si se quiere hacer visible el cupon con un boton u otra funcionalidad;
  const handleVisibleCoupon = (value) => {
    setVisibleCoupon((prevVisible) => !prevVisible);
    if (!visibleCoupon) {
      dispatch(getUserCoupons());
    };
  };

  // aca se despacha el cupon del useSelector;
  const handleCouponView = (value) => {
    if (coupon === value) {
      setCoupon(false);
    } else {
      setCoupon (value);
    }
    dispatch(getUserCoupons(value));
    //       ACTION que trae los cupones existentes;
  };

// esto muestra el cupon con todas sus propiedades;
// lo deje aca para que lo acomodes a tu gusto;
// chequea todo por las dudas capaz, me puedo equivocar jeeeeeeeeee;
  <div>
  {visibleCoupon &&
    userCoupons.map((coup) => (
      <div key={coup.id}>
        <span>{coup.code}</span>
        <span>{coup.status}</span>
        <span>%{coup.discount}</span>
        <span>{coup.expiration}</span>
        <span>{coup.usagesAvailable}</span> 
      </div>
    ))}
  </div>

  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <Menu />
      </div>
      <div className={Styles.boxRight}>
        <h1>Tus Cupones Disponibles</h1>
        <ul>
          {userCoupons.map((coupon) => (
            <li key={coupon.id}>
              {coupon.name} - Descuento: {coupon.discount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CuponesPage;
