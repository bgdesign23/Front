import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  usersEliminated,
  productEliminated,
  editCoupon,
  adminsEliminated,
  couponEliminated,
  restoreCoupon,
} from "../../Redux/actions";
import UserTableComponent from "./UserTableComponent";
import TableComponent from "./tableComponent";
import CartComponent from "./CartsStats";
import AdminTableComponent from "./tableComponent";
import CouponTableComponent from "./CouponsTable";
import TopProducts from "./TopProducts";
import EliminatedUsersTable from "./Eliminados/EliminatedUsersTable";
import EliminatedProductsTable from "./Eliminados/tableeliminated";
import ComponentAdminTable from "./AdminTable";
import EliminatedCouponsTable from "./Eliminados/couponEliminated";
import AdminsEliminatedTable from "./Eliminados/adminEliminated";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const usuarios = useSelector((state) => state.users_copy);
  const admin = useSelector((state) => state.admin_copy);
  const coupon = useSelector((state) => state.userCoupons);
  const productsEliminated = useSelector((state) => state.productsEliminated);
  const userEliminated = useSelector((state) => state.usersEliminated);
  const admineliminated = useSelector((state) => state.adminsEliminated);
  const coupnseliminated = useSelector((state) => state.couponEliminated);

  const cart = useSelector((state) => state.carts);
  const navigate = useNavigate();

  const [cupones, setCupones] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [visibleCountProducts, setVisibleCountProducts] = useState(10);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState(false);
  const [visibleAdmins, setVisibleAdmins] = useState(false);
  const [visibleCoupons, setVisibleCoupons] = useState(false);

  useEffect(() => {
    dispatch(usersEliminated());
    dispatch(productEliminated());
    dispatch(adminsEliminated());
    dispatch(couponEliminated());
  }, [dispatch, updated]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(usersEliminated());
    });
  };
  const handleDeleteCoupon = (id) => {
    dispatch(deleteCoupon(id))
      .then(() => {
        // Operación después de eliminar el cupón
        dispatch(getUserCoupons());
        setUpdated(!updated);
      })
      .catch((error) => {
        // Manejar errores si es necesario
        console.error("Error deleting coupon:", error);
      });
  };

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

  const [prodRef, setProdRef] = useState({
    name: "",
    stock: "",
    price: "",
    type: "",
    material: "",
    description: "",
  });

  const [inputCoupon, setInputCoupon] = useState({
    newCode: "",
    status: "",
    discount: "",
    expiration: "",
    usagesAvailable: "",
  });

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

  const handleEditCoupon = (event, id, rowData) => {
    event.preventDefault();
    console.log("Coupon Id: ", id);
    console.log("rowData: ", rowData);
    try {
      const updatedData = {
        newCode: rowData.code,
        status: rowData.status,
        discount: rowData.discount,
        expiration: rowData.expiration,
        usagesAvailable: rowData.usagesAvailable,
      };
      console.log("Data: ", updatedData);
      dispatch(editCoupon(id, updatedData)).then(() => {
        dispatch(clearErrors());
        Swal.fire("Listo", "Has modificado un cupón exitosamente");
      });
      // Limpiar los campos después de la edición
      setInputCoupon({
        newCode: "",
        status: "",
        discount: "",
        expiration: "",
        usagesAvailable: "",
      });
    } catch (error) {
      console.error("Error al editar el cupón: ", error);
    }
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

  const handleDeletedAdmin = (id) => {
    dispatch(deleteAdmin(id)).then(() => {
      dispatch(adminsEliminated());
      setUpdated((prevUpdated) => !prevUpdated);
      console.log("Admin eliminado y estado actualizado:", admineliminated);
    });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)).then(async () => {
      await dispatch(productEliminated());
      setUpdated((prevUpdated) => !prevUpdated);
    });
  };

  const handlePostProduct = () => {
    navigate(`/home/nuevo/`);
  };

  const handlePostAdmin = () => {
    navigate(`/crear/admin`);
  };

  const handleCouponForm = () => {
    navigate("/crear-cupon");
  };

  const handleEditProduct = (event, productId, prodRef, rowData) => {
    event.preventDefault();
    console.log("Producto Id: ", productId);
    console.log("prod Ref: ", prodRef);
    console.log("rowData: ", rowData);
    try {
      const updatedData = {
        name: rowData.name,
        description: rowData.description,
        type: rowData.type,
        material: rowData.material,
        price: rowData.price,
        stock: rowData.stock,
      };
      console.log("Data: ", updatedData);
      dispatch(editProduct(productId, updatedData)).then(() => {
        dispatch(clearErrors());
        console.log("A ver si llega hasta aquí");
        Swal.fire("Listo", "Has modificado un producto exitosamente");
      });
      // Limpiar los campos después de la edición
      setProdRef({
        name: "",
        stock: "",
        price: "",
        type: "",
        material: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al editar el producto: ", error);
    }
  };

  const handleRestoreUser = (userId) => {
    dispatch(restoreUser(userId)).then(() => {
      dispatch(usersEliminated());
      dispatch(getAllUsers());
      setUpdated((prevUpdated) => !prevUpdated);
    });
  };

  const handleRestoreProduct = async (productId) => {
    try {
      await dispatch(restoreProduct(productId));
      await dispatch(productEliminated());
      await dispatch(getProductsAction());
      setUpdated((prevUpdated) => !prevUpdated);
    } catch (error) {
      console.error("Error al restaurar el producto:", error);
    }
  };

  const handleRestoreCoupon = (couponId) => {
    dispatch(restoreCoupon(couponId)).then(() => {
      dispatch(couponEliminated());
      dispatch(getUserCoupons());
      setUpdated((prevUpdated) => !prevUpdated);
    });
  };

  const handleRestoreAdmin = (adminId) => {
    dispatch(restoreAdmin(adminId)).then(() => {
      dispatch(adminsEliminated());
      // Aquí deberías actualizar la lista de administradores principal si es necesario
      // dispatch(getAdmin());
      setUpdated((prevUpdated) => !prevUpdated);
    });
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
        <button onClick={() => handlePostAdmin()}>Crear Administrador</button>
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
      {productsEliminated.length > 0 ? (
        <div>
          <h2 style={{ color: "pink" }}>Productos Eliminados</h2>

          {visibleProducts && (
            <EliminatedProductsTable
              isVisible={visibleProducts}
              productsEliminated={productsEliminated}
              handleRestoreProduct={handleRestoreProduct}
            />
          )}
        </div>
      ) : (
        <p>No hay productos eliminados.</p>
      )}
      <br />
      <UserTableComponent
        usuarios={usuarios}
        visibleUsers={visibleUsers}
        onDeleteUser={handleDeleteUser}
      />
      {userEliminated.length > 0 ? (
        <div>
          <h2>Usuarios Eliminados</h2>
          {visibleUsers && (
            <EliminatedUsersTable
              usersEliminated={userEliminated}
              handleRestoreUser={handleRestoreUser}
            />
          )}
        </div>
      ) : (
        <p>No hay Usuarios eliminados.</p>
      )}
      <br />
      <div>
        <br />
        {visibleCoupons && (
          <div>
            <CouponTableComponent
              coupons={coupon}
              onDeleteCoupon={handleDeleteCoupon}
              onEditCoupon={handleEditCoupon}
            />
          </div>
        )}
        {coupnseliminated.length > 0 ? (
          <div>
            <h2>Cupones Eliminados</h2>
            {visibleCoupons && (
              <EliminatedCouponsTable
                couponsEliminated={coupnseliminated}
                handleRestoreCoupon={handleRestoreCoupon}
              />
            )}
          </div>
        ) : (
          <p>No hay cupones eliminados.</p>
        )}
        {visibleAdmins && (
          <ComponentAdminTable
            admins={admin}
            onDeleteAdmin={handleDeletedAdmin}
            onRestoreAdmin={handleRestoreAdmin}
            onEditAdmin={handleEditAdmin}
          />
        )}
        {admineliminated.length > 0 ? (
          <div>
            <h2>Administradores Eliminados</h2>
            <AdminsEliminatedTable
              adminsEliminated={admineliminated}
              handleRestoreAdmin={handleRestoreAdmin}
            />
          </div>
        ) : (
          <p>No hay administradores eliminados.</p>
        )}
      </div>
      <div>
        <CartComponent chartData={handleGetCarts} />
      </div>
      <div>
        <TopProducts chartData={handleGetCarts} />
      </div>
    </div>
  );
};

export default AdminDashboard;
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
