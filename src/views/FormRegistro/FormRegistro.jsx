import styles from "../FormRegistro/FormRegistro.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser, filterRestart } from "../../Redux/actions";

function validation(input) {
  const errors = {};
  if (!input.username || !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(input.username)) {
    errors.username = "Debe contener un Nombre. Ej: Maria Luna";
  }
  if (!input.location || !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(input.location)) {
    errors.location = "Debe tener un Nombre válido";
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
        dispatch(registerUser(input)); 
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
      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.login}>

     <section  className={styles.formimput}> 
        <div className={styles.columna}>
          <div className={styles.labelimput}>
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={(event) => handleChange(event)}
              required
            />
            {errors.username && <p className={styles.error}> {errors.username} </p>}
          </div>

          <div className={styles.labelimput}>
            <label>Localidad:</label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={(event) => handleChange(event)}
              required
            />
            {errors.location && <p className={styles.error}>{errors.location}</p>}
          </div>

          <div className={styles.labelimput}>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={input.phone}
              onChange={(event) => handleChange(event)}
              required
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          
        </div>

        <div className={styles.columna}>
          <div className={styles.labelimput}>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(event) => handleChange(event)}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.labelimput}>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(event) => handleChange(event)}
              required
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.labelimput}>
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={(event) => handleChange(event)}
              required
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>
        </div>  
      </section>     

          <div className={styles.buttonContainer}>
          <button type="submit">REGISTRARSE</button>
          <Link to="/form/login">
            <button>INICIAR SESIÓN</button>
          </Link>
        </div>
        </div>
       
      </form>
    </div>
  );
}

      
         