function FormRegistro () {

    return (
      <div>
        <h2>Registrarse</h2>
           <form >
          <div>
            <label>Nombre Completo</label>
            <input 
            type="text"
            value={input.nombre}
            name="nombre"
            onChange={()} 
            />
            <label>Apellido:</label>
            <input
            type="text"
            value={input.apellido}
            name="apellido"
            onChange={}
              />
              <label>Nacionalidad:</label>
                <input
                  type="text"
                  value={input.nacionalidad}
                  name="nacionalidad"
                  onChange={}
                  />
                   <label>Fecha de Nacimiento:</label>
                        <input
                            type="text"
                            value={input.nacimiento}
                            name="nacimiento"
                            onChange={}
                        />
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
          <button type="submit"> Registrarme </button>
        </form>
      </div>
    );
  }
  
  export default FormRegistro;
  