import { getCarts } from "../../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../AdminDashboard/cartsStats.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const CartComponent = () => {
  const carts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date("2023-11-06"));
  const [endDate, setEndDate] = useState(new Date("2023-11-12"));

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

  const productosCompradosDiarios = {};

  successCartsInRange.forEach((cart) => {
    const fechaCompra = new Date(cart.createdAt);
    const fechaFormateada = fechaCompra.toISOString().split("T")[0];

    cart.products.forEach((item) => {
      const productos = JSON.parse(item);
      productos.forEach((producto) => {
        const productName = producto.name;
        productosCompradosDiarios[fechaFormateada] =
          productosCompradosDiarios[fechaFormateada] || {};
        productosCompradosDiarios[fechaFormateada][productName] =
          (productosCompradosDiarios[fechaFormateada][productName] || 0) +
          producto.amount;
      });
    });
  });

  const dateRange = getDateRange(startDate, endDate);
  console.log("date Range: ", dateRange);

  dateRange.forEach((date) => {
    const fechaFormateada = date.toISOString().split("T")[0];
    productosCompradosDiarios[fechaFormateada] =
      productosCompradosDiarios[fechaFormateada] || {};
  });

  const labels = Object.keys(productosCompradosDiarios).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const datos = labels.map((fecha) => {
    const productosPorDia = productosCompradosDiarios[fecha];
    const totalProductos = Object.values(productosPorDia).reduce(
      (acc, cantidad) => acc + cantidad,
      0
    );
    return totalProductos;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Compras por día",
        data: datos,
        fill: false,
        tension: 0.1,
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
    const selectedDate = new Date(e.target.value);
    setStartDate(selectedDate);
  };

  const handleEndDate = (e) => {
    const selectedDate = new Date(e.target.value);
    setEndDate(selectedDate);
  };
  return (
    <>
      <div className={Style.containerPadre}>
        <div className={Style.containerHijo}>
          <label> Fecha de Inicio: </label>
          <input
            type="date"
            value={startDate.toISOString().split("T")[0]}
            onChange={handleStartDate}
          />
        </div>
        <div>
          <label> Fecha de fin: </label>
          <input
            type="date"
            value={endDate.toISOString().split("T")[0]}
            onChange={handleEndDate}
          />
        </div>
      </div>
      <div
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default CartComponent;
