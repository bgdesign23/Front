import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Styles from "../UserAdminDashboard/userAdmin.module.css";
import {
  getAllUsers,
  getAdmin,
  getProductsAction,
  getCarts,
} from "../../Redux/actions";
import FormProduct from "../FormProduct/FormProduct";
import Users from "../UserAdminDashboard/Dashboard/Users/Users";
import Administrators from "./Dashboard/administradores/Administrators";
import AdminProducts from "./Dashboard/Products/AdminProducts";
import CreateCouponForm from "../AdminDashboard/FormsAdmDash/CreateCouponForm";
import admin from "../../images/admin.png";
import CartComponent from "../AdminDashboard/CartsStats";
import TopProducts from "../AdminDashboard/TopProducts";

const UserAdmin = () => {
  const dispatch = useDispatch();
  const [visibleSection, setVisibleSection] = useState(null);

  const handleCreateProduct = () => {
    setVisibleSection("createProduct");
    dispatch(getProductsAction());
  };

  const handleCreateCupon = () => {
    setVisibleSection("createCoupon");
  };

  const handleVisibleSection = (section) => {
    setVisibleSection(section);

    switch (section) {
      case "admins":
        dispatch(getAdmin());
        break;
      case "users":
        dispatch(getAllUsers());
        break;
      case "metricas":
        dispatch(getCarts()());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (visibleSection === "createProduct") {
    }
  }, [visibleSection]);

  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <div className={Styles.titulo}>
          <h1>Admin</h1>
        </div>
        <div className={Styles.botonera}>
          <button
            onClick={() => handleVisibleSection("admins")}
            className={Styles.Btn}
          >
            Administradores
          </button>
          <button
            onClick={() => handleVisibleSection("newAdmin")}
            className={Styles.Btn}
          >
            Crear nuevo Admin
          </button>
          <button
            onClick={() => handleVisibleSection("users")}
            className={Styles.Btn}
          >
            Usuarios
          </button>
          <button
            onClick={() => handleVisibleSection("products")}
            className={Styles.Btn}
          >
            Productos
          </button>
          <button onClick={handleCreateProduct} className={Styles.Btn}>
            Crear productos
          </button>
          <button onClick={handleCreateCupon} className={Styles.Btn}>
            Cupónes
          </button>
          {/* <button onClick={handleCreateCupon} className={Styles.Btn}>
            Crear cupón
          </button> */}
          <button
            onClick={() => handleVisibleSection("metricas")}
            className={Styles.Btn}
          >
            Control de ventas
          </button>
          <button
            onClick={() => handleVisibleSection("top")}
            className={Styles.Btn}
          >
            Productos TOP
          </button>
          <button className={Styles.Btn}>Cerrar sesión</button>
        </div>
      </div>
      <div className={Styles.boxRight}>
        {visibleSection !== null ? (
          <>
            {visibleSection === "createProduct" && <FormProduct />}
            {visibleSection === "users" && <Users />}
            {visibleSection === "admins" && <Administrators />}
            {visibleSection === "products" && <AdminProducts />}
            {visibleSection === "createCoupon" && <CreateCouponForm />}
            {visibleSection === "metricas" && <CartComponent />}
            {visibleSection === "top" && <TopProducts />}
          </>
        ) : (
          <div className={Styles.panelHome}>
            <h6>Bienvenido al panel de Administración</h6>
            <img src={admin} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAdmin;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import Styles from "../UserAdminDashboard/userAdmin.module.css";
// import { getAllUsers, getAdmin, getProductsAction } from "../../Redux/actions";
// import FormProduct from "../FormProduct/FormProduct";
// import Users from "../UserAdminDashboard/Dashboard/Users/Users";
// import Administrators from "./Dashboard/administradores/Administrators";
// import AdminProducts from "./Dashboard/Products/AdminProducts";

// const UserAdmin = () => {
//   const dispatch = useDispatch();
//   const [showForm, setShowForm] = useState(false);
//   const [visibleUsers, setVisibleUsers] = useState(false);
//   const [visibleAdmins, setVisibleAdmins] = useState(false);
//   const [visibleProducts, setVisibleProducts] = useState(false);

//   const handleCreateProduct = () => {
//     setShowForm(true);
//     setVisibleUsers(false);
//     setVisibleProducts(false);
//     setVisibleAdmins(false);
//   };

//   const handleVisibleUsers = (value) => {
//     setVisibleUsers(true);
//     setVisibleProducts(false);
//     setVisibleAdmins(false);
//     setShowForm(false);
//     if (!visibleUsers) {
//       dispatch(getAllUsers());
//     }
//   };

//   const handleVisibleAdmins = (value) => {
//     setVisibleAdmins(true);
//     setVisibleUsers(false);
//     setVisibleProducts(false);
//     setShowForm(false);
//     if (!visibleAdmins) {
//       dispatch(getAdmin());
//     }
//   };

//   const handleVisibleProducts = () => {
//     setVisibleProducts(true);
//     setVisibleUsers(false);
//     setVisibleAdmins(false);
//     setShowForm(false);
//     if (!visibleProducts) {
//       dispatch(getProductsAction());
//     }
//   };

//   return (
//     <div className={Styles.containerAll}>
//       <div className={Styles.boxLeft}>
//         <div className={Styles.titulo}>
//           <h1>Admin 01</h1>
//         </div>
//         <div className={Styles.botonera}>
//           <button onClick={handleVisibleAdmins} className={Styles.Btn}>
//             Administradores
//           </button>
//           <button onClick={handleVisibleUsers} className={Styles.Btn}>
//             Usuarios
//           </button>
//           <button onClick={handleVisibleProducts} className={Styles.Btn}>
//             Productos
//           </button>

//           <button onClick={handleCreateProduct} className={Styles.Btn}>
//             Crear productos
//           </button>
//           <button className={Styles.Btn}>Crear nuevo Admin</button>
//           <button className={Styles.Btn}>Crear cupón</button>
//           <button className={Styles.Btn}>Cerrar sesíon</button>
//         </div>
//       </div>
//       <div className={Styles.boxRight}>
//         {showForm && <FormProduct />}
//         {visibleUsers && <Users />}
//         {visibleAdmins && <Administrators />}
//         {visibleProducts && <AdminProducts />}
//       </div>
//     </div>
//   );
// };

// export default UserAdmin;

{
  /* <div className={Styles.boxRight}>
        <div className={Styles.panelHome}>
          <h6>Bienvenido al panel de Administración</h6>
          <img src={admin} alt="" />
        </div>
        {visibleSection === "createProduct" && <FormProduct />}
        {visibleSection === "users" && <Users />}
        {visibleSection === "admins" && <Administrators />}
        {visibleSection === "products" && <AdminProducts />}
      </div>
    </div>
  );
}; */
}
