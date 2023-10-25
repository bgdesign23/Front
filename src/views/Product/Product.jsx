import Styles from "../Product/Product.module.css";
import Card from "../Product/Card";
import Filters from "../../Components/Filters/Filters";

export default function Cards({ productos }) {
  return (
    <>
    <Filters/>
    <div className={Styles.products_container}>
      
      {productos.map( product => (
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
            )
           )}
           
      
    </div>
    </>
  );
}
