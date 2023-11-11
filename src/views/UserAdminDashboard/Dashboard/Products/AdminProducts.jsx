import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../../AdminDashboard/tableComponent";
import { deleteProduct } from "../../../../Redux/actions";
import React, { useState } from "react";
import Styles from "../Products/products.module.css";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const [visibleProducts, setVisibleProducts] = useState(true);
  const [visibleCountProducts, setVisibleCountProducts] = useState(10);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className={Styles.containerPadre}>
      <div className={Styles.containerHijo}>
        <h6>Gestión inventario de productos</h6>
        <div className={Styles.containerTable}>
          {visibleProducts && (
            <TableComponent
              productos={productos}
              visibleCountProducts={visibleCountProducts}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}
