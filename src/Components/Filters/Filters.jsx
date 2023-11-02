import { useDispatch, useSelector } from "react-redux";
import { applyCombinedFilters } from "./CombinedFilters";
import Style from "../Filters/Filters.module.css";

import {
  filterByColor,
  filterByMaterial,
  filterCategories,
  filteredByType,
  orderbyprice,
  getProductsAction,
} from "../../Redux/actions";
import { useEffect, useState } from "react";

const Filters = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const copy = useSelector((state) => state.products_Copy);
  const categories = useSelector((state) => state.categories);
  const [selectedFilters, setSelectedFilters] = useState({
    byColor: "",
    byMaterial: "",
    category: "",
    type: "",
  });

  const filteredProducts = applyCombinedFilters(product, selectedFilters);

  console.log("Productos filtrados: ", filteredProducts);
  console.log("Filtros seleccionados :", selectedFilters);

  useEffect(() => {
    const filteredProducts = applyCombinedFilters(product, selectedFilters);
  }, [product, selectedFilters, dispatch]);

  const handleOrderChange = (e) => {
    const orderDirection = e.target.value;
    dispatch(orderbyprice(product, orderDirection));
  };

  const handleFilterRestart = () => {
    dispatch(getProductsAction());
  };

  const colors = [...new Set(copy.map((prod) => prod.color))];
  const handleByColor = (event) => {
    const byColor = event.target.value;
    dispatch(filterByColor(byColor, product));
    setSelectedFilters({
      ...selectedFilters,
      byColor,
    });
  };

  const materiales = [...new Set(copy.map((mat) => mat.material))];
  const handleByMaterial = (event) => {
    const byMaterial = event.target.value;
    dispatch(filterByMaterial(byMaterial, product));
    setSelectedFilters({
      ...selectedFilters,
      byMaterial,
    });
  };

  const handleFilterCategory = (event) => {
    const category = event.target.value;
    dispatch(filterCategories(category, product));
    setSelectedFilters((prevFilters) => ({ ...prevFilters, category }));
  };

  const handleFilterType = (event) => {
    const type = event.target.value;
    dispatch(filteredByType(product, type));
    setSelectedFilters({
      ...selectedFilters,
      type,
    }); // Corrección aquí
  };

  return (
    <div className={Style.Filters}>
      <select onChange={handleFilterCategory} value={selectedFilters.category}>
        <option value="">Categorias</option>
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

      <select onChange={handleByColor} value={selectedFilters.byColor}>
        <option value="">Color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>

      <select onChange={handleFilterType} value={selectedFilters.type}>
        <option value="">Ambientes</option>
        <option value="Hogar">Hogar</option>
        <option value="Oficina">Oficina</option>
        <option value="Comercial">Comercial</option>
      </select>

      <select onChange={handleByMaterial} value={selectedFilters.byMaterial}>
        <option value="">Material</option>
        {materiales.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
      </select>

      <button className={Style.buttonSecundary} onClick={handleFilterRestart}>
        Limpiar
      </button>
    </div>
  );
};

export default Filters;
