import Styles from "../Product/Product.module.css";
import Card from "../Product/Card";
import Filters from "../../Components/Filters/Filters";
import { useState } from "react";

export default function Cards({ productos }) {
  const [paged, setPaged] = useState(10);

  const handlePaged = (event) => {
    setPaged(paged + 10);
  };

  const pagedSection = productos.slice(0, paged);
  return (
    <>
      <Filters />
      {!productos.length ? (
        <div>
          <h1>No se encontraron productos relacionados</h1>
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
              />
            ))}
          </div>
          <button onClick={handlePaged}>Mas Productos</button>
        </>
      )}
    </>
  );
}
