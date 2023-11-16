import { useState } from "react";
import styles from "./formDecoracion.module.css";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

function FormDecoracion() {
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    NumeroDeTelefono: "",
    Localidad: "",
    Mensaje: "",
  });

  const [errors, setErrors] = useState({}); //objeto vacío para los errores

  const validationForm = () => {
    const newErrors = {};

    if (formData.Nombre.trim() === "") {
      newErrors.Nombre = "El nombre es obligatorio";
    }
    if (formData.Apellido.trim() === "") {
      newErrors.Apellido = "El apellido es obligatorio";
    }
    if (formData.Mensaje.trim() === "") {
      newErrors.Mensaje = "El mensaje es obligatorio";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validationForm({
        ...formData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationForm()) {
      Swal.fire({
        title: "Envío exitoso",
        text: "Solicitud enviada exitosamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        background: "#3b3838",
        color: "#ffffff",
      });
      setFormData({
        Nombre: "",
        Apellido: "",
        NumeroDeTelefono: "",
        Localidad: "",
        Mensaje: "",
      });
    }
  };

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <div className={styles.containerFor}>
        <div className={styles.formContainer}>
          <div className={styles.contain}>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <input // Nombre
                    type="text"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                    className={styles.inputs}
                  />
                  {errors.Nombre && (
                    <div
                      className={styles.error}
                      style={{ color: "rgba(255, 0, 0, 0.7)" }}
                    >
                      {errors.Nombre}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <input // Apellido
                    type="text"
                    name="Apellido"
                    value={formData.Apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    required
                    className={styles.inputs}
                  />{" "}
                  {errors.Apellido && (
                    <div
                      className={styles.error}
                      style={{ color: "rgba(255, 0, 0, 0.7)" }}
                    >
                      {errors.Apellido}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.numberTel}>
                    <InputMask // Número de Teléfono
                      mask="+54 999 9999 - 9999" // Máscara
                      {...("phone",
                      {
                        required: "Este campo es requerido",
                      })}
                      type="tel"
                      name="NumeroDeTelefono"
                      value={formData.NumeroDeTelefono}
                      onChange={handleChange}
                      placeholder="Número de Teléfono"
                      required
                      className={styles.inputs}
                    />
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.localidad}>
                    <input // Localidad
                      type="text"
                      name="Localidad"
                      value={formData.Localidad}
                      onChange={handleChange}
                      placeholder="Localidad"
                      required
                      className={styles.inputs}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <dir className={styles.Mensaje}>
                    <textarea // Mensaje
                      name="Mensaje"
                      value={formData.Mensaje}
                      onChange={handleChange}
                      placeholder="Mensaje"
                      rows="4"
                      required
                      className={styles.inputs}
                    />{" "}
                    {errors.Mensaje && (
                      <div
                        className={styles.error}
                        style={{ color: "rgba(255, 0, 0, 0.7)" }}
                      >
                        {errors.Mensaje}
                      </div>
                    )}
                  </dir>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <button type="submit">Enviar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <button className={styles.backButton} onClick={back}>
        Back
      </button>
    </>
  );
}

export default FormDecoracion;
