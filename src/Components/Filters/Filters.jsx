import { useDispatch, useSelector } from "react-redux";
import Style from "../Filters/Filters.module.css"

import {
  filterByColor,
  filterByMaterial,
  filterCategories,
  filteredByType,
  orderbyprice,
} from "../../Redux/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const copy = useSelector((state) => state.products_Copy);
  const categories = useSelector((state) => state.categories);

  const handleOrderChange = (e) => {
    const orderDirection = e.target.value;
    dispatch(orderbyprice(product, orderDirection));
  };

  const colors = [...new Set(copy.map((prod) => prod.color))];

  const handleByColor = (event) => {
    const byColor = event.target.value;
    var copia = [...copy];
    dispatch(filterByColor(byColor, copia));
  };

  const materiales= [...new Set(copy.map((mat)=> mat.material))] 
  const handleByMaterial = (event) => {
    const byMaterial = event.target.value;
    var copia= [...copy]
    dispatch(filterByMaterial(byMaterial,copia))
  }


  const handleFilterCategory = (event) => {
    event.preventDefault();
    const category = event.target.value;
    var copia = [...copy];
    dispatch(filterCategories(category, copia));
  };

  const handleFilterType = (event) => {
    const selectedCategory = event.target.value;
    const copia = [...copy];
    dispatch(filteredByType(copia, selectedCategory)); // Corrección aquí
  };

  return (
    <div className={Style.Filters}>
      <select
        onChange={handleFilterCategory}
        value={copy}
      >
        <option value="">
          Categorias
        </option>
        {categories?.map((category) => {
          return (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
      
      
      <select onChange={handleOrderChange}>
        <option value="">Precio</option>
        <option value="Menor">Menor a Mayor</option>
        <option value="Mayor">Mayor a Menor</option>
      </select>

      <select onChange={handleByColor}>
        <option value="">Color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      
     
      <select onChange={handleFilterType} value={copy}>
        <option value="">Ambientes</option>
        <option value="Hogar">Hogar</option>
        <option value="Oficina">Oficina</option>
        <option value="Comercial">Comercial</option>
      </select>

      <select onChange={handleByMaterial}>
  <option value="">Material</option>
  {materiales.map((material) => (
    <option key={material} value={material}>
      {material}
    </option>
      ))}
      </select>
    </div>
  );
};

export default Filters;
