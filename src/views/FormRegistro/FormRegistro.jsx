import styles from "../FormRegistro/FormRegistro.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, filterRestart, googleUser } from "../../Redux/actions";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import imagennForm from "../LoginForm/fondodellogin.jpg";

// const URL = "http://localhost:3001";
const URL = "https://backend-muebles.vercel.app";

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

  const cuponBienvenida = {
    code: "bgdesign",
    discount: 0.2,
    expiration: "2023-12-31",
    usagesAvailable: 1,
    status: "activo",
  };

  const onSubmit = (data) => {
    data.coupon = cuponBienvenida;
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
      <div className={styles.imagennForm}>
        <img src={imagennForm} alt="" />
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                          value:
                            /^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){1,} *$/,
                          message: " Deben comenzar con mayuscula",
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
                          value: /^(?:[A-ZÁÉÍÓÚ][a-záéíóúü]+[\s-]?)+$/,
                          message: "Debe contener una localidad válida",
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
                        required: "Este campo es requerido",
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
              <div className={styles.iniciarsesion}>
                ¿Ya tenés una cuenta?{" "}
                <Link to="/form/login">Iniciá sesión</Link>
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit">REGISTRARSE</button>
              </div>
            </div>
          </form>
          <div className={styles.divGoogle}>
            <button onClick={() => handleOnGoogle()}>
              <FcGoogle /> CONTINUAR CON GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
