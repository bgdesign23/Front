import styles from "./Product.styles.css";
const Product = () => {
// TENGO QUE HACER UN CHECKBOT EL CUAL TENGA MUEBLES Y QUE DENTRO TENGA TODAS LAS OPCIONES DE LOS MUEBLES  Y OTRO DE COLORES, CON TODOS LOS COLORES

    return (
        <div className={styles.container}>
            <h1>
                Aquí van los muebles
            </h1>
            <select>
                <option className={styles.select} value="">MUEBLES</option>

            </select>


            <select>
                <option className={styles.select} value="">COLOR</option>
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







