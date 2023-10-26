import styles from './FormRegistro.module.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function FormRegistro() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    nationality: '',
    birthdate: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName.trim() === '') {
      newErrors.firstName = "El nombre es obligatorio";
    }

    if (formData.lastName.trim() === '') {
      newErrors.lastName = "El apellido es obligatorio";
    }

    if (formData.nationality.trim() === '') {
      newErrors.nationality = "La nacionalidad es obligatoria";
    }

    if (formData.birthdate.trim() === '') {
      newErrors.birthdate = "La fecha de nacimiento es obligatoria";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert('REGISTRO EXITOSO, PORFAVOR INICIE SESION');
      setFormData(initialFormData); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form className={styles.containerRegistro} onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div>
          <label>Nacionalidad:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
          {errors.nationality && <p className="error-message">{errors.nationality}</p>}
        </div>

        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
          {errors.birthdate && <p className="error-message">{errors.birthdate}</p>}
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">REGISTRARSE</button>
        <Link to="/form/login">
                <button> INICIAR SESION </button>
            </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FormRegistro;

  
  