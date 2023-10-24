
const Product = () => {
// TENGO QUE HACER UN CHECKBOT EL CUAL TENGA MUEBLES Y QUE DENTRO TENGA TODAS LAS OPCIONES DE LOS MUEBLES  Y OTRO DE COLORES, CON TODOS LOS COLORES

    return (
        <div >
            <h1>
                Aquí van los muebles
            </h1>
            <select>
                <option value="">MUEBLES</option>

            </select>


            <select>
                <option value="">COLOR</option>
            </select>
          
            <select >
                <option > Precio </option>
                <option value="">Mayor a Menor</option>
                <option value="">Menor a Mayor</option>
            </select>

            <select >
                <option> Mas vendidos </option>
                <option value="">ASCENDENTE</option>
                <option>DESCENDENTE</option>
            </select>
            


            <br />
            <br />
            <button>Mas Productos</button>
        </div>
    )

}

export default Product







