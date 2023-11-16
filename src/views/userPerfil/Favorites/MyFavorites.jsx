import Menu from "../../userPerfil/Menu/Menu"
import Card from "../../Product/Card"
import { getFav, deleteFav } from "../../../Redux/actions"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const MyFavs = () => {
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites)

    useEffect(()=> {
        dispatch(getFav())
    }, [dispatch])

    const handleDeleteFav = (id) => {
        dispatch(deleteFav(id))
    }

    return (
        <>
        <div>
            <Menu/>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1> Favoritos: </h1>
         {favorites.map((product) =>
         <div>
            <Card            
              key= {product.id}
              id={product.id}
              name= {product.name}
              description={product.description}
              types={product.type}
              stock={product.stock}
              price={product.price}
              image={product.image}
              material={product.material}
              color={product.color}                                
            />            
            <button onClick={() => handleDeleteFav(product.id)} >Eliminar de Favoritos</button>
        </div>
        )}
                
        </>
    )

}

export default MyFavs