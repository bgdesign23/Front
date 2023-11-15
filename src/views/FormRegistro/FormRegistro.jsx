import styles from "../FormRegistro/FormRegistro.module.css";
import { useDispatch } from "react-redux";
import { /* Link, */ useNavigate } from "react-router-dom";
import { registerUser, filterRestart, googleUser } from "../../Redux/actions";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { URL } from "../../utils/toggleUrl.js";

export default function FormRegistro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    dispatch(registerUser(data, navigate));

    dispatch(filterRestart());
  };

  const handleOnGoogle = () => {
    const width = 500;
    const height = 600;
    const top = Math.max(
      (window.screen.availHeight - height) / 2,
      0
    ).toString();
    const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();

    window.open(
      `${URL}/users/google`,
      "Google Login",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );

    window.addEventListener("message", async function (event) {
      if (event.data.type === "AUTH_SUCCESS") {
        dispatch(googleUser(event.data.payload));
        navigate("/");
      } else if (event.data.type === "AUTH_ERROR") {
        await Swal.fire({
          title: event.data.payload.error,
          icon: "error",
          background: "#1A1A1A",
          color: "#ffffff",
        });
      }
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <div className={styles.loginContainer}>
          <p className={styles.titulo}>
            Completa los datos para crear tu cuenta
          </p>
          <form
            className={styles.containerForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.login}>
              <section className={styles.formimput}>
                <div className={styles.columna}>
                  <div className={styles.labelimput}>
                    <label>Nombre Completo:</label>
                    <input
                      type="text"
                      {...register("username", {
                        required: "Este campo es requerido",
                        pattern: {
                          // value: /^(?:[a-záéíóúü]\s?){1,20}$/,
                          message: "No debe superar los 20 caracteres",
                        },
                      })}
                      onBlur={() => {
                        setError("username", { shouldFocus: true });
                      }}
                    />
                    {errors.username && (
                      <p className={styles.error}>{errors.username.message}</p>
                    )}
                  </div>
                  <div className={styles.labelimput}>
                    <label>Localidad:</label>
                    <input
                      type="text"
                      {...register("location", {
                        required: "Este campo es requerido",
                        pattern: {
                          // value: /^(?:[a-záéíóúü]\s?){1,20}$/,
                          message: "Campo requerido",
                        },
                      })}
                      onBlur={() => {
                        setError("location", { shouldFocus: true });
                      }}
                    />
                    {errors.location && (
                      <p className={styles.error}>{errors.location.message}</p>
                    )}
                  </div>
                  <div className={styles.labelimput}>
                    <label>Contraseña:</label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Campo requerido",
                        minLength: {
                          value: 8,
                          message: "Debe contener mínimo 8 caracteres",
                        },
                      })}
                      onBlur={() => {
                        setError("password", { shouldFocus: true });
                      }}
                    />
                    {errors.password && (
                      <p className={styles.error}>{errors.password.message}</p>
                    )}
                  </div>{" "}
                </div>

                <div className={styles.columna}>
                  <div className={styles.labelimput}>
                    <label>Correo Electrónico:</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Debe ser un email válido",
                        },
                      })}
                      onBlur={() => {
                        setError("email", { shouldFocus: true });
                      }}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}
                  </div>
                  <div className={styles.labelimput}>
                    <label>Teléfono:</label>
                    <InputMask
                      mask="+54 999 9999 - 9999" // Establece la máscara
                      {...register("phone", {
                        required: "Este campo es requerido",
                      })}
                      onBlur={() => {
                        setError("phone", { shouldFocus: true });
                      }}
                    />
                    {errors.phone && (
                      <p className={styles.error}>{errors.phone.message}</p>
                    )}
                  </div>

                  <div className={styles.labelimput}>
                    <label>Confirmar Contraseña:</label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Este campo es requerido",
                        validate: (value) =>
                          value === password || "Las contraseñas no coinciden",
                      })}
                      onBlur={() => {
                        setError("confirmPassword", { shouldFocus: true });
                      }}
                    />
                    {errors.confirmPassword && (
                      <p className={styles.error}>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className={styles.buttonContainer}>
                <button className={styles.btn} type="submit">
                  Registrarse
                </button>
              </div>
            </div>
          </form>
          <div className={styles.divButtonGoogle}>
            <button
              className={styles.buttonGoogle}
              onClick={() => handleOnGoogle()}
            >
              <FcGoogle size={25} style={{ marginRight: "8px" }} /> Continuar
              con Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
