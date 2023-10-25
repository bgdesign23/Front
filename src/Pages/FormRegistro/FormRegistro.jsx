import styles from '../FormRegistro/FormRegistro.module.css'


function FormRegistro () {

    return (
      <form className={styles.containerRegistro}>
        <label htmlFor="nombre">Nombre: </label>
        <input type="text"name="nombre"/>
       <hr/>
        <label htmlFor="apellido">Apellido: </label>
        <input type="text" name="apellido"/>
        <hr/>
        <label htmlFor="Email">Email: </label>
        <input type="text" name="Email"/>
       <hr/>
        <label htmlFor="CONTRASEÑA">Contraseña: </label>
        <input type="text" name="CONTRASEÑA"/>
        <hr/>
        <label htmlFor="confirmacion">Confirmar Contraseña: </label>
        <input type="text" name="confirmacion"/>
        <br />
        <br />
        <button type="submit"> Crear cuenta </button>
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
  