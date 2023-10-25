import styles from "./App.module.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SideBar from "./Pages/SideBar/SideBar";
import Product from "./Pages/Product/Product";
import Decoracion from "./Pages/Decoration/Decoration";
import FormDecoracion from "./Pages/FormDecoracion/FormDecoracion";
import LoginForm from "./Pages/LoginForm/LoginForm";
import FormRegistro from "./Pages/FormRegistro/FormRegistro";
import NavBar from "./Pages/NavBar/NavBar";



function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);


  return (
    <>
    <NavBar/>
    <div className={styles.sideBar}>
      <SideBar isOpen={isOpenSideBar} onClick={() => setIsOpenSideBar(!isOpenSideBar)}/>
    </div>

    <button className={styles.toggleSidebarBtn} onClick={() => setIsOpenSideBar(!isOpenSideBar)}> SideBar
      {isOpenSideBar ? "Close" : "Open"}
    </button>

    <div className={styles.contentContainer}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home/decoracion' element={<Decoracion/>} />
        <Route path="/form/decoracion" element={<FormDecoracion/>}/>
        <Route path="/home/product" element={<Product/>} />
        <Route path="/form/login" element={<LoginForm/>}/>
        <Route path="/form/register" element={<FormRegistro/>} />
      </Routes>  
      </div>
    </>
  );
}

export default App;
