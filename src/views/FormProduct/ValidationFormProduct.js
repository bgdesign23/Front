const validationForm = (formProduct) => {
  const newErrors = {};

  if (!formProduct.name) {
    newErrors.name = "El nombre es requerido";
  }
  if (formProduct.name.length < 3 || formProduct.name.length > 140) {
    newErrors.name = "El nombre debe contener entre 3 y 140 caracteres";
  }
  if (/[0-9$%|<>#@]/g.test(formProduct.name)) {
    newErrors.name = "El nombre no puede contener caracteres especiales";
  }

  if (!formProduct.type) {
    newErrors.type = "Se requiere especificar el tipo de ambiente del producto";
  }
  if (/[0-9$%|<>#@]/g.test(formProduct.type)) {
    newErrors.type = "No se permiten caracteres especiales";
  }

  if (!formProduct.material) {
    newErrors.material = "Se requiere especificar el material del producto";
  }
  if (/[0-9$%|<>#@]/g.test(formProduct.material)) {
    newErrors.material = "No se permiten caracteres especiales";
  }

  if (!formProduct.color) {
    newErrors.color = "Se requiere especificar el color del producto";
  }
  if (/[0-9$%|<>#@]/g.test(formProduct.color)) {
    newErrors.color = "No se permiten caracteres especiales";
  }
  
  if (!formProduct.price || parseFloat(formProduct.price) < 0.01) {
    newErrors.price = "El precio del producto debe ser mayor a 0";
  }

  if (!formProduct.description) {
    newErrors.description = "Se requiere una pequeña descripción del producto";
  }
  if (formProduct.description.length < 10) {
    newErrors.description =
      "La descripción debe contener un mínimo de 10 caracteres";
  }
  if (/[$%|<>#@]/g.test(formProduct.description)) {
    newErrors.description = "No se permiten caracteres especiales";
  }

  if (!formProduct.category) {
    newErrors.category = "Debe seleccionar al menos una categoría";
  }
  if (formProduct.category === "Crear nueva categoría" && !formProduct.newCategory) {
    newErrors.newCategory = "Debes ingresar el nombre de la nueva categoría";
  }
  if (/[0-9$%|<>#@]/g.test(formProduct.newCategory)) {
    newErrors.newCategory = "No se permiten caracteres especiales";
  }

  if (!formProduct.stock || formProduct.stock < 1) {
    newErrors.stock = "La cantidad disponible debe ser mayor a 0";
  }
  if (/[^\d]/g.test(formProduct.stock)) {
    newErrors.stock = "La cantidad debe ser un número entero";
  }

  return newErrors;
};

export default validationForm;
