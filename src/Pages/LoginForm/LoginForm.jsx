
function LoginForm() {

  return (
    <div>
      <h2>Iniciar Sesion</h2>
         <form >
        <div>
        <label>Email: </label>
        <input 
            type="text"
       value={input.email}
          name="email"
          onChange={}    
                   />       
            <label>Contraseña</label>
            <input 
            type="text"
            value={input.password}
            name="contraseña"
            onChange={}
            />       
            </div>
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default LoginForm;
