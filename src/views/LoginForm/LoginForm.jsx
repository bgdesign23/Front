import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleUser, loginUser } from "../../Redux/actions.js";
import Style from "../LoginForm/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import imagennForm from "../LoginForm/fondodellogin.jpg";

// const URL = "http://localhost:3001";
const URL = "https://backend-muebles.vercel.app";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      email: input.email,
      password: input.password,
    };

    dispatch(loginUser(credentials, navigate));
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
    <div className="page-container">
      <div className={Style.loginBackground}>
        <div className={Style.loginContainer}>
          <div className={Style.login}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">INICIAR SESIÓN</button>
            </form>
            <div className={Style.divGoogle}>
              <button onClick={() => handleOnGoogle()}>
                <FcGoogle /> CONTINUAR CON GOOGLE
              </button>
            </div>
          </div>
        </div>

        <img src={imagennForm} alt="" />
      </div>
    </div>
  );
}

export default LoginForm;
