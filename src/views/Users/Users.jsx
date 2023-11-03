import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../Redux/actions"

const Usuarios = () => {

    const dispatch = useDispatch()
    

    useEffect(() => {
       return () => dispatch(getUser())
    }, [])


    return (
        <div>
            <h1> Lista de usuarios registrados </h1>
            <ul>
                {users.map((user) => {
                    <li key={user.id}>{user.name}</li>
                })}
            </ul>
        </div>
    )

}

export default Usuarios