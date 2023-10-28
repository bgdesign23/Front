import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsAction } from '../../Redux/actions';
import Style from "../Offer/Offer.module.css"

import CardOffer from './CardOffer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Offer() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  
  const productsInOffer = allProducts.filter((product) => product.oferr);
  console.log(productsInOffer);

  const sliderSettings = {
    dots: true, // Muestra los puntos indicadores
    infinite: true, // Bucle infinito
    speed: 500, // Velocidad de transición en milisegundos
    slidesToShow: 5, // Número de productos a mostrar en cada slide
    slidesToScroll: 1, // Número de productos para avanzar al navegar
  };

  return (
    <div className={Style.offer}>
      <h1>Productos en oferta </h1>
      <Slider {...sliderSettings}>
        {productsInOffer.map((product) => (
          <div key={product.id}>
            <CardOffer
              id={product.id}
              name={product.name}
              description={product.description}
              types={product.type}
              stock={product.stock}
              price={product.price}
              image={product.image}
              category={product.CategoryId}
            />
          </div>
        ))}
      </Slider>
      
    </div>
  );

}

export default Offer;
