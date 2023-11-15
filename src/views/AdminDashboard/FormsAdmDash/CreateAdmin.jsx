import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAdmin, clearErrors } from "../../../Redux/actions";
import Swal from "sweetalert2";
import styles from "../FormsAdmDash/createAdminForm.module.css";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [inputAdmin, setInputAdmin] = useState({
    username: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    role: "",
  });

  //   const isFormValid = () => {
  //     const numberAndSigns = /^[\d.,/]+$/;
  //     return (
  //       numberAndSigns.test(inputAdmin.phone)
  //     );
  //   };

  const handleCreateAdmin = async (event) => {
    event.preventDefault();

    // if (!isFormValid()) {
    //     console.error("Completa los campos correspondientes al celular");
    //     return;
    //   }
    try {
      const response = await dispatch(createAdmin(inputAdmin));
      if (response && response.error) {
        dispatch(
          setErrors({
            type: "CREATE_ADMIN",
            error: response.error.response.data,
          })
        );
      } else {
        dispatch(clearErrors());
        Swal.fire("Listo!", "Has creado un nuevo administrador!", "success");
        setInputAdmin({
          ...inputAdmin,
          username: "",
          phone: "",
          location: "",
          email: "",
          password: "",
          role: "",
        });
      }
    } catch (error) {
      console.error("Error al crear el administrador:", error);
    }
  };
  return (
    <div className={styles.containerAbuelo}>
      <div className={styles.containerPadre}>
        <h6 className={styles.crearAdminTitulo}>Crear nuevo administrador</h6>
        <form className={styles.containerForm} onSubmit={handleCreateAdmin}>
          <div className={styles.ladoA}>
            <div className={styles.boxinputs}>
              <label>
                Username:
                <input
                  type="text"
                  placeholder="Eje: nombre"
                  value={inputAdmin.username}
                  onChange={(e) =>
                    setInputAdmin({ ...inputAdmin, username: e.target.value })
                  }
                />
              </label>
            </div>

            <div className={styles.boxinputs}>
              <label>
                Phone:
                <input
                  type="text"
                  placeholder="Eje: +54 5555- 555"
                  value={inputAdmin.phone}
                  onChange={(e) =>
                    setInputAdmin({ ...inputAdmin, phone: e.target.value })
                  }
                />
              </label>
            </div>

            <div className={styles.boxinputs}>
              <label>
                Location:
                <input
                  type="text"
                  placeholder="Eje: Argentina"
                  value={inputAdmin.location}
                  onChange={(e) =>
                    setInputAdmin({ ...inputAdmin, location: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          <div className={styles.ladoB}>
            <div className={styles.boxinputs}>
              <label>
                Email:
                <input
                  type="text"
                  placeholder="Eje: marioPerez@gmail.com"
                  value={inputAdmin.email}
                  onChange={(e) =>
                    setInputAdmin({ ...inputAdmin, email: e.target.value })
                  }
                />
              </label>
            </div>

            <div className={styles.boxinputs}>
              <label>
                Password:
                <input
                  type="password"
                  placeholder="Eje: cacao123"
                  value={inputAdmin.password}
                  onChange={(e) =>
                    setInputAdmin({ ...inputAdmin, password: e.target.value })
                  }
                />
              </label>
            </div>

            <div className={styles.boxinputs}>
              <label>
                Role:
                <input
                  type="text"
                  placeholder="Eje: 1 o 2"
                  value={inputAdmin.role}
                  onChange={(e) =>
                    setInputAdmin({ ...inputAdmin, role: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          <button className={styles.btn} type="submit">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
