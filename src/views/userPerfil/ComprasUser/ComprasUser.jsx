import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carts , getUser } from "../../../Redux/actions"
import Menu from "../Menu/Menu.jsx";



function CartList() {
  const dispatch = useDispatch();
  const cartsState = useSelector(state => state.carts);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.username) {
      dispatch(carts(user.username.id));
    }
  }, [dispatch, user]);

    return (
    <div >
      <div >
        <Menu />
      </div>
      <div >
        {cartsState && cartsState.length > 0 ? (
          <div>
            <h1>Tu Carrito</h1>
            {cartsState.map(cartItem => (
              <div key={cartItem.id}>
                <p>{cartItem.productName}</p>
              </div>
            ))}
          </div>
        ) : (
          <h1>Aún no has realizado compras</h1>
        )}
      </div>
    </div>
  );
}

export default CartList;