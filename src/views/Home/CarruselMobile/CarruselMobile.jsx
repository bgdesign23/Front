import Slider from "react-slick";
import style from "./CarruselMobile.module.css";
import imagen1 from "../../../images/repisa2.jpg";
import imagen2 from "../../../images/imagemobile2.jfif";
import imagen3 from "../../../images/repisa1.jpg";
import "slick-carousel/slick/slick.css"; // Importa los estilos de slick
import "slick-carousel/slick/slick-theme.css"; // Importa los estilos del tema de slick

const CarruselMobile = () => {
  const images = [imagen1, imagen2, imagen3];

  const sliderSettings = {
    dots: true,
    inifinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={style.carruselMobile}>
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarruselMobile;
