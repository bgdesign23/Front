import Menu from "../Menu/Menu.jsx";
import Styles from "../Cupon/Cupon.module.css";
import { useSelector } from "react-redux";

function CuponesPage() {
  const userCoupons = useSelector((state) => state.userCoupons);

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
