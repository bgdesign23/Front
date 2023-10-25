import style from "../LoginForm/LoginForm.module.css"
function LoginForm() {
  return(
    <div className={style.login}>
      <form>

          <h1>FORM</h1>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" placeholder="Ingrese su email"/>
          <br/>
          <label htmlFor="password">Password:  </label>
          <input name="password" type="password" placeholder="Ingrese su contraseña"/>
          <br/>
          <h5>¿Olvidaste tu Contraseña?</h5>
          <button  className="btoninicial">SUBMIT</button>
      </form>
      </div>
  )
}

export default LoginForm;
