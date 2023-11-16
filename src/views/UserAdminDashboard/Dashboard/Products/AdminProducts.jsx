import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import TableComponent from "../../../AdminDashboard/tableComponent";
import EliminatedProductsTable from "../../../AdminDashboard/Eliminados/tableeliminated";
import Styles from "../Products/products.module.css";
import {
  deleteProduct,
  editProduct,
  restoreProduct,
  getProductsAction,
  productEliminated,
} from "../../../../Redux/actions";
// import Swal from "sweetalert2";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const [visibleProducts, setVisibleProducts] = useState(true);
  const [visibleCountProducts, setVisibleCountProducts] = useState(10);
  const productsEliminated = useSelector((state) => state.productsEliminated);
  const [updated, setUpdated] = useState(false);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditProduct = (event, productId, prodRef, rowData) => {
    event.preventDefault();
    console.log("Producto Id: ", productId);
    console.log("prod Ref: ", prodRef);
    console.log("rowData: ", rowData);
    try {
      const updatedData = {
        name: rowData.name,
        description: rowData.description,
        type: rowData.type,
        material: rowData.material,
        price: rowData.price,
        stock: rowData.stock,
      };
      console.log("Data: ", updatedData);
      dispatch(editProduct(productId, updatedData)).then(() => {
        dispatch(clearErrors());
        console.log("A ver si llega hasta aquí");
        Swal.fire("Listo", "Has modificado un producto exitosamente");
      });
      // Limpiar los campos después de la edición
      setProdRef({
        name: "",
        stock: "",
        price: "",
        type: "",
        material: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al editar el producto: ", error);
    }
  };

  const [prodRef, setProdRef] = useState({
    name: "",
    stock: "",
    price: "",
    type: "",
    material: "",
    description: "",
  });

  const handleRestoreProduct = async (productId) => {
    try {
      await dispatch(restoreProduct(productId));
      await dispatch(productEliminated());
      await dispatch(getProductsAction());
      setUpdated(!updated);
    } catch (error) {
      console.error("Error al restaurar el producto:", error);
    }
  };

  useEffect(() => {
    dispatch(productEliminated());
  }, [dispatch, updated]);

  return (
    <div className={Styles.containerPadre}>
      <div className={Styles.containerAlinea}>
        <div className={Styles.containerHijo}>
          <h6>Gestión inventario de productos</h6>
          <div className={Styles.containerTable}>
            {visibleProducts && (
              <TableComponent
                productos={productos}
                visibleCountProducts={visibleCountProducts}
                handleDeleteProduct={handleDeleteProduct}
                handleEditProduct={handleEditProduct}
              />
            )}
          </div>
        </div>
        {productsEliminated.length > 0 ? (
          <div className={Styles.containerHijo2}>
            <h6>Tabla de productos eliminados</h6>
            <div className={Styles.containerTable2}>
              {visibleProducts && (
                <EliminatedProductsTable
                  isVisible={visibleProducts}
                  productsEliminated={productsEliminated}
                  handleRestoreProduct={handleRestoreProduct}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
