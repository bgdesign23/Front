import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsAction } from "../../../Redux/actions";
import Style from "./Offer.module.css";

import CardOffer from "./CardOffer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Offer() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  const productsInOffer = allProducts.filter((product) => product.offer);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <section className={Style.offerSection}>
      <div className={Style.offer}>
        <h1>Productos en oferta</h1>
        <div className={Style.container}>
          <Slider {...sliderSettings}>
            {productsInOffer.map((product) => (
              <div key={product.id} className={Style.cardOferta}>
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
      </div>
    </section>
  );
}

export default Offer;
