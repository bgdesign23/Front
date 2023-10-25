import  { useState } from 'react';
import styles from './formDecoracion.module.css'


function FormDecoracion() {
  const [formData, setFormData] = useState({ 
    Nombre: '',
    Apellido:'',
    NumeroDeTelefono: '', 
    Localidad: '',
    Mensaje: ''
 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

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
