import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import {
  getProductsAction,
  getAllUsers,
  deleteUser,
  restoreUser,
  updateUser,
  getUserCoupons,
  createCoupon,
  deleteCoupon,
  postProduct,
  editProduct,
  restoreProduct,
  deleteProduct,
  getAdmin,
  createAdmin,
  editAdmin,
  deleteAdmin,
  restoreAdmin,
  clearErrors,
} from "../../Redux/actions";
import UserTableComponent from "./UserTableComponent";
import TableComponent from "./tableComponent";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const usuarios = useSelector((state) => state.users_copy);
  const admin = useSelector((state) => state.admin_copy);
  const coupon = useSelector((state) => state.userCoupons);
  const navigate = useNavigate();

  const [adminView, setAdminView] = useState(false);
  const [cupones, setCupones] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [visibleCountProducts, setVisibleCountProducts] = useState(10);
  // const [visibleCountUsers, setVisibleCountUsers] = useState(10);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState(false);
  const [visibleAdmins, setVisibleAdmins] = useState(false);
  const [visibleCoupons, setVisibleCoupons] = useState(false);

  // const handleShowMoreProducts = () => {
  //   setVisibleCountProducts(visibleCountProducts + 10);
  // };

  // const handleShowLessProducts = () => {
  //   if (visibleCountProducts > 10)
  //     setVisibleCountProducts(visibleCountProducts - 10);
  // };

  // const handleShowMoreUsers = () => {
  //   setVisibleCountUsers(visibleCountUsers + 10);
  // };

  // const handleShowLessUsers = () => {
  //   if (visibleCountUsers > 10) setVisibleCountUsers(visibleCountUsers - 10);
  // };

  const handleVisibleProducts = () => {
    setVisibleProducts((prevVisible) => !prevVisible);
    if (!visibleProducts) {
      dispatch(getProductsAction());
    }
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

  const handleVisibleCoupons = (value) => {
    setVisibleCoupons((prevVisible) => !prevVisible);
    if (!visibleCoupons) {
      dispatch(getUserCoupons());
    }
  };

  const [inputAdmin, setInputAdmin] = useState({
    username: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    role: "",
  });

  const [couponNew, setCouponNew] = useState({
    status: "",
    expiration: "",
    discount: "",
    usagesAvailable: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const handleCoupon = (value) => {
    if (cupones === value) {
      setCupones(false);
    } else {
      setCupones(value);
    }
    dispatch(getUserCoupons(value));
  };

  const handleCreateCoupon = (event) => {
    event.preventDefault();
    dispatch(
      createCoupon({
        status: couponNew.status,
        expiration: couponNew.expiration,
        discount: couponNew.discount,
        usagesAvailable: couponNew.usagesAvailable,
        code: couponNew.code,
      })
    ).then((postError) => {
      if (!postError) {
        dispatch(clearErrors());
        Swal.fire("Listo", "Has creado un nuevo cupón");
        setCouponNew({
          ...couponNew,
          status: "",
          expiration: "",
          discount: "",
          usagesAvailable: "",
          code: "",
        });
      } else {
        dispatch(
          setErrors({ type: "CREATE_COUPON", error: postError?.response?.data })
        );
      }
    });
  };

  const handleDeleteCoupon = (event, id) => {
    event.preventDefault();
    dispatch(deleteCoupon(id)).then(() => {
      dispatch(getUserCoupons());
      dispatch(getUserCoupons(deleted));
    });
    setUpdated(!updated);
  };

  const handleAdminView = (value) => {
    if (adminView === value) {
      setAdminView(false);
    } else {
      setAdminView(value);
    }
    dispatch(getAdmin(value));
  };

  const handleCreateAdmin = (event) => {
    event.preventDefault();
    dispatch(
      createAdmin({
        username: inputAdmin.username,
        phone: inputAdmin.phone,
        location: inputAdmin.location,
        email: inputAdmin.email,
        password: inputAdmin.password,
        role: inputAdmin.role,
      })
    ).then((postError) => {
      if (!postError) {
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
      } else {
        dispatch(
          setErrors({ type: "CREATE_ADMIN", error: postError?.response?.data })
        );
      }
    });
  };

  const handleDeletedAdmin = (event, id) => {
    event.preventDefault();
    dispatch(deleteAdmin(id)).then(() => {
      dispatch(getAdmin());
      dispatch(getAdmin(deleted));
    });
    setUpdated(!updated);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handlePostProduct = () => {
    navigate(`/home/nuevo/`);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
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
      <h1> Panel del Administrador </h1>
      <br />
      <br />
      <div>
        <button onClick={() => handleVisibleProducts()}>Productos</button>
        <button onClick={() => handleVisibleUsers()}>Usuarios</button>
        <button onClick={() => handleVisibleAdmins()}>Administradores</button>
        <button onClick={() => handleVisibleCoupons()}>Cupones</button>
        <button onClick={() => handlePostProduct()}>Crear Mueble</button>
        <button>Crear Usuario</button>
        <button>Crear cupón</button>
      </div>

      {visibleProducts && (
        <TableComponent
          productos={productos}
          visibleCountProducts={visibleCountProducts}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}

      {/* Incluye UserTableComponent pasando datos y propiedades necesarias */}
      <UserTableComponent
        usuarios={usuarios}
        visibleUsers={visibleUsers}
        onDeleteUser={handleDeleteUser}
      />
      <br />
      <div>
        <br />
        <div>
          {visibleCoupons &&
            coupon.map((coup) => (
              <div key={coup.id}>
                <span>{coup.code}</span>
                <span>{coup.status}</span>
                <span>%{coup.discount}</span>
                <span>{coup.expiration}</span>
                <span>{coup.usagesAvailable}</span>
                <button onClick={() => handleDeleteCoupon(coup.id)}>
                  Eliminar Cupón
                </button>
              </div>
            ))}
        </div>
        <div>
          {visibleAdmins &&
            admin.map((ad) => (
              <div key={ad.id}>
                <span>{ad.username}</span>
                <span>{ad.location}</span>
                <span>{ad.phone}</span>
                <span>{ad.email}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
