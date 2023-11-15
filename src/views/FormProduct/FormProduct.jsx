import { useState } from "react";
import styles from "./FormProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import validationForm from "./ValidationFormProduct";
import { postProduct } from "../../Redux/actions.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  };

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
    const maxSize = 2 * 1024 * 1024;
    if (file && file.size > maxSize) {
      Swal.fire({
        text: "La imagen es demasiado grande. (Máximo: 2 Mb)",
        icon: "warning",
        background: "#3b3838",
        color: "#ffffff",
        timer: 3000,
      });
      event.target.value = null;
      return;
    }
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
        <div className={styles.tituloPadre}>
          <h6>Crear nuevo producto</h6>
        </div>
        <div className={styles.sectionLeft}>
          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Nombre del producto</h6>
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

          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Ambiente</h6>
            <input //Tipo de Ambiente
              type="text"
              name="type"
              value={formProduct.type}
              onChange={handleChange}
              placeholder="(ej.: Oficina, Comercial, Hogar)"
              required
            />
            {errors.type && <div className={styles.error}>{errors.type}</div>}
          </div>

          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Material</h6>
            <input //Material
              type="text"
              name="material"
              value={formProduct.material}
              onChange={handleChange}
              placeholder="(ej.: Pino, Roble, Vidrio, Tela)"
              required
            />
            {errors.material && (
              <div className={styles.error}>{errors.material}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Color</h6>
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

          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Precio</h6>
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

          <h6 className={styles.titulosForm}>Ingresa la descripción:</h6>
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
        </div>

        <div className={styles.sectionRight}>
          <div className={styles.inputContainer}>
            <div className={styles.images}>
              <h6 className={styles.titulosForm}>Selecciona imagen</h6>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Seleccionar categoría</h6>
            <select //Categorias selector
              name="category"
              value={formProduct.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione una categoría
              </option>
              {categories
                .sort((a, b) => a.name > b.name)
                .map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              {errors.category && (
                <div className={styles.error}>{errors.category}</div>
              )}
              <div />
              <option onClick={handleModificar}>Crear nueva categoría</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Crear Categoria</h6>
            <input
              type="text"
              name="newCategory"
              placeholder="  Nueva categoría..."
              value={formProduct.newCategory}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          {errors.newCategory && (
            <div className={styles.error}>{errors.newCategory}</div>
          )}
          <div className={styles.inputContainer}>
            <h6 className={styles.titulosForm}>Cantidad</h6>
            <input
              type="text"
              pattern="[0-9]*"
              name="stock"
              value={formProduct.stock}
              onChange={handleChange}
              placeholder="Unidades disponibles"
              required
            />
            {errors.stock && <div className={styles.error}>{errors.stock}</div>}
          </div>
          <div className={styles.buttonSend}>
            <button type="submit">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;
