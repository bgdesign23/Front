import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/actions";
import styles from "../../views/PerfilUser/PerfilUser.module.css";



function PerfilUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


  const [input, setInput] = useState({
    username: (user && user.username) || "",
    location: (user && user.location) || "",
    phone: (user && user.phone) || "",
    email: (user && user.email) || "",
    password: "",
    confirmPassword: "",
    formSubmitted: false,
  });



  useEffect(() => {
  }, [user]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (userData.id) {
      dispatch(updateUser(userData));
    } else {
      // Manejar el caso en que userData.id es undefined
      console.error("userData.id es undefined");
    }
    setInput((prevInput) => ({ ...prevInput, formSubmitted: true }));
     {
      dispatch(updateUser(input));
    }
  }

  return (
    <div>
      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <section className={styles.formimput}>
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
               
              </div>
            </div>
          </section>

          <div className={styles.buttonContainer}>
            <button type="submit"> Modificar Datos </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PerfilUser;
