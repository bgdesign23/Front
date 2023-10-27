import {useDispatch, useSelector} from "react-redux"

import { filterByColor, filteredByType, orderbyprice } from '../../Redux/actions';
import { useEffect, useState } from "react";

const Filters = () => {
   
   const dispatch = useDispatch();
   const product= useSelector((state)=> state.products);
   const copy = useSelector(state => state.products_Copy)

  const handleOrderChange = (e) => {
   const orderDirection = e.target.value;
   dispatch ( orderbyprice( product, orderDirection)); 
  };

  const colors = [...new Set(copy.map((prod) => prod.color))];
  
  const handleByColor = (event) => {
    const byColor = event.target.value;
    var copia = [...copy]
    dispatch(filterByColor(byColor, copia))
  }


  const handleFilterType = (event) => {
    const selectedCategory = event.target.value;
    const copia = [...copy]
    dispatch(filteredByType(copia, selectedCategory)); // Corrección aquí
  };

    return (
        <div>
       <label>Ordenar por precio:</label>
       <select onChange={handleOrderChange}>
        <option value="Menor">Menor a Mayor</option>
        <option value="Mayor">Mayor a Menor</option>
      </select>
      <select onChange={handleByColor} >
        <option value="">Selecciona un color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <label>Ordenar por categoría:</label>
      <select onChange={handleFilterType} value={copy}>
        <option value="">Todas las categorías</option>
        <option value="Hogar">Hogar</option>
        <option value="Oficina">Oficina</option>
        <option value="Comercial">Comercial</option>
      </select>
        </div>
        
    )

}

export default Filters