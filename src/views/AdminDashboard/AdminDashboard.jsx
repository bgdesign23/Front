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
  deleteProduct,
  getAdmin,
  createAdmin,
  deleteAdmin,
  clearErrors,
} from "../../Redux/actions";

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
  const [visibleCountUsers, setVisibleCountUsers] = useState(10);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState(false);
  const [visibleAdmins, setVisibleAdmins] = useState(false);
  const [visibleCoupons, setVisibleCoupons] = useState(false);
  const [hot, setHot] = useState(null);

  const handleShowMoreProducts = () => {
    setVisibleCountProducts(visibleCountProducts + 10);
  };

  const handleShowLessProducts = () => {
    if (visibleCountProducts > 10)
      setVisibleCountProducts(visibleCountProducts - 10);
  };

  const handleShowMoreUsers = () => {
    setVisibleCountUsers(visibleCountUsers + 10);
  };

  const handleShowLessUsers = () => {
    if (visibleCountUsers > 10) setVisibleCountUsers(visibleCountUsers - 10);
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

  useEffect(() => {
    if (visibleProducts) {
      // Primero, restablece la instancia existente si existe
      if (hot) {
        hot.destroy();
        setHot(null);
      }

      const container = document.getElementById("handsontable-container");
      const newHot = new Handsontable(container, {
        data: productos, // Utiliza tus datos de productos aquí
        columns: [
          { data: "name", title: "Name" },
          { data: "stock", title: "Stock" },
          { data: "amount", title: "Amount" },
          { data: "price", title: "Price" },
          { data: "type", title: "Type" },
          { data: "material", title: "Material" },
          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row, col, prop, value, cellProperties) => {
              // Crea un botón "Delete" en la celda
              const button = document.createElement("button");
              button.innerText = "Delete";
              button.addEventListener("click", () => {
                // Llama a la función handleDeleteProduct al hacer clic en el botón
                handleDeleteProduct(productos[row].id);
              });

              // Limpia el contenido de la TD antes de agregar el botón
              while (td.firstChild) {
                td.removeChild(td.firstChild);
              }

              // Agrega el botón a la celda
              td.appendChild(button);
            },
          },
        ],
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      });

      // Agrega un manejador de eventos personalizado para el botón "Delete"
      newHot.addHook("afterOnCellMouseDown", (event, coords, TD) => {
        if (TD.classList.contains("htButton")) {
          // Si se hizo clic en un botón, evita que se seleccione la fila
          event.stopImmediatePropagation();
        }
      });

      setHot(newHot);
    }

    // Añade un return para destruir la instancia de Handsontable cuando sea necesario
  }, [visibleProducts, productos]);

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
        <div id="handsontable-container">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Material</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productos.slice(0, visibleCountProducts).map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.amount}</td>
                    <td>${prod.price}</td>
                    <td>{prod.type}</td>
                    <td>{prod.material}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <br />
      <div>
        {visibleUsers && (
          <div>
            {usuarios.slice(0, visibleCountUsers).map((user) => (
              <div key={user.id}>
                <span>{user.username}</span>
                <span>{user.location}</span>
                <span>{user.phone}</span>
                <span>{user.email}</span>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Eliminar Usuario
                </button>
              </div>
            ))}
            <br />
            <button onClick={handleShowMoreUsers}>Mostrar más</button>
            <button
              onClick={handleShowLessUsers}
              disabled={visibleCountUsers <= 10}
            >
              Mostrar menos
            </button>
            <br />
          </div>
        )}
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
