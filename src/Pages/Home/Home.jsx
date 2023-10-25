
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import style from "../Home/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "../Product/Product";
import { getProductsAction } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!productos.length) {
          await dispatch(getProductsAction());
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.home}>
      <h1>Este es el Home</h1>

      <button onClick={() => navigate("/home/product")}> MUEBLES </button>

      <button onClick={() => navigate("/home/decoracion")}> DECORACIÓN </button>

      <Product productos={productos} />
      <Footer />
    </div>
  );
};

export default Home;
