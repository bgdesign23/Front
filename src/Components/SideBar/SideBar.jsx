import { Link } from 'react-router-dom'
import styles from './SideBar.module.css'


const SideBar = ({isOpen}) => {

    const back = () => {
       window.history.back()
    }

    return (
        <div className={`${styles.sideBar} ${isOpen ? styles.open : ''}`}>
          <Link to="/">
               Inicio
          </Link >
          <Link to="/home/product">
               Productos
          </Link>
          
          <div className={styles.buttonslogin}>
                <Link to="/form/register">
                    Registrate
                </Link>
       
               <Link to="/form/login">
                    Iniciar Sesion
                </Link>
          </div>
        </div>
    )

}

export default SideBar