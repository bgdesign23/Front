import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonUsers.module.css";
import { logoutUser } from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import IconoUser from "../Icono/IconoUser";

function ButtonAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToUserProfile = () => {
    navigate("/form/perfil");
    setMenuVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    setMenuVisible(false);
  };

  return (
    <div className={styles.Filters}>
      <select
        onChange={(event) => {
          if (event.target.value === "perfil") {
            redirectToUserProfile();
          } else if (event.target.value === "logout") {
            handleLogout();
          }
        }}
      >
        <option value="perfil">Perfil</option>
        <option value="logout">Cerrar sesión</option>
      </select>
    </div>
  );
}

export default ButtonAuth;
