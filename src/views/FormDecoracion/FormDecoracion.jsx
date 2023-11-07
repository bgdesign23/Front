import { useState } from "react";
import styles from "./formDecoracion.module.css";
import Swal from "sweetalert2";

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
    if (!/^[\d+]+$/.test(formData.NumeroDeTelefono)) {
      newErrors.NumeroDeTelefono =
        "El número de teléfono solo pueden ser números sin espacios, puedes incluir también el indicativo de tu país con el signo +";
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
                    <div className={styles.error}>{errors.Nombre}</div>
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
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.numberTel}>
                    <input // Número de Teléfono
                      type="tel"
                      name="NumeroDeTelefono"
                      value={formData.NumeroDeTelefono}
                      onChange={handleChange}
                      placeholder="Número de Teléfono"
                      pattern="[0-9]+"
                      required
                      className={styles.inputs}
                    />
                    {errors.NumeroDeTelefono && (
                      <div className={styles.error}>
                        {errors.NumeroDeTelefono}
                      </div>
                    )}
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
                  <textarea // Mensaje
                    name="Mensaje"
                    value={formData.Mensaje}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    rows="4"
                    required
                    className={styles.inputs}
                  />
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
