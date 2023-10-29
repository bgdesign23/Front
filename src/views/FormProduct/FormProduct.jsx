import { useState } from "react";
import styles from "./FormProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import validationForm from "./ValidationFormProduct";
import { postProduct } from "../../Redux/actions.js";
import { useNavigate } from "react-router-dom";

function FormProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const [errors, setErrors] = useState({});
  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    category: "",
    newCategory: "",
    type: "",
    material: "",
    color: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (event) => {
    setFormProduct({
      ...formProduct,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validationForm({
        ...formProduct,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormProduct({ ...formProduct, image: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formProduct.name);
    formData.append("description", formProduct.description);
    formData.append(
      "category",
      formProduct.newCategory ? formProduct.newCategory : formProduct.category
    );
    formData.append("type", formProduct.type);
    formData.append("material", formProduct.material);
    formData.append("color", formProduct.color);
    formData.append("price", formProduct.price);
    formData.append("stock", formProduct.stock);
    formData.append("image", formProduct.image);
    dispatch(postProduct(formData, navigate));
  };

  return (
    <div className={styles.containerFor}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formProduct.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
        <br />
        <textarea
          type="text"
          name="description"
          value={formProduct.description}
          onChange={handleChange}
          placeholder="Descripción..."
          rows="4"
          required
        />
        {errors.description && (
          <div className={styles.error}>{errors.description}</div>
        )}
        <br />
        <br />
        <select
          name="category"
          value={formProduct.category}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría de producto</option>
          {categories
            .sort((a, b) => a.name > b.name)
            .map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          <option value="nueva_categoria">Crear nueva categoría</option>
        </select>
        {formProduct.category === "nueva_categoria" && (
          <input
            type="text"
            name="newCategory"
            placeholder="Nueva categoría..."
            value={formProduct.newCategory}
            onChange={handleChange}
          />
        )}
        {errors.category && (
          <div className={styles.error}>{errors.category}</div>
        )}
        <br />
        <br />
        <input
          type="text"
          name="type"
          value={formProduct.type}
          onChange={handleChange}
          placeholder="Tipo de ambiente (ej.: Oficina, Comercial, Hogar)"
          required
        />
        {errors.type && <div className={styles.error}>{errors.type}</div>}
        <br />
        <br />
        <input
          type="text"
          name="material"
          value={formProduct.material}
          onChange={handleChange}
          placeholder="Material del mueble (ej.: Pino, Roble, Vidrio, Tela)"
          required
        />
        {errors.material && (
          <div className={styles.error}>{errors.material}</div>
        )}
        <br />
        <br />
        <input
          type="text"
          name="color"
          value={formProduct.color}
          onChange={handleChange}
          placeholder="Color"
          required
        />
        {errors.color && <div className={styles.error}>{errors.color}</div>}
        <br />
        <br />
        <input
          type="text"
          pattern="[0-9]*"
          name="price"
          value={formProduct.price}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        {errors.price && <div className={styles.error}>{errors.price}</div>}
        <br />
        <br />
        <label>
          <input
            id="En Stock"
            type="radio"
            name="stock"
            value="En Stock"
            onChange={handleChange}
          />{" "}
          En Stock
        </label>
        <br />
        <label>
          <input
            id="Sin Stock"
            type="radio"
            name="stock"
            value="Sin Stock"
            onChange={handleChange}
          />{" "}
          Sin Stock
        </label>
        {errors.stock && <div className={styles.error}>{errors.stock}</div>}
        <br />
        <br />
        Seleccionar imagen del producto
        <br />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormProduct;
