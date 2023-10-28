import  React, { useState } from 'react';
import styles from './formDecoracion.module.css'

function FormDecoracion() {
  const [formData, setFormData] = useState({ 
    Nombre: '',
    Apellido:'',
    NumeroDeTelefono: '', 
    Localidad: '',
    Mensaje: ''
 });

  const [errors, setErrors] = useState({}) //objeto vacío para los errores

  const validationForm = () => {
    const newErrors = {}
     
    if(formData.Nombre.trim() === ''){
      newErrors.Nombre = 'El nombre es obligatorio'    
    }
    if(!/^[\d+]+$/.test(formData.NumeroDeTelefono)){
      newErrors.NumeroDeTelefono = 'El número de teléfono solo pueden ser números sin espacios, puedes incluir también el indicativo de tu país con el signo +'
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
         name="Apellido" 
         value={formData.Apellido}
         onChange={handleChange}
         placeholder="Apellido"
         required
         />
         <br />
         <br />
        <input
          type="tel"
          name="NumeroDeTelefono"
          value={formData.NumeroDeTelefono}
          onChange={handleChange}
          placeholder="Número de Teléfono"
          pattern="[0-9]+"
          required
        />
        {errors.NumeroDeTelefono && <div className={styles.error}>{errors.NumeroDeTelefono}</div>}
        <br />
        <br />
       
        <input
          type="text"
          name="Localidad"
          value={formData.Localidad}
          onChange={handleChange}
          placeholder="Localidad"
          required
        />
        <br />
        <br />
        <textarea
          name="Mensaje"
          value={formData.Mensaje}
          onChange={handleChange}
          placeholder="Mensaje"
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

export default FormDecoracion;
