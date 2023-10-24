import Home from "./Pages/Home/Home";
import FormDecoracion from "./Pages/Decoracion/Decoracion";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./Pages/Product/Product";


function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/home/decoracion' element={<FormDecoracion/>} />
        <Route path="/home/product" element={<Product/>} />
      </Routes>  
    </>
  );
}

export default App;
