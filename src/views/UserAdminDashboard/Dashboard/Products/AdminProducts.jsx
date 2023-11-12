import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import TableComponent from "../../../AdminDashboard/tableComponent";
import { 
  deleteProduct, 
  editProduct, 
  restoreProduct,
  getProductsAction, 
} from "../../../../Redux/actions";
import Swal from "sweetalert2";


export default function AdminProducts() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products_Copy);
  const [visibleProducts, setVisibleProducts] = useState(true);
  const [visibleCountProducts, setVisibleCountProducts] = useState(10);
  const [updated, setUpdated] = useState(false);
  const [hot, setHot] = useState(null);

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  const prodRef = useRef({
    name: "",
    stock: "",
    price: "",
    type: "",
    material: "",
    description: "",
  });

  // const [prod, setProd] = useState({
  //   name: "",
  //   stock: "",
  //   price: "",
  //   type: "",
  //   material: "",
  //   description: "",
  // });

  const handleEditProduct = async (event, productId) => {
    event.preventDefault();
    
    try {
      console.log("prod", prodRef.current);
      const updatedProductData = {
        name: prodRef.current.name,
        stock: prodRef.current.stock,
        price: prodRef.current.price,
        type: prodRef.current.type,
        material: prodRef.current.material,
        description: prodRef.current.description,
      };
  
      const { data } = await dispatch(editProduct(productId, updatedProductData));
  
      dispatch(clearErrors());
      Swal.fire("Listo", "Has modificado un producto exitosamente");
  
      // Actualizar el estado local de productos después de la edición
      const editedProducts = productos.map((product) =>
        product.id === productId ? { ...product, ...updatedProductData } : product
      );
  
      dispatch(setProd(editedProducts));
  
      // Obtener productos actualizados después de la edición
      dispatch(getProductsAction());
  
      // Limpiar los campos después de la edición
      setProd({
        name: "",
        stock: "",
        price: "",
        type: "",
        material: "",
        description: "",
      });
    } catch (error) {
      dispatch(
        setErrors({ type: "EDIT_PRODUCTS", error: error?.response?.data })
      );
    }
  };

  const handleRestoreProduct = (event, id) => {
    event.preventDefault();
    dispatch(restoreProduct(id)).then(() => {
      dispatch(getProductsAction());
      dispatch(getProductsAction(deleted));
    });
    setUpdated(!updated);
  }

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };
  // const handleEditProduct = (productId) => {
  //   dispatch(editProduct(productId));
  // }

  return (
    <div>
      {visibleProducts && (
        <TableComponent
          productos={productos}
          visibleCountProducts={visibleCountProducts}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
          // handleRestoreProduct={handleRestoreProduct}
        />
      )}
    </div>
  );
}
