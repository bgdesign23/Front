import { getCarts } from "../../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from 'react-chartjs-2'
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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

const CartComponent = ( { chartData } ) => {

    const carts = useSelector((state) => state.carts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])
    
    //Elementos con estado success
    const successCarts = carts.filter(cart => cart.status === "success")

    //Crear un objeto para almacenar las compras por días:
    const comprasDiarias = {}

    successCarts.forEach(cart => {
        const fechaCompra = new Date(cart.createdAt).toLocaleDateString();
        comprasDiarias[fechaCompra] = (comprasDiarias[fechaCompra] || 0) + 1;
    })

    const labels = Object.keys(comprasDiarias)
    const datos = Object.values(comprasDiarias)
    
    const data = {
        labels: labels,
        datasets: [
            {
            label: "Compras por día",
            data: datos,
            fill: false,
            tension: 0.1
            }
        ]
    }

    const options = {
        scales: {
          x: {
            type: 'category', 
          },
          y: {
            beginAtZero: true,            
          }
        },
      };

    return (
        <div> 
            <Line data = {data} options={options}/>
        </div>
          
    )
    
}

export default CartComponent