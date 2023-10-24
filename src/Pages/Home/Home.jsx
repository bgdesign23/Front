import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>
            <h1>
                Este es el Home
            </h1>
            <Link to='/home/decoracion'>
                <button> DECORACIÓN </button>
            </Link>
        </div>
    )

}

export default Home