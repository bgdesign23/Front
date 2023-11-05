import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./PasswordReset.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  confirmPasswordReset,
} from "../../Redux/actions.js";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    dispatch(confirmPasswordReset(data.password, token, navigate)).then(() => {
      navigate("/form/login");
    });
  };

  return (
    <div className="page-container">
      <div className={styles.loginBackground}>
        <div className={styles.loginContainer}>
          <div className={styles.login}>
            <h2>Restablecer Contraseña</h2>
            <form
              className={styles.inputPadre}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.input1}>
                <label>Nueva Contraseña</label>
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
              </div>

              <div className={styles.input1}>
                <label>Confirmar nueva contraseña</label>
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
              <button type="submit">ENVIAR</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
