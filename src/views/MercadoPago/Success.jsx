/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart, getUser } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Success() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = localStorage.getItem("cart");
  const navigate = useNavigate();
  const [sweet, setSweet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser());
      setSweet(true);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (sweet) {
      Swal.fire({
        title: "¡Compra realizada con éxito!",
        icon: "success",
        background: "#3b3838",
        color: "#ffffff",
      }).then((result) => {
        if (result.isConfirmed) {
          handleConfirm();
        }
      });
    }
  }, [sweet]);

  const handleConfirm = async () => {
    await dispatch(createCart(cart, user.token));
    navigate("/home/product");
  };

  return <></>;
}

export default Success;
