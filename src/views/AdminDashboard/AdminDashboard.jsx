import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import {getProductsAction,
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
        clearErrors        
        } from "../../Redux/actions"
import Swal from "sweetalert2"

const AdminDashboard = () => {

    const dispatch = useDispatch()
    const productos = useSelector((state) => state.products_Copy);
    const usuarios = useSelector((state) => state.users_copy);
    const admin = useSelector((state) => state.admin_copy);
    const coupon = useSelector((state) => state.userCoupons);

    console.log("productos: ", productos);

    const [adminView, setAdminView] = useState(false);
    const [cupones, setCupones] = useState(false);
    const [updated, setUpdated] = useState(false);

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
    
    useEffect(() => {
       dispatch(getProductsAction());
       dispatch(getAllUsers());
       dispatch(getAdmin());
       dispatch(getUserCoupons());
    }, [])

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
                Swal.fire(
                    'Listo',
                    'Has creado un nuevo cupón'
                )
                setCouponNew({...couponNew,
                    status: "",
                    expiration: "",
                    discount: "",
                    usagesAvailable: "",
                    code: "",
                })
            } else {
                dispatch(
                    setNewErrors({ type: "CREATE_COUPON", error: postError?.response?.data } ) 
                )
            };
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
            Swal.fire(
              'Listo!',
              'Has creado un nuevo administrador!',
              'success'
            )
            setInputAdmin({...inputAdmin, 
            username: "",
            phone: "",
            location: "",
            email: "",
            password: "",
            role: "",
        })
          } else {
            dispatch(
              setNewErrors({ type: "CREATE_ADMIN", error: postError?.response?.data })
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

    return (
        <div>
            <h1> Lista de usuarios registrados </h1>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>{prod.name}</li>
                ))}
            </ul>
            <br />
            <br />
            <ul>
                {usuarios.map((user) => (
                    <li key={user.id}>{user.username}</li>  

                ))}
            </ul>
        </div>
    )

}

export default AdminDashboard