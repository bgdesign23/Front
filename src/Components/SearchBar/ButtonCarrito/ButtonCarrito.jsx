import { useNavigate } from "react-router-dom";
import Styles from "../../CartShop/CartShop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setNumber } from "../../../Redux/actions.js";

export default function ButtonCarrito() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [cantidad, setCantidad] = useState(0)
  const stateNumber = useSelector((state)=>state.number)
  const isInCartShop = location.pathname === "/CartShop";

  useEffect(()=>{
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const newCantidad = cartData.reduce((accumulator, product) => {
      return accumulator + product.amount;
    }, 0);

    dispatch(setNumber(newCantidad))
  }, [dispatch])

  const number = () => {
    return stateNumber
  }

  return (
    <div
      className={Styles.iconCartContainer}
      onClick={() => navigate("/CartShop")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.25 18.75c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5Zm5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5Zm4.48-9.57l-2 8a.75.75 0 0 1-.73.57H8c-.36 0-.67-.26-.74-.62L5.37 5.25H4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.36 0 .67.26.74.62l.43 2.38H20a.754.754 0 0 1 .73.93Zm-1.69.57H7.44l1.18 6.5h8.79l1.63-6.5Z"
        />
      </svg>
      <div className={Styles.carritoNum}>
        <p>{number()}</p>
      </div>
    </div>
  );
}
