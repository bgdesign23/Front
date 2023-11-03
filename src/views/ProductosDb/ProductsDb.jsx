import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductsAction } from "../../Redux/actions"

const Productos = () => {

    const dispatch = useDispatch()
    const productos = useSelector((state) => state.products_Copy)

    //console.log("productos: ", productos);
    
    useEffect(() => {
       dispatch(getProductsAction())
    }, [])

    return (
        <div>
            <h1> Lista de usuarios registrados </h1>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>{prod.name}</li>
                ))}
            </ul>
        </div>
    )

}

export default Productos