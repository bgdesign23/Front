function FormRegistro () {

    return (
      <form>
        <label htmlFor="nombre">Nombre: </label>
        <input type="text"name="nombre"/>
       <hr/>
        <label htmlFor="apellido">Apellido: </label>
        <input type="text" name="apellido"/>
       <hr/>
        <label htmlFor="localidad">Localidad: </label>
        <input type="text" name="localidad"/>
       <hr/>
        <label htmlFor="localidad">Localidad: </label>
        <input type="text" name="localidad"/>
      </form>
      
      );
    }
    //    <form >
    //   <div>
    //     <label>Nombre Completo</label>
    //     <input 
    //     type="text"
    //     value={input.nombre}
    //     name="nombre"
    //     />
    //     <label>Apellido:</label>
    //     <input
    //     type="text"
    //     value={input.apellido}
    //     name="apellido"
    //       />
    //       <label>Nacionalidad:</label>
    //         <input
    //           type="text"
    //           value={input.nacionalidad}
    //           name="nacionalidad"
    //           />
    //            <label>Fecha de Nacimiento:</label>
    //                 <input
    //                     type="text"
    //                     value={input.nacimiento}
    //                     name="nacimiento"
    //                 />
    //          <label>Email: </label>
    //                <input 
    //               type="text"
    //                value={input.email}
    //               name="email"
    //            />       
    //     <label>Contraseña</label>
    //     <input 
    //     type="text"
    //     value={input.password}
    //     name="contraseña"
    //     />
    //   </div>
    //   <button type="submit"> Registrarme </button>
    // </form>
  
  export default FormRegistro;
  