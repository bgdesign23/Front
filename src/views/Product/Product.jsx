/* eslint-disable react/prop-types */
import Styles from "./Product.module.css";
import Card from "../Product/Card";
import Filters from "../../Components/Filters/Filters";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cards( {productos} ) {
  const [paged, setPaged] = useState(10);

  const handlePaged = () => {
    setPaged(paged + 10);
  };


  const pagedSection = productos.slice(0, paged);
  return (
    <div className={Styles.contenCard}>
      <>
        <Filters />
        {!productos.length ? (
          <div>
            <h1 className={Styles.h1}>No se encontraron productos relacionados</h1>
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
                  category={product.CategoryId}
                  amount={product.amount} //cantidad
                />
              ))}
            </div>
            <button onClick={handlePaged}>Más Productos</button>
          </>
        )}
      </>
    </div>
  );
}
