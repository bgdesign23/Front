import styles from "./ButtonUsers.module.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonUser() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const redirectToLogin = () => {
    navigate('/form/login');
    setMenuVisible(false);
  };

  const redirectToRegistro = () => {
    navigate('/form/register');
    setMenuVisible(false);
  };

  const handleButtonClick = () => {
    toggleMenu();
  };

  return (
    <div>
      <button
        type="button"
        className={styles.buttonUser}
        onClick={handleButtonClick}
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        viewBox="0 0 640 512"
        onClick={toggleMenu} 
      >
      <path fill="currentColor" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
      
      </svg>
      </button>
      {menuVisible && (
        <div className={styles.divUsers}>
          <p className={styles.p}>Usuario no registrado</p>
          <button onClick={redirectToLogin} className={styles.menuButton}>Iniciar sesión</button> 
          <button onClick={redirectToRegistro} className={styles.menuButton} >Registrarse</button>
          
        </div>
      )}
    </div>
  );
}

export default ButtonUser;








<svg xmlns="http://www.w3.org/2000/svg" width="30px" viewBox="0 0 640 512">
  
</svg>