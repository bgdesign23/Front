import Menu from "../../userPerfil/Menu/Menu.jsx";
import Styles from "../../userPerfil/Cupon/CuponUser.module.css";

const CuponesPage = () => {
  const cupones = [
    {
      id: 1,
      titulo: "Descuento Bienvenida",
      descripcion: "20% de descuento en tu primera compra",
      codigo: "bgdesign",
    },
    {
      id: 2,
      titulo: "Descuento Black",
      descripcion: "15% de descuento en compras superiores a $10.000",
      codigo: "black",
    },
    {
      id: 3,
      titulo: "Descuento Permanencia",
      descripcion: "En tu 5ta compra tenes un descuento del 10%",
      codigo: "permanencia",
    },
  ];

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
                <li key={cupon.id}>
                  <div className={Styles.conteinDesc}>
                    <div className={Styles.descCont}>
                      <h4>{cupon.titulo}</h4>
                      <p>{cupon.descripcion}</p>
                    </div>
                    <h5 className={Styles.codigoDesc}>
                      Codigo: {cupon.codigo}
                    </h5>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className={Styles.basesCondiciones}>
            <h4>
              {" "}
              Bases y Condiones: Los descuentos se aplican por unica vez, no son
              acumulables entre si.{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuponesPage;
