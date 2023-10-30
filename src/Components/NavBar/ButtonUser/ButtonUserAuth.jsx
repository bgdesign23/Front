  
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ButtonUser/buttonUsers.module.css';
import { logoutUser } from "../../../Redux/actions"
import {useDispatch} from "react-redux"

function ButtonAuth() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  const redirectToUserProfile = () => {
    navigate('/form/perfil');
    setMenuVisible(false); 
  };

  const handleLogout = () => {
     dispatch(logoutUser());
         navigate('/');
    setMenuVisible(false);
    
  };

return (
  <div>
    
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="30px" 
      viewBox="0 0 640 512"
      onClick={toggleMenu} 
>
<path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
    
    {menuVisible && (
      <div>
                <p>Usuario registrado</p>

        <button onClick={redirectToUserProfile} className={styles.menuButton}>
          Ver perfil
        </button>
        <button onClick={handleLogout} className={styles.menuButton}>
          Cerrar sesión
        </button>
      </div>
    )}
  </div>
);

}

export default ButtonAuth;