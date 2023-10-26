import style from "./LoginForm.module.css"

/*function LoginForm() {
  return(
    <div className={style.login}>
      <form>

          <h1>FORM</h1>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" placeholder="Ingrese su email"/>
          <br/>
          <label htmlFor="password">Password:  </label>
          <input name="password" type="password" placeholder="Ingrese su contraseña"/>
          <br/>
          <h5>¿Olvidaste tu Contraseña?</h5>
          <button  className="btoninicial">SUBMIT</button>
      </form>
      </div>
  )
}*/


import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);

      if (response.status === 200) {
        
      } else {
        setError('El inicio de sesión falló. Email o Contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={style.login}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button className="btoninicial" >Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
} 



export default LoginForm;
