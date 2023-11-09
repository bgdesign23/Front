import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Styles from "../Users/users.module.css";
export default function Users() {
  const usuarios = useSelector((state) => state.users_copy);
  const [visibleCountUsers, setVisibleCountUsers] = useState(10);

  const handleShowMoreUsers = () => {
    setVisibleCountUsers(visibleCountUsers + 10);
  };

  const handleShowLessUsers = () => {
    if (visibleCountUsers > 10) setVisibleCountUsers(visibleCountUsers - 10);
  };
  return (
    <div className={Styles.container}>
      {usuarios.slice(0, visibleCountUsers).map((user) => (
        <div className={Styles.personas} key={user.id}>
          <span>{user.username}</span> <br />
          <span>{user.location}</span> <br />
          <span>{user.phone}</span> <br />
          <span>{user.email}</span> <br />
          <button onClick={() => handleDeleteUser(user.id)}>
            Eliminar Usuario
          </button>
        </div>
      ))}
      <br />
      <button onClick={handleShowMoreUsers}>Mostrar más</button>
      <button onClick={handleShowLessUsers} disabled={visibleCountUsers <= 10}>
        Mostrar menos
      </button>
      <br />
    </div>
  );
}
