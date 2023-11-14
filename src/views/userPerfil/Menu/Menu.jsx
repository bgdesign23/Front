import { useNavigate } from "react-router-dom";
import Styles from "../Menu/Menu.module.css";
import { logoutUser } from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import Logout from "./Logout";

const Menu = () => {
  const navigate = useNavigate(); //Agregar la ruta para mis compras
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
        <button onClick={() => navigate("/form/perfil")}>Mi Perfil</button>
        <button onClick={() => navigate("/perfil/compras")}>Mis Compras</button>
        <button onClick={() => navigate("/cupones")}>Cupones</button>
        <button>Mis Favoritos</button>
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
