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

  useEffect(() => {
    const filteredProducts = applyCombinedFilters(product, selectedFilters);
  }, [product, selectedFilters, dispatch]);

  useEffect(() => {
    if (product.length === 0) {
      setTimeout(() => {
        const selectElements = document.querySelectorAll("select");
        selectElements.forEach((select) => {
          select.value = "default";
          setSelectedFilters({
            byColor: "default",
            byMaterial: "default",
            category: "default",
            type: "default",
          });
        });
      }, 2000);
    }
  }, [product]);

  const handleOrderChange = (e) => {
    const orderDirection = e.target.value;
    dispatch(orderbyprice(product, orderDirection));
  };

  const handleFilterRestart = () => {
    dispatch(getProductsAction());
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "default";
      setSelectedFilters({
        byColor: "default",
        byMaterial: "default",
        category: "default",
        type: "default",
      });
    });
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
      <div className={Style.FiltersContainer}>
        <label className={Style.FiltersLabels} htmlFor="category">Categoria</label>
        <select
          id="category"
          onChange={handleFilterCategory}
          value={selectedFilters.category}
          className={Style.FiltersSelects}
        >
          <option value="default">
            Seleccionar
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={Style.FiltersContainer}>
        <label className={Style.FiltersLabels} htmlFor="price">Precio</label>
        <select
          id="price"
          onChange={handleOrderChange}
          value={selectedFilters.byPrice}
          className={Style.FiltersSelects}
        >
          <option value="default">
            Seleccionar
          </option>
          <option value="Menor">Menor a Mayor</option>
          <option value="Mayor">Mayor a Menor</option>
        </select>
      </div>

      <div className={Style.FiltersContainer}>
        <label className={Style.FiltersLabels} htmlFor="color">Color</label>
        <select
          id="color"
          onChange={handleByColor}
          value={selectedFilters.byColor}
          className={Style.FiltersSelects}
        >
          <option value="default">
            Seleccionar
          </option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className={Style.FiltersContainer}>
        <label className={Style.FiltersLabels} htmlFor="type">Ambiente</label>
        <select
          id="type"
          onChange={handleFilterType}
          value={selectedFilters.type}
          className={Style.FiltersSelects}
        >
          <option value="default">
            Seleccionar
          </option>
          <option value="Hogar">Hogar</option>
          <option value="Oficina">Oficina</option>
          <option value="Comercial">Comercial</option>
        </select>
      </div>

      <div className={Style.FiltersContainer}>
        <label className={Style.FiltersLabels} htmlFor="material">Material</label>
        <select
          id="material"
          onChange={handleByMaterial}
          value={selectedFilters.byMaterial}
          className={Style.FiltersSelects}
        >
          <option value="default">
            Seleccionar
          </option>
          {materiales.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>

      <button className={Style.buttonSecundary} onClick={handleFilterRestart}>
        Limpiar
      </button>
    </div>
  );
};

export default Filters;
