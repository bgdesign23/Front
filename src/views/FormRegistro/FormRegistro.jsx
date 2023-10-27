
import styles from "../FormRegistro/FormRegistro.module.css"
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser, filterRestart } from "../../Redux/actions";

function validation(input) {
  const errors = {};
  if (!input.username || !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(input.username)) {
    errors.username = "Debe tener un nombre válido con la primera letra mayúscula y permitir nombres compuestos de hasta 255 caracteres.";
  }
  if (!input.location || !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(input.location)) {
    errors.location = "Debe tener un nombre válido, con la primera letra mayúscula. Permite compuestos separados por un guión (-)";
  }
  if (!/^\(\d{3}\)\d{4}-\d{4}$/.test(input.phone)) {
    errors.phone = "Debe contener un número de teléfono válido. Ej (000)0000-0000 ";
  }
  if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "Debe ser un email válido";
  }
  if (input.password.length < 8) {
    errors.password = "Debe contener mínimo 8 caracteres";
  }
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }
  return errors;
}


export default function FormRegistro() {
    const dispatch = useDispatch() 

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
      username: "",
      phone: "",
      location: "",
      email: "",
      password: "",
      confirmPassword:"",
      formSubmitted: false

    });


    function handleChange(event) { 
        console.log(input); 
        setInput({ 
            ...input,
            [event.target.name]: event.target.value 
        }) 
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }))   
    }

    function handleSubmit(event) {
      event.preventDefault();
      setErrors(validation(input));
      setInput((prevInput) => ({ ...prevInput, formSubmitted: true }));
      
      if (
        Object.keys(errors).length === 0 &&
        input.username !== "" &&
        input.location !== "" &&
        input.email !== "" &&
        input.password !== "" &&
        input.confirmPassword !== ""
      ) {
        dispatch(registerUser()); 
        dispatch(filterRestart());
        alert("USUARIO CREADO CON ÉXITO, POR FAVOR INICIE SESIÓN");
        setInput({
          username: "",
          phone: "",
          location: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert("Debe ingresar todos los datos.");
      }
    }

      return (
    <div>
      <h2>Registro de Usuario</h2>
      <form className={styles.containerRegistro} onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div>
          <label>Localidad:</label>
          <input
            type="text"
            name="location"
            value={input.location}
             onChange={(event) => handleChange(event)}
            required
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>

        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="phone"
            value={input.dob}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(event) => handleChange(event)}

            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button type="submit"
               > REGISTRARSE </button>

        <Link to="/form/login">

                <button> INICIAR SESION </button>

            </Link>
      </form>
    </div>
  );
}

      
         