import { useLocation, useNavigate } from "react-router-dom";
import Styles from "../Menu/Menu.module.css";
import { logoutUser } from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import Logout from "./Logout";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div className={Styles.containerMenu}>
      <div className={Styles.titulo}>
        <h1>User</h1>
      </div>
      <div className={Styles.botonera}>
        <button
          onClick={() => navigate("/form/perfil")}
          className={`${Styles.btn} ${
            location.pathname === "/form/perfil" ? Styles.active : ""
          }`}
        >
          Mi Perfil
        </button>
        <button
          onClick={() => navigate("/perfil/compras")}
          className={`${Styles.btn} ${
            location.pathname === "/perfil/compras" ? Styles.active : ""
          }`}
        >
          Mis Compras
        </button>
        <button
          onClick={() => navigate("/cupones")}
          className={`${Styles.btn} ${
            location.pathname === "/cupones" ? Styles.active : ""
          }`}
        >
          Cupones
        </button>
        <button
          onClick={() => navigate("/favorites")}
          className={`${Styles.btn} ${
            location.pathname === "/favorites" ? Styles.active : ""
          }`}
        >
          Mis Favoritos
        </button>
      </div>
      <div className={Styles.logout}>
        <button onClick={handleLogout} className={Styles.logout}>
          <Logout /> Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default Menu;
