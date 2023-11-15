import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Styles from "../administradores/administrators.module.css";
import ComponentAdminTable from "../.../../../../AdminDashboard/AdminTable";
import AdminsEliminatedTable from "../../../AdminDashboard/Eliminados/adminEliminated";
import CreateAdmin from "../../../AdminDashboard/FormsAdmDash/CreateAdmin";
import {
  // createAdmin,
  editAdmin,
  deleteAdmin,
  restoreAdmin,
  adminsEliminated,
  clearErrors,
} from "../../../../Redux/actions";

export default function Administrators() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin_copy);
  const admineliminated = useSelector((state) => state.adminsEliminated);
  const [updated, setUpdated] = useState(false);
  const [visibleAdmins, setVisibleAdmins] = useState(false);
  const [errors, setErrors] = useState({});

  const [inputAdmin, setInputAdmin] = useState({
    username: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    role: "",
  });

  const handleDeletedAdmin = (id) => {
    dispatch(deleteAdmin(id)).then(() => {
      dispatch(adminsEliminated());
      setUpdated(!updated);
      console.log("Admin eliminado y estado actualizado:", admineliminated);
    });
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

  const handleRestoreAdmin = (adminId) => {
    dispatch(restoreAdmin(adminId)).then(() => {
      dispatch(adminsEliminated());
      // dispatch(getAdmin());
      setUpdated(!updated);
    });
  };
  useEffect(() => {
    dispatch(adminsEliminated());
  }, [dispatch, updated]);

  return (
    <div className={Styles.containerAbuelo}>
      <div className={Styles.containerPadre}>
        <div className={Styles.containerHijo1}>
          {admin.length >= 1 ? (
            <>
              <h6>restaurar administrador</h6>
              <div className={Styles.containerTable1}>
                <ComponentAdminTable
                  admins={admin}
                  visibleAdmins={visibleAdmins}
                  onDeleteAdmin={handleDeletedAdmin}
                  onRestoreAdmin={handleRestoreAdmin}
                  onEditAdmin={handleEditAdmin}
                />
              </div>
            </>
          ) : (
            <h6>No hay administradores</h6>
          )}
        </div>

        <div className={Styles.containerHijo2}>
          {admineliminated.length > 0 ? (
            <>
              <h6>restaurar administrador</h6>
              <div className={Styles.containerTable}>
                <AdminsEliminatedTable
                  adminsEliminated={admineliminated}
                  handleRestoreAdmin={handleRestoreAdmin}
                />
              </div>
            </>
          ) : (
            <h6>No hay administradores eliminados</h6>
          )}
        </div>
      </div>
      <div>
        <CreateAdmin />
      </div>
    </div>
  );
}
