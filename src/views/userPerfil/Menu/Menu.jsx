import { useNavigate } from "react-router-dom";
import Styles from "../userPerfil.module.css";
import { logoutUser } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

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
      </div>
      <button onClick={handleLogout} className={Styles.logout}>
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Menu;
