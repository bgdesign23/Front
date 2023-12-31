import Footer from "../../views/Home/Footer/Footer.jsx";
import style from "./Home.module.css";
import Seccion1 from "./Seccion1/Seccion1";
import Offer from "./Seccion2/Offer";
import Seccion3 from "./Seccion3/Seccion3";
import Banner from "../Home/bannerDiscount/Banner.jsx";

const Home = () => {
  return (
    <div className={style.home}>
      <Seccion1 />
      <Banner />
      <Offer />
      <Seccion3 />
      <Footer />
    </div>
  );
};

export default Home;
