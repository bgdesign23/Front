import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Styles from "../administradores/administrators.module.css";

export default function Administrators() {
  const admin = useSelector((state) => state.admin_copy);

  return (
    <div className={Styles.container}>
      {admin.map((ad) => (
        <div className={Styles.personas} key={ad.id}>
          <span>Nombre usuario: {ad.username}</span>
          <br />
          <span>Ubicación: {ad.location}</span>
          <br />
          <span>Telefono: {ad.phone}</span>
          <br />
          <span>Email: {ad.email}</span>
          <br />
        </div>
      ))}
    </div>
  );
}
