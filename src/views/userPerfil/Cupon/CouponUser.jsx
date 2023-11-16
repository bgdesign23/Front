import React, { useState } from "react";
import Menu from "../../userPerfil/Menu/Menu.jsx";
import Styles from "../../userPerfil/Cupon/CuponUser.module.css";

const CuponesPage = () => {
  const [cuponesUtilizados, setCuponesUtilizados] = useState([]);

  const cupones = [
    {
      id: 2,
      titulo: "Descuento Black",
      descripcion: "En tu compra superior a $10.000 tienes un descuento del 15%",
      codigo: "black",
    },
    {
      id: 3,
      titulo: "Descuento Designblack",
      descripcion: "En tu compra superior a $45.000 tienes un descuento del 30%",
      codigo: "designblack",
      descuento: 0.3,
      montoMinimo: 45000,
    },
  ];

  const marcarCuponUtilizado = (codigo) => {
    // Lógica para marcar el cupón como utilizado
    setCuponesUtilizados([...cuponesUtilizados, codigo]);

    // Mostrar una alerta
    alert(`El cupón "${codigo}" ya no puede ser utilizado.`);
  };

  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <Menu />
      </div>
      <div className={Styles.boxRight}>
        <div className={Styles.containerCupon}>
          <h1>Cupones Disponibles</h1>
          {cupones.length === 0 ? (
            <p>No tienes cupones disponibles en este momento.</p>
          ) : (
            <ul>
              {cupones.map((cupon) => (
                <li key={cupon.id} className={cuponesUtilizados.includes(cupon.codigo) ? Styles.cuponUtilizado : ""}>
                  <div className={Styles.conteinDesc}>
                    <div className={Styles.descCont}>
                      <h4 className={cuponesUtilizados.includes(cupon.codigo) ? Styles.cuponUtilizadoText : ""}>
                        {cupon.titulo}
                      </h4>
                      <p className={cuponesUtilizados.includes(cupon.codigo) ? Styles.cuponUtilizadoText : ""}>
                        {cupon.descripcion}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.codigoDesc}>
                    <h5>Codigo: {cupon.codigo}</h5>
                    {!cuponesUtilizados.includes(cupon.codigo) && (
                      <button onClick={() => marcarCuponUtilizado(cupon.codigo)}>
                       
                       
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className={Styles.basesCondiciones}>
            <h4>
              Bases y Condiones: Los descuentos se aplican por única vez, no son
              acumulables entre sí.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuponesPage;
