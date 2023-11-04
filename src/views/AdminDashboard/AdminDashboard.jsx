import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getProductsAction,
        getAllUsers,
        deleteUser,
        restoreUser,
        updateUser,
        createCoupon, 
        deleteCoupon,
        postProduct,
        deleteProduct        
        } from "../../Redux/actions"

const AdminDashboard = () => {

    const dispatch = useDispatch()
    const productos = useSelector((state) => state.products_Copy)
    const usuarios = useSelector((state) => state.users_copy)

    console.log("productos: ", productos);
    
    useEffect(() => {
       dispatch(getProductsAction())
       dispatch(getAllUsers())
    }, [])

    return (
        <div>
            <h1> Lista de usuarios registrados </h1>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>{prod.name}</li>
                ))}
            </ul>
            <br />
            <br />
            <ul>
                {usuarios.map((user) => (
                    <li key={user.id}>{user.username}</li>  

                ))}
            </ul>
        </div>
    )

}

export default AdminDashboard