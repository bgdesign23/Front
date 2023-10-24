import { Link } from 'react-router-dom'
import styles from '../SideBar/SideBar.module.css'
const SideBar = ({isOpen}) => {

    return (
        <div className={`${styles.sideBar} ${isOpen ? styles.open : ''}`}>
           <Link>Inicio</Link>
        </div>
    )

}

export default SideBar