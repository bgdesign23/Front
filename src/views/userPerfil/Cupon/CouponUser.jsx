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
    <div >
    <Menu />
 
    <div className={Styles.center}>
      <h1>Tus Cupones Disponibles</h1>
      {cupones.length === 0 ? (
        <p>No tienes cupones disponibles en este momento.</p>
      ) : (
        <ul>
          {cupones.map((cupon) => (
            <li key={cupon.id}>
              <h3>{cupon.titulo}</h3>
              <p>{cupon.descripcion}</p>
              <p>Codigo: {cupon.codigo}</p>


            </li>
          ))}
        </ul>
      )}
                    <h4> Bases y Condiones: Los descuentos se aplican por unica vez, no son acumulables entre si. </h4>

    </div>
    </div>
  );
};

export default CuponesPage;
