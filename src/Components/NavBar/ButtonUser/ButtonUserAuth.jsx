import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonUsers.module.css";
import { logoutUser } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

function ButtonAuth() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const redirectToUserProfile = () => {
    navigate("/form/perfil");
    setMenuVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    setMenuVisible(false);
  };

  const handleButtonClick = () => {
    toggleMenu();
  };
  
 
   return (
    <div className= {styles.btn}>
      <div  onClick={handleButtonClick}>
        Usuario Registrado
        {menuVisible ? "▲" : "▼"} 
      </div>

      {menuVisible && (
        <div >
          <button onClick={redirectToUserProfile} >
            Perfil
          </button>

          <button onClick={() => navigate("/cupones")}>Cupones</button>

          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
    }

export default ButtonAuth;
