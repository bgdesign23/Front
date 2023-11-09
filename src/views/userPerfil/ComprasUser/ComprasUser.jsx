// src/components/CartList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carts } from "../../../Redux/actions"


function CartList  ({ userId }) {

  const dispatch = useDispatch();
  const cartsState = useSelector(state => state.carts);

  useEffect(() => {
    dispatch(carts(userId));
  }, [dispatch, userId]);

  return (
     <div>
      <h2>Tus Compras</h2>
      {cartsState.loading && <p>Cargando compras...</p>}
      {cartsState.error && <p>Error al cargar compras: {cartsState.error}</p>}
      
      {cartsState.carts && cartsState.carts.length === 0 && !cartsState.loading && !cartsState.error && (
        <p>Aún no tienes ninguna compra.</p>
      )}

      {cartsState.carts && cartsState.carts.length > 0 && (
        <CartList userId={userId} />
      )}
    </div>
   
  );
}



export default CartList;
