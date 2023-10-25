import {useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import style from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();


  return (
    <div className={style.home}>
      <h1>Este es el Home</h1>

      <button onClick={() => navigate("/home/product")}> MUEBLES </button>

      <button onClick={() => navigate("/home/decoracion")}> DECORACIÓN </button>
      
      
      <Footer />
    </div>
  );
};

export default Home;
