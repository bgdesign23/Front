import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Styles from "../Users/users.module.css";
import UserTableComponent from "../../../AdminDashboard/UserTableComponent";
import { deleteUser } from "../../../../Redux/actions";

export default function Users() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users_copy);
  const [visibleUsers, setVisibleUsers] = useState(false);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };
  return (
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
    </div>
  );
}
