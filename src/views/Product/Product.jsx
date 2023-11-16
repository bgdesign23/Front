import Styles from "./Product.module.css";
import Card from "../Product/Card";
import Filters from "../../Components/Filters/Filters";
import { useEffect, useState } from "react";
import loader from "../../images/loader.gif";
import { getProductsAction } from "../../Redux/actions";
import { useDispatch } from "react-redux";

export default function Cards({ productos }) {
  const dispatch = useDispatch();
  const [paged, setPaged] = useState(12);

  const handlePaged = () => {
    setPaged(paged + 12);
  };

  useEffect(() => {
    if (productos.length === 0) {
      setTimeout(() => {
        dispatch(getProductsAction());
      }, 2000);
    }
  }, [productos]);

  const pagedSection = productos.slice(0, paged);
  return (
    <div className={Styles.contenCard}>
      <>
        <Filters />
        {!productos.length ? (
          <div className={Styles.containLoader}>
            <img className={Styles.loader} src={loader} alt="loader" />
            <h1 className={Styles.h1}>
              No se encontraron productos relacionados
            </h1>
          </div>
        ) : (
          <>
            <div className={Styles.products_container}>
              {pagedSection.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  types={product.type}
                  stock={product.stock}
                  price={product.price}
                  image={product.image}
                  comments={product.comments}
                  category={product.CategoryId}
                  amount={product.amount}
                  rating={product.rating}
                  material={product.material}
                  color={product.color}
                />
              ))}
            </div>
            {productos.length > paged && (
              <button onClick={handlePaged} className={Styles.buttonPrimary}>
                Más Productos
              </button>
            )}
          </>
        )}
      </>
    </div>
  );
}
