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
  const [editMode, setEditMode] = useState(false);
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

  const handleModificar = () => {
    setEditMode(true);
  }

  const handleChange = (event) => {
    if (event.target.name === "category") {
      setFormProduct({
        ...formProduct,
        category: event.target.value,
        newCategory: "",
      });
      setEditMode(false);
      setErrors(
        validationForm({
          ...formProduct,
          [event.target.name]: event.target.value,
        })
      );
    } else {
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
    }
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
    setEditMode(false);
  };

  return (
    <div className={styles.containerFor}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.sectionLeft}>
          <div className={styles.inputContainer}>
            <input //Nombre
              type="text"
              name="name"
              value={formProduct.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
          <br />
          <div className={styles.inputContainer}>
            <input //Tipo de Ambiente
              type="text"
              name="type"
              value={formProduct.type}
              onChange={handleChange}
              placeholder="Tipo de ambiente (ej.: Oficina, Comercial, Hogar)"
              required
            />
            {errors.type && <div className={styles.error}>{errors.type}</div>}
          </div>
          <br />
          <div className={styles.inputContainer}>
            <input //Material
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
          </div>
          <br />
          <div className={styles.inputContainer}>
            <input //Color
              type="text"
              name="color"
              value={formProduct.color}
              onChange={handleChange}
              placeholder="Color"
              required
            />
            {errors.color && <div className={styles.error}>{errors.color}</div>}
          </div>
          <br />
          <div className={styles.inputContainer}>
            <input
              type="number"
              min="0.01"
              step="0.01"
              name="price"
              value={formProduct.price}
              onChange={handleChange}
              placeholder="Precio"
              required
            />
            {errors.price && <div className={styles.error}>{errors.price}</div>}
          </div>
          <br />
          <textarea //Description
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
        </div>
        <div className={styles.sectionRight}>
          <div className={styles.images}>
            <br />
            <h5 className={styles.textImage}>Selecciona una Imagen</h5>
            <br />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.img}
            />
            <br />
            <br />
          </div>
          <select //Categorias selector
            name="category"
            value={formProduct.category}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {categories
              .sort((a, b) => a.name > b.name)
              .map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            <option onClick={handleModificar}>Crear nueva categoría</option>
          </select>
            <br />
            <br />
            <input
              type="text"
              name="newCategory"
              placeholder="Nueva categoría..."
              value={formProduct.newCategory}
              onChange={handleChange}
              disabled={!editMode}
            />
          {errors.category ? (
            <div className={styles.error}>{errors.category}</div>
          ): errors.newCategory ? (
            <div className={styles.error}>{errors.newCategory}</div>
          ) : null}
          <br />
          <br />
          <div className={styles.inputContainer}>
            <input
              type="text"
              pattern="[0-9]*"
              name="stock"
              value={formProduct.stock}
              onChange={handleChange}
              placeholder="Unidades disponibles"
              required
            />
            {errors.stock && (
              <div className={styles.error}>{errors.stock}</div>
            )}
          </div>
        </div>
        <div className={styles.buttonSend}>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;
