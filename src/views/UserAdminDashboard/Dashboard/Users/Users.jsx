import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Styles from "../Users/users.module.css";
import UserTableComponent from "../../../AdminDashboard/UserTableComponent";
import EliminatedUsersTable from "../../../AdminDashboard/Eliminados/EliminatedUsersTable";
import {
  deleteUser,
  usersEliminated,
  getAllUsers,
  restoreUser,
} from "../../../../Redux/actions";

export default function Users() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users_copy);
  const [visibleUsers, setVisibleUsers] = useState(false);
  const userEliminated = useSelector((state) => state.usersEliminated);
  const [updated, setUpdated] = useState(false);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(usersEliminated());
    });
  };

  const handleRestoreUser = (userId) => {
    dispatch(restoreUser(userId)).then(() => {
      dispatch(usersEliminated());
      dispatch(getAllUsers());
      setUpdated(!updated);
    });
  };

  useEffect(() => {
    dispatch(usersEliminated());
  }, [dispatch, updated]);

  return (
    <div className={Styles.containerAbuelo}>
      <div className={Styles.containerPadre}>
        <div className={Styles.containerHijo}>
          <h6>Administrar usuarios</h6>
          <div className={Styles.containerTable}>
            <UserTableComponent
              usuarios={usuarios}
              visibleUsers={visibleUsers}
              onDeleteUser={handleDeleteUser}
            />
          </div>
        </div>
        <div className={Styles.containerHijo2}>
          {userEliminated.length > 0 ? (
            <>
              <h6>Restablecer usuario eliminado</h6>
              <div className={Styles.containerTable2}>
                <EliminatedUsersTable
                  usersEliminated={userEliminated}
                  handleRestoreUser={handleRestoreUser}
                />
              </div>
            </>
          ) : (
            <h6>No hay Usuarios eliminados.</h6>
          )}
        </div>
      </div>
    </div>
  );
}
