import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAdmin, clearErrors } from "../../../Redux/actions";
import Swal from "sweetalert2";

const CreateAdmin = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [inputAdmin, setInputAdmin] = useState({
        username: "",
        phone: "",
        location: "",
        email: "",
        password: "",
        role: "",
      });

    //   const isFormValid = () => {
    //     const numberAndSigns = /^[\d.,/]+$/;
    //     return (
    //       numberAndSigns.test(inputAdmin.phone) 
    //     );
    //   };  

      const handleCreateAdmin = async (event) => {
        event.preventDefault();

        // if (!isFormValid()) {
        //     console.error("Completa los campos correspondientes al celular");
        //     return;
        //   }
        try {
            const response = await dispatch(createAdmin(inputAdmin));
            if (response && response.error) {
                dispatch(
                    setErrors({
                        type: "CREATE_ADMIN",
                        error: response.error.response.data,
                    })
                );
            } else {
             dispatch(clearErrors());
             Swal.fire("Listo!", "Has creado un nuevo administrador!", "success");
             setInputAdmin({
              ...inputAdmin,
              username: "",
              phone: "",
              location: "",
              email: "",
              password: "",
              role: "",
            });
          }
        } catch (error) {
            console.error("Error al crear el administrador:", error);
        }  
      };
      return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          <form onSubmit={handleCreateAdmin}>
            <div>
              <label>
                Username:
                <input 
                  type="text"
                  placeholder="Example: name"
                  value={inputAdmin.username}
                  onChange={(e) => setInputAdmin({ ...inputAdmin, username: e.target.value })}
                />
              </label>
            </div>
      
            <div>
              <label> 
                Phone:
                <input 
                  type="text"
                  placeholder="Example: +54 5555- 555"
                  value={inputAdmin.phone}
                  onChange={(e) => setInputAdmin({ ...inputAdmin, phone: e.target.value })}
                />
              </label>
            </div>
      
            <div> 
              <label>
                Location:
                <input 
                  type="text"
                  placeholder="Example: Argentina"
                  value={inputAdmin.location}
                  onChange={(e) => setInputAdmin({ ...inputAdmin, location: e.target.value })}
                />
              </label>
            </div>
      
            <div> 
              <label>
                Email:
                <input 
                  type="text"
                  placeholder="Example: bg12@gmail.com"
                  value={inputAdmin.email}
                  onChange={(e) => setInputAdmin({ ...inputAdmin, email: e.target.value })}
                />
              </label>
            </div>
      
            <div> 
              <label>
                Password:
                <input 
                  type="password"
                  placeholder="Example: asd123"
                  value={inputAdmin.password}
                  onChange={(e) => setInputAdmin({ ...inputAdmin, password: e.target.value })}
                />
              </label>
            </div>
      
            <div>
              <label>
                Role:
                <input 
                  type="text"
                  placeholder="Example: 1 o 2"
                  value={inputAdmin.role}
                  onChange={(e) => setInputAdmin({ ...inputAdmin, role: e.target.value })}
                />
              </label>
            </div>
      
            <button type="submit">
              Create Admin
            </button>
          </form>  
        </div>
      );
}

export default CreateAdmin;