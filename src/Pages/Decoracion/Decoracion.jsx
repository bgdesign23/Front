import { Link } from 'react-router-dom'

const FormDecoracion = () => {

    return (
        <div>
            <h1>
                Formulario para Decoracion
            </h1>
            <p> Puedes contratar nuestros servicios para</p>
            <p> decorar tu hogar!</p>
            <Link to='/form/decoracion'>
                <button> Solicitar decoración </button>
            </Link>
        </div>
    )

}

export default FormDecoracion
