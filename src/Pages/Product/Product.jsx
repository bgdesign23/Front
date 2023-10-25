import Styles from "../Product/Product.module.css";
import Card from "../Product/Card";

export default function Cards({ productos }) {
  return (
    <div className={Styles.products_container}>
      {productos.length
        ? productos.map(
            ({
              id,
              name,
              price,
              description,
              type,
              material,
              stock,
              image,
              color,
              offer,
              CategoryId,
            }) => (
              <Card
                key={id}
                id={id}
                name={name}
                description={description}
                types={type}
                stock={stock}
                price={price}
                image={image}
                category={CategoryId}
              />
            )
          )
        : null}
    </div>
  );
}
