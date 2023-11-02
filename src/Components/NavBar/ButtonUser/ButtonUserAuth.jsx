import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonUsers.module.css";
import { logoutUser } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

function ButtonAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToUserProfile = () => {
    navigate("/form/perfil");
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  const redirectCupon = () => {
    navigate("/cupones");
  };

  return (
    <div className={styles.Filters}>
      <select
        onChange={(event) => {
          if (event.target.value === "perfil") {
            redirectToUserProfile();
          } else if (event.target.value === "logout") {
            handleLogout();
          } else if (event.target.value === "cupon") {
            redirectCupon();
          }
        }}
      >
        <option value="perfil">Perfil</option>
        <option value="logout">Cerrar sesión</option>
        <option value="cupon">Cupones</option>
      </select>
    </div>
  );
}

export default ButtonAuth;
