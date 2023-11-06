import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from "../../Redux/actions";
import styles from "../PerfilUser/PerfilUser.module.css";

function PerfilUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    id: "",
    username: '',
    location: '',
    phone: '',
    email: '',
    image: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.user) {
      const user = userData.user;

      setFormData({
        id: user.id || '',
        username: user.username || '',
        location: user.location || '',
        phone: user.phone || '',
        email: user.email || '',
        image: user.profileImage || '',
        currentPassword: '',
        newPassword: '',
      });
    }
  }, [userData]);

  const handleUpdateUser = () => {
    dispatch(updateUser(formData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(updateUser(formData));
  alert('Los cambios se guardaron correctamente');
};
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };
  
  return (
    <div>
      {console.log('formData en el render:', formData)}

      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <section className={styles.formimput}>
            <div className={styles.columna}>
             <div className={styles.labelimput}>
                 <label>Imagen de usuario :</label>
  {formData.image && (
    <img
      src={formData.image}
      alt="Imagen de usuario"
      className={styles.profileImage}
    />
  )}
            <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        </div>
              <div className={styles.labelimput}>
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Ubicación:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Correo electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.labelimput}>
                <label>Contraseña actual:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div >
                <label>Nueva contraseña:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
          <div className={styles.buttonContainer}>
            <button onClick={handleUpdateUser}>Guardar cambios</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PerfilUser;







