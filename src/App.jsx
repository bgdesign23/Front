import styles from "./App.module.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import Product from "./views/Product/Product";
import Decoracion from "./views/Decoration/Decoration";
// import FormDecoracion from "./views/FormDecoracion/FormDecoracion";
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
import UserPerfil from "./views/userPerfil/userPerfil.jsx";
import ComprasUser from "./views/userPerfil/ComprasUser/ComprasUser";
import CouponUser from "./views/userPerfil/Cupon/CouponUser.jsx";
import Success from "./views/MercadoPago/Success";
import AdminDashboard from "../src/views/AdminDashboard/AdminDashboard.jsx";
import RequestPasswordReset from "./views/Password/RequestPasswordReset";
import PasswordReset from "./views/Password/PasswordReset";
import UserAdmin from "../src/views/UserAdminDashboard/UserAdmin.jsx";
import CreateCouponForm from "./views/AdminDashboard/FormsAdmDash/CreateCouponForm.jsx";
import NotFound404 from "./views/NotFound404/NotFound404.jsx";
import CreateAdmin from "./views/AdminDashboard/FormsAdmDash/CreateAdmin.jsx";

function App() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const location = useLocation();
  const user = useSelector((state) => state.user);

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
        <div className={styles.navBar}>
          {location.pathname !== "/home/success" && <NavBar />}
        </div>

        <div className={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/decoracion" element={<Decoracion />} />
            {/* <Route path="/form/decoracion" element={<FormDecoracion />} /> */}
            <Route
              path="/home/product"
              element={<Product productos={productos} />}
            />
            <Route path="/form/login" element={<LoginForm />} />
            <Route path="/form/register" element={<FormRegistro />} />
            <Route path="/form/perfil" element={<UserPerfil />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cupones" element={<CouponUser />} />
            <Route path="/perfil/compras" element={<ComprasUser />} />
            <Route path="/cartShop" element={<CartShop />} />
            <Route path="/home/success" element={<Success />} />
            <Route
              path={"/form/login/request-password-reset"}
              element={<RequestPasswordReset />}
            />
            <Route
              path={"/form/login/password-reset"}
              element={<PasswordReset />}
            />
            {user && user.user.role === 1 && <Route path="/admin" element={<AdminDashboard />} />}
            {user && user.user.role === 1 && <Route path="/userAdmin" element={<UserAdmin />} />}
            {user && user.user.role === 1 && <Route path="/home/nuevo" element={<FormProduct />} />}
            {user && user.user.role === 1 && <Route path="/crear-cupon" element={<CreateCouponForm />} />}
            {user && user.user.role === 1 && <Route path="/crear/admin" element={<CreateAdmin />} />}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      </>
    </div>
  );
}

export default App;
