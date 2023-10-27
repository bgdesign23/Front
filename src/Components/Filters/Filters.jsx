import { useDispatch, useSelector } from "react-redux";

import {
  filterByColor,
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
    <div>
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
      
      <label> Ordenar por precio: </label>
      <select onChange={handleOrderChange}>
        <option value="Menor">Menor a Mayor</option>
        <option value="Mayor">Mayor a Menor</option>
      </select>

      <select onChange={handleByColor}>
        <option value=""> Selecciona un color </option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      
      <label> Ordenar por ambiente: </label>
      <select onChange={handleFilterType} value={copy}>
        <option value="">Ambientes</option>
        <option value="Hogar">Hogar</option>
        <option value="Oficina">Oficina</option>
        <option value="Comercial">Comercial</option>
      </select>
    </div>
  );
};

export default Filters;
