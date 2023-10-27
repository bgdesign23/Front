import  React, { useState } from 'react';
import styles from './FormProduct.module.css'

function FormProduct() {
  const [formData, setFormData] = useState({ 
    Nombre: '',
    Tipo:'',
    Material: '', 
    Precio: '',
    Image: '',
    Color: '',
    Descripción: ''
 });

  const [errors, setErrors] = useState({}) //objeto vacío para los errores

  const validationForm = () => {
    const newErrors = {}
     
    if(formData.Nombre.trim() === ''){
      newErrors.Nombre = 'El nombre es obligatorio'    
    }

  return newErrors
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setErrors(
      validationForm({
        ...formData,
        [e.target.name]: e.target.value
      })
    )

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validationForm()){
      alert('Creación exitosa')
      setFormData({
        Nombre: '',
        Apellido:'',
        NumeroDeTelefono: '', 
        Localidad: '',
        Mensaje: ''
      })
    }
    
    }
  
  return (
    <div className={styles.containerFor}>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="Nombre" 
        value={formData.Nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
         />
        {errors.Nombre && <div className={styles.error}>{errors.Nombre}</div>}
         <br />
         <br />
          <input
         type="text" 
         name="Tipo" 
         value={formData.Tipo}
         onChange={handleChange}
         placeholder="Tipo de mueble"
         required
         />
         <br />
         <br />
        <input
          type="text"
          name="Material"
          value={formData.Material}
          onChange={handleChange}
          placeholder="Material del mueble"
          pattern="[0-9]+"
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="precio"
          value={formData.Precio}
          onChange={handleChange}
          placeholder="Precio"
          pattern="[0-9]+"
          required
        />
        <br />
        <br />       
        <input
          type="text"
          name="Color"
          value={formData.Color}
          onChange={handleChange}
          placeholder="Color"
          required
        />
        <br />
        <br />
        Imagen: 
        <input
          type="file"
          name="Image"
          accept="image/*"
          value={formData.Image}
          onChange={handleChange}
          placeholder="Image"
          required
        />
        <br />
        <br />
        <textarea
          type="text"  
          name="Descripción"
          value={formData.Descripción}
          onChange={handleChange}
          placeholder="Descripción"
          rows="4"
          required
        />
        <br />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormProduct;
