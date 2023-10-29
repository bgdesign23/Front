import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/actions.js';
import Style from "../LoginForm/LoginForm.module.css"
function LoginForm() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      email: input.email,
      password: input.password,
    };

    try {
      await dispatch(loginUser(credentials)); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div className={Style.loginContainer}>
    <div className={Style.login}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">INICIAR SESIÓN</button>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
