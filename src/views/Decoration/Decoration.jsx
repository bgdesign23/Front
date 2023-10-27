import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDesings } from '../../Redux/actions';


const Decoracion = () => {
const dispatch = useDispatch();
const service = useSelector(state => state.desings);
console.log(service);

useEffect(() => {
    dispatch(getDesings());
}, [])

    return (
        <div>
           {
            service.map(serv => (
                <div >
                    <h1>{serv.name}</h1>
                    <img src={serv.image} alt={serv.name}/>
                    <h2>{serv.type}</h2>
                    <p>{serv.description}</p>
                </div>
            ))
           }
            <Link to='/form/decoracion'>
                <button> Solicitar decoración </button>
            </Link>
        </div>
    )

}

export default Decoracion
