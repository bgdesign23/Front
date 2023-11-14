import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Styles from "../UserAdminDashboard/userAdmin.module.css";
import {
  getAllUsers,
  getAdmin,
  getProductsAction,
  getCarts,
  getUserCoupons,
} from "../../Redux/actions";
import FormProduct from "../FormProduct/FormProduct";
import Users from "../UserAdminDashboard/Dashboard/Users/Users";
import Administrators from "./Dashboard/administradores/Administrators";
import AdminProducts from "./Dashboard/Products/AdminProducts";
import admin from "../../images/admin.png";
import CartComponent from "../AdminDashboard/CartsStats";
import TopProducts from "../AdminDashboard/TopProducts";
import CreateCouponForm from "../AdminDashboard/FormsAdmDash/CreateCouponForm";
// import CouponTableComponent from "../AdminDashboard/CouponsTable";

const UserAdmin = () => {
  const dispatch = useDispatch();
  const [visibleSection, setVisibleSection] = useState(null);

  const handleCreateProduct = () => {
    setVisibleSection("createProduct");
    dispatch(getProductsAction());
  };

  const handleCreateCupon = () => {
    setVisibleSection("createCoupon");
    dispatch(getUserCoupons());
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

          <button
            onClick={() => handleVisibleSection("metricas")}
            className={Styles.Btn}
          >
            Metrias de ventas
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
            <div className={Styles.cuponContainer}>
              {visibleSection === "createCoupon" && <CreateCouponForm />}
              {/* {visibleSection === "createCoupon" && (
                <CouponTableComponent
                  coupons={coupon}
                  onDeleteCoupon={handleDeleteCoupon}
                />
              )} */}
            </div>

            {/* <h6 className={Styles.tituloTodo}>Panel de Metricas </h6>
              {visibleSection === "metricas" && <CartComponent />}
              {visibleSection === "metricas" && <TopProducts />} */}
            {visibleSection === "metricas" && (
              <>
                <div className={Styles.Order}>
                  <h6 className={Styles.tituloTodo}>Control de Ventas</h6>
                  <CartComponent />
                  <TopProducts />
                </div>
              </>
            )}
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
