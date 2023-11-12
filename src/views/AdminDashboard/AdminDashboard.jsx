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
  editProduct,
  editUser,
  restoreProduct,
  deleteProduct,
  getAdmin,
  createAdmin,
  editAdmin,
  deleteAdmin,
  restoreAdmin,
  clearErrors,
  getCarts,
  getUser,
} from "../../Redux/actions";
import UserTableComponent from "./UserTableComponent";
import TableComponent from "./tableComponent";
import CartComponent from "./CartsStats";
import AdminTableComponent from "./AdminTable";
import CouponTableComponent from "./CouponsTable";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const usuarios = useSelector((state) => state.users_copy);
  const admin = useSelector((state) => state.admin_copy);
  const coupon = useSelector((state) => state.userCoupons);
  const cart = useSelector((state) => state.carts);
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

  const [inputUser, setInputuser] = useState({
    username: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    role: "",
  });

  const [prod, setProd] = useState({
    name: "",
    stock: "",
    price: "",
    type: "",
    material: "",
    description: "",
  });

  // const [couponNew, setCouponNew] = useState({
  //   status: "",
  //   expiration: "",
  //   discount: "",
  //   usagesAvailable: "",
  //   code: "",
  // });

  const handleGetCarts = () => {
    dispatch(getCarts());
  };

  const [errors, setErrors] = useState({});

  const handleCoupon = (value) => {
    if (cupones === value) {
      setCupones(false);
    } else {
      setCupones(value);
    }
    dispatch(getUserCoupons(value));
  };

  // const handleCreateCoupon = (event) => {
  //   event.preventDefault();
  //   dispatch(
  //     createCoupon({
  //       status: couponNew.status,
  //       expiration: couponNew.expiration,
  //       discount: couponNew.discount,
  //       usagesAvailable: couponNew.usagesAvailable,
  //       code: couponNew.code,
  //     })
  //   ).then((postError) => {
  //     if (!postError) {
  //       dispatch(clearErrors());
  //       Swal.fire("Listo", "Has creado un nuevo cupón");
  //       setCouponNew({
  //         ...couponNew,
  //         status: "",
  //         expiration: "",
  //         discount: "",
  //         usagesAvailable: "",
  //         code: "",
  //       });
  //     } else {
  //       dispatch(
  //         setErrors({ type: "CREATE_COUPON", error: postError?.response?.data })
  //       );
  //     }
  //   });
  // };

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

  const handleEditAdmin = (event, adminId) => {
    event.preventDefault();
    dispatch(
      editAdmin(adminId, {
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
        Swal.fire("Listo!", "has modificado un admin");
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
          setErrors({ type: "EDIT_ADMIN", error: postError?.response?.data })
        );
      }
    });
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

  const handleRestoreUser = (event, userId) => {
    event.preventDefault();
    dispatch(restoreUser(id)).then(() => {
      dispatch(getUser());
      dispatch(getUser(deleted));
    });
    setUpdated(!updateUser);
  };

  const handleEditUser = (event, userId) => {
    event.preventDefault();
    dispatch(
      editUser(userId, {
        username: inputUser.username,
        phone: inputUser.phone,
        location: inputUser.location,
        email: inputUser.email,
        password: inputUser.password,
        role: inputUser.role,
      })
    ).then((postError) => {
      if (!postError) {
        dispatch(clearErrors());
        Swal.fire("Listo!", "has modificado al Usuario");
        setInputAdmin({
          ...inputUser,
          username: "",
          phone: "",
          location: "",
          email: "",
          password: "",
          role: "",
        });
      } else {
        dispatch(
          setErrors({ type: "EDIT_ADMIN", error: postError?.response?.data })
        );
      }
    });
  };

  const handleRestoreAdmin = (event, id) => {
    event.preventDefault();
    dispatch(restoreAdmin(id)).then(() => {
      dispatch(getAdmin());
      dispatch(getAdmin(deleted));
    });
    setUpdated(!updated);
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

  const handleCouponForm = () => {
    navigate("/crear-cupon");
  };
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEditProduct = (event, productId) => {
    event.preventDefault();
    dispatch(
      editProduct(productId, {
        name: prod.name,
        stock: prod.stock,
        price: prod.price,
        type: prod.type,
        material: prod.material,
        description: prod.description,
      })
    ).then((postError) => {
      if (!postError) {
        dispatch(clearErrors());
        Swal.fire("Listo", "Has modificado un producto exitosamente");

        // Limpiar los campos después de la edición
        setProd({
          name: "",
          stock: "",
          price: "",
          type: "",
          material: "",
          description: "",
        });
      } else {
        dispatch(
          setErrors({ type: "EDIT_PRODUCTS", error: postError?.response?.data })
        );
      }
    });
  };

  const handleRestoreProduct = (event, id) => {
    event.preventDefault();
    dispatch(restoreProduct(id)).then(() => {
      dispatch(getProductsAction());
      dispatch(getProductsAction(deleted));
    });
    setUpdated(!updated);
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
        <button onClick={() => handleCouponForm()}>Crear cupón</button>
      </div>

      {visibleProducts && (
        <TableComponent
          productos={productos}
          visibleCountProducts={visibleCountProducts}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
          handleRestoreUser={handleRestoreUser}
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
        {visibleCoupons && (
          <div>
            <CouponTableComponent
              coupons={coupon}
              onDeleteCoupon={handleDeleteCoupon}
            />
          </div>
        )}

        <AdminTableComponent
          admins={admin}
          onDeleteAdmin={handleDeletedAdmin}
          onRestoreAdmin={handleRestoreAdmin}
          onEditAdmin={handleEditAdmin}
        />
      </div>
      <div>
        <CartComponent chartData={handleGetCarts} />
      </div>
    </div>
  );
};

export default AdminDashboard;
