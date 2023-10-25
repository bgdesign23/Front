import {useDispatch, useSelector} from "react-redux"

import { orderbyprice } from '../../Redux/actions';

const Filters = () => {
   
    const dispatch = useDispatch();
    const product= useSelector((state)=> state.products)
   console.log(product);

  const handleOrderChange = (e) => {
    const orderDirection = e.target.value;
   dispatch ( orderbyprice( product,orderDirection)); 
  };


    return (
        <div>
       <label>Ordenar por precio:</label>
       <select onChange={handleOrderChange}>
        <option value="Menor">Menor a Mayor</option>
        <option value="Mayor">Mayor a Menor</option>
      </select>

        </div>
    )

}

export default Filters