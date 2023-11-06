import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../Redux/actions";
import styles from "../PerfilUser/PerfilUser.module.css";

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

  /* useEffect(() => {
    dispatch(getUser());
  }, [dispatch]); */

  useEffect(() => {
    if (userData && userData.user) {
      const user = userData.user;

      setFormUser({
        username: user.username || "",
        location: user.location || "",
        phone: user.phone || "",
        email: user.email || "",
        image: user.profileImage || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, []);

  const handleInputChange = (event) => {
    setFormUser({ ...formUser, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormUser({ ...formUser, image: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", formUser.username);
    formData.append("location", formUser.location);
    formData.append("phone", formUser.phone);
    formData.append("email", formUser.email);
    formData.append("image", formUser.image);
    formData.append("newPassword", formUser.newPassword);
    dispatch(updateUser(formData, userData.token));
  };

  return (
    <div>
      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <section className={styles.formimput}>
            <div className={styles.columna}>
              <div className={styles.labelimput}>
                <label>Imagen de usuario :</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {userData.user.image && (
                  <img
                    src={userData.user.image}
                    alt="Imagen de usuario"
                    className={styles.profileImage}
                  />
                )}
              </div>
              <div className={styles.labelimput}>
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  name="username"
                  value={formUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Ubicación:</label>
                <input
                  type="text"
                  name="location"
                  value={formUser.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={formUser.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Correo electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Contraseña actual:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formUser.currentPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Nueva contraseña:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formUser.newPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
          <div className={styles.buttonContainer}>
            <button type="submit">Guardar cambios</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PerfilUser;
