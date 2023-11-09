import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../../AdminDashboard/tableComponent";
import { deleteProduct } from "../../../../Redux/actions";
import React, { useState } from "react";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const [visibleProducts, setVisibleProducts] = useState(true);
  const [visibleCountProducts, setVisibleCountProducts] = useState(10);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      {visibleProducts && (
        <TableComponent
          productos={productos}
          visibleCountProducts={visibleCountProducts}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
}
