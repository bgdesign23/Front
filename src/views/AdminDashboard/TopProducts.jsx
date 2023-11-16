import { getCarts } from "../../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../AdminDashboard/topProducts.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getDateRange = (startDate, endDate) => {
  const dateRange = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange.map((date) => {
    return new Date(
      date.toLocaleDateString("en-US", { timeZone: "America/Bogota" })
    );
  });
};

const TopProducts = () => {
  const carts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date("2023-11-12"));
  const [endDate, setEndDate] = useState(new Date("2023-11-19"));

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  useEffect(() => {
    if (endDate < startDate) {
      setStartDate(new Date(endDate));
    }
  }, [startDate, endDate]);

  const successCartsInRange = carts.filter(
    (cart) =>
      cart.status === "success" &&
      new Date(cart.createdAt) >= startDate &&
      new Date(cart.createdAt) <= endDate
  );

  //console.log("Success Carts in Range: ", successCartsInRange);

  //Crear un objeto para almacenar las compras por días:
  const ventasPorProducto = {};

  successCartsInRange.forEach((cart) => {
    cart.products.forEach((item) => {
      const productos = JSON.parse(item);
      productos.forEach((producto) => {
        const productName = producto.name;
        ventasPorProducto[productName] =
          (ventasPorProducto[productName] || 0) + producto.amount;
      });
    });
  });

// const productosMasVendidos = Object.entries(ventasPorProducto)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 10);

//   // Construir los datos para el gráfico a partir de los productos más vendidos
//   const labels = productosMasVendidos.map(([productName]) => productName);
//   const datos = productosMasVendidos.map(([_, cantidad]) => cantidad);


  const labels = Object.keys(ventasPorProducto);
  const datos = Object.values(ventasPorProducto);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Compras por producto",
        data: datos,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleStartDate = (e) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDate = (e) => {
    setEndDate(new Date(e.target.value));
  };
  return (
    <>
      <div className={style.containerPadre}>
        <div className={style.containerAlineador}>
          <div className={style.containerHijo}>
            <h6>Top 10 productos más vendidos</h6>
            <div className={style.inputPadreBox}>
              <div className={style.inputBox}>
                <label> Fecha de Inicio: </label>
                <input
                  type="date"
                  value={startDate.toISOString().split("T")[0]}
                  onChange={handleStartDate}
                />
              </div>
              <div className={style.inputBox}>
                <label> Fecha de fin: </label>
                <input
                  type="date"
                  value={endDate.toISOString().split("T")[0]}
                  onChange={handleEndDate}
                />
              </div>
            </div>
            <div className={style.grafico}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopProducts;
