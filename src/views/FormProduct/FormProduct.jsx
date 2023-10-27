import  React, { useState } from 'react';
import axios from 'axios';
import styles from './FormProduct.module.css'

function FormProduct() {
  const [formProduct, setFormProduct] = useState({ 
    name: '',
    type:'',
    material: '', 
    price: '',
    image: '',
    color: '',
    description: ''
 });

  const [errors, setErrors] = useState({}) //objeto vacío para los errores

  const validationForm = () => {
    const newErrors = {}
     
    if(formProduct.Nombre.trim() === ''){
      newErrors.Nombre = 'El nombre es obligatorio'    
    }

  return newErrors
}

  const handleChange = (e) => {
    setFormProduct({
      ...formProduct,
      [e.target.name]: e.target.value
    })

    setErrors(
      validationForm({
        ...formProduct,
        [e.target.name]: e.target.value
      })
    )

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formProduct);

    try {
      const response = await axios.post('url', formProduct)
      
      if(response.status === 201){
        alert('Creación exitosa')
        setFormProduct({
          Nombre: '',
          Tipo:'',
          Material: '', 
          Precio: '',
          Image: '',
          Color: '',
          Descripción: ''
        })
      } else {
        console.error('Error al crear el producto')
      }
    } catch (error) {
      console.error('Ha ocurrido un error:', error)
    }
    
    }
  
  return (
    <div className={styles.containerFor}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="Nombre" 
          value={formProduct.Nombre}
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
          value={formProduct.Tipo}
          onChange={handleChange}
          placeholder="Tipo de mueble"
          required
         />
         <br />
         <br />
        <input
          type="text"
          name="Material"
          value={formProduct.Material}
          onChange={handleChange}
          placeholder="Material del mueble"          
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="Precio"
          value={formProduct.Precio}
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
          value={formProduct.Color}
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
          value={formProduct.Image}
          onChange={handleChange}
          placeholder="Image"
          required
        />
        <br />
        <br />
        <textarea
          type="text"  
          name="Descripción"
          value={formProduct.Descripción}
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
