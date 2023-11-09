import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../Redux/actions";
import styles from "./FormUser.module.css";

function PerfilUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [formUser, setFormUser] = useState({
    username: "",
    location: "",
    phone: "",
    email: "",
    image: "",
    currentPassword: "",
    newPassword: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.user) {
      const user = userData.user;
      setFormUser({
        username: user.username || "",
        location: user.location || "",
        phone: user.phone || "",
        email: user.email || "",
        image: user.image || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [userData]);

  const handleInputChange = (event) => {
    setFormUser({ ...formUser, [event.target.name]: event.target.value });
  };
  const handleModificar = () => {
    setEditMode(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (formUser.username) {
      formData.append("username", formUser.username);
    }
    if (formUser.location) {
      formData.append("location", formUser.location);
    }
    if (formUser.phone) {
      formData.append("phone", formUser.phone);
    }
    if (formUser.email) {
      formData.append("email", formUser.email);
    }
    if (formUser.image) {
      formData.append("image", formUser.image);
    }
    if (formUser.newPassword) {
      formData.append("newPassword", formUser.newPassword);
    }
    dispatch(updateUser(formData, userData.token));

    setEditMode(false);
  };

  return (
    <div>
      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <section className={styles.formimput}>
            <div className={styles.columna}>
              <div className={styles.labelimput}>
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  name="username"
                  value={formUser.username}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Ubicación:</label>
                <input
                  type="text"
                  name="location"
                  value={formUser.location}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={formUser.phone}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Correo electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formUser.email}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Contraseña actual:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formUser.currentPassword}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <label>Nueva contraseña:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formUser.newPassword}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </section>
          <div className={styles.buttonContainer}>
            {editMode ? (
              <button type="button" onClick={handleSubmit}>
                Guardar Datos
              </button>
            ) : (
              <button type="button" onClick={handleModificar}>
                Modificar Datos
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PerfilUser;
