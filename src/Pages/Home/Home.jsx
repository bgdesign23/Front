import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import style from "../Home/Home.module.css"

const Home = () => {

    return (
        <div className={style.home}>
            <h1>
                Este es el Home
            </h1>
             <Link to="/home/product">
             <button> MUEBLES </button>
            </Link>
            <Link to='/home/decoracion'>
                <button> DECORACIÓN </button>
            </Link>
           <Footer/>
        </div>
    )

}

export default Home