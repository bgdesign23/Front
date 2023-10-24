import styles from "./App.module.css";
import Home from "./Pages/Home/Home";
import FormDecoracion from "./Pages/Decoration/Decoration";
import SideBar from "./Pages/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);


  return (
    <>
    <div className={styles.sideBar}>
      <SideBar isOpen={isOpenSideBar} onClick={() => setIsOpenSideBar(!isOpenSideBar)}/>
    </div>

    <button className={styles.toggleSidebarBtn} onClick={() => setIsOpenSideBar(!isOpenSideBar)}> SideBar
      {isOpenSideBar ? "Close" : "Open"}
    </button>

    <div className={styles.contentContainer}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home/decoracion' element={<FormDecoracion/>} />
      </Routes>  
      </div>
    </>
  );
}

export default App;
