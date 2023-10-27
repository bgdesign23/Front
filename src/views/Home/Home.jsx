import {useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import style from "./Home.module.css";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY < 100){
        setShowFooter(false)
        console.log("El footer debería mostrarse");
      } else {
        setShowFooter(true)
        console.log("El footer debería mostrarse");
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <div className={style.home}>
      <h1>Este es el Home</h1>

      <button onClick={() => navigate("/home/product")}> MUEBLES </button>

      <button onClick={() => navigate("/home/decoracion")}> DECORACIÓN </button>

      <button onClick={() => navigate("/home/nuevo")} > NUEVO MUEBLE</button>

     { showFooter && <Footer/>}
    </div>
  );
};

export default Home;
