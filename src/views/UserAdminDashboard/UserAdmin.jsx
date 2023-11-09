import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Styles from "../UserAdminDashboard/userAdmin.module.css";
import { getAllUsers, getAdmin, getProductsAction } from "../../Redux/actions";
import FormProduct from "../FormProduct/FormProduct";
import Users from "../UserAdminDashboard/Dashboard/Users/Users";
import Administrators from "./Dashboard/administradores/Administrators";
import AdminProducts from "./Dashboard/Products/AdminProducts";

const UserAdmin = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState(false);
  const [visibleAdmins, setVisibleAdmins] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(false);

  const handleCreateProduct = () => {
    setShowForm(!showForm);
  };

  const handleVisibleUsers = (value) => {
    setVisibleUsers((prevVisible) => !prevVisible);
    if (!visibleUsers) {
      dispatch(getAllUsers());
    }
  };

  const handleVisibleAdmins = (value) => {
    setVisibleAdmins((prevVisible) => !prevVisible);
    if (!visibleAdmins) {
      dispatch(getAdmin());
    }
  };

  const handleVisibleProducts = () => {
    setVisibleProducts((prevVisible) => !prevVisible);
    if (!visibleProducts) {
      dispatch(getProductsAction());
    }
  };

  useEffect(() => {
    if (showForm) {
      // Puedes realizar otras acciones aquí si es necesario cuando el formulario se muestra.
    }
  }, [showForm]);

  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <div className={Styles.titulo}>
          <h1>Administrador</h1>
        </div>
        <div className={Styles.botonera}>
          <button onClick={handleVisibleAdmins} className={Styles.Btn}>
            Administradores
          </button>
          <button onClick={handleVisibleUsers} className={Styles.Btn}>
            Usuarios
          </button>
          <button onClick={handleVisibleProducts} className={Styles.Btn}>
            Productos
          </button>

          <button onClick={handleCreateProduct} className={Styles.Btn}>
            Crear productos
          </button>
          <button className={Styles.Btn}>Crear usuario</button>
          <button className={Styles.Btn}>Crear cupón</button>
          <h2>Cerrar sesíon</h2>
        </div>
      </div>
      <div className={Styles.boxRight}>
        {showForm && <FormProduct />}
        {visibleUsers && <Users />}
        {visibleAdmins && <Administrators />}
        {visibleProducts && <AdminProducts />}
      </div>
    </div>
  );
};

export default UserAdmin;

{
  /* <button className={Styles.backBtn}>Cerrar sesíon</button>


<h2 className={Styles.Btn}>Administradores</h2>
<h2 className={Styles.Btn}>Usuarios</h2>
<h2 className={Styles.Btn}>Productos</h2>
<h2 className={Styles.Btn}>Crear productos</h2>
<h2 className={Styles.Btn}>Crear usuario</h2>
<h2 className={Styles.Btn}>Crear cupón</h2> */
}
