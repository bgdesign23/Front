import styles from "./App.module.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import Product from "./views/Product/Product";
import Decoracion from "./views/Decoration/Decoration";
import FormDecoracion from "./views/FormDecoracion/FormDecoracion";
import LoginForm from "./views/LoginForm/LoginForm";
import FormRegistro from "./views/FormRegistro/FormRegistro";
import NavBar from "./Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getProductsAction,
  getUser,
} from "../src/Redux/actions";
import Detail from "./views/Detail/Detail";
import FormProduct from "./views/FormProduct/FormProduct";
import CartShop from "./Components/CartShop/CartShop";
import PerfilUser from "./views/PerfilUser/PerfilUser";
import CouponUser from "../src/views/PerfilUser/CouponUser";
import Success from "./views/MercadoPago/Success";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import RequestPasswordReset from "./views/Password/RequestPasswordReset";
import PasswordReset from "./views/Password/PasswordReset";
import { useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import ButtonSide from "./Components/SideBar/ButtonSide/ButtonSide";

function App() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    !user && localStorage.getItem("token") && dispatch(getUser());
    dispatch(getProductsAction());
    dispatch(getCategories());
  }, [dispatch, user]);

  return (
    <div className={styles.App}>
      <>
        {/* <div className={styles.sideBar}>
          <button className={styles.toggleButton} onClick={toggleSideBar}>
            <ButtonSide />
          </button>
          <SideBar isOpen={isOpenSideBar} toggleSideBar={toggleSideBar} />
        </div> */}

        <div className={styles.navBar}>
          {location.pathname !== "/home/success" && <NavBar />}
        </div>

        <div className={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/decoracion" element={<Decoracion />} />
            <Route path="/form/decoracion" element={<FormDecoracion />} />
            <Route
              path="/home/product"
              ñ
              element={<Product productos={productos} />}
            />
            <Route path="/home/nuevo" element={<FormProduct />} />
            <Route path="/form/login" element={<LoginForm />} />
            <Route path="/form/register" element={<FormRegistro />} />
            <Route path="/form/perfil" element={<PerfilUser />} />
            <Route path="/cupones" element={<CouponUser />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {(user || localStorage.getItem("token")) && (
              <Route path="/cartShop" element={<CartShop />} />
            )}
            <Route path="/home/success" element={<Success />} />
            <Route
              path={"/form/login/request-password-reset"}
              element={<RequestPasswordReset />}
            />
            <Route
              path={"/form/login/password-reset"}
              element={<PasswordReset />}
            />
          </Routes>
        </div>
      </>
    </div>
  );
}

export default App;
