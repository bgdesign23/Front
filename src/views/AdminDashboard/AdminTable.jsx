// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState, useRef } from "react";
// import { editProduct } from "../../Redux/actions";


// export default function AdminProducts() {

  
//   const dispatch = useDispatch();
//   const productos = useSelector((state) => state.products_Copy);
//   const [visibleProducts, setVisibleProducts] = useState(true);
//   const [visibleCountProducts, setVisibleCountProducts] = useState(10);
//   const [updated, setUpdated] = useState(false);
//   const [hot, setHot] = useState(null);

//   const prodRef = useRef({
//     name: "",
//     stock: "",
//     price: "",
//     type: "",
//     material: "",
//     description: "",
//   });

//   useEffect(() => {
//     dispatch(getProductsAction());
//   }, [dispatch]);

//   const handleEditProduct = async (event, productId) => {
//     event.preventDefault();

//     try {
//       const { data } = await dispatch(editProduct(productId, prodRef));
//       console.log("Prueba1");

//       dispatch(clearErrors());
//       console.log("Entra al handlerEdit?");
//       //Swal.fire("Listo", "Has modificado un producto exitosamente");
//       console.log("Prueba 2");

//       dispatch(getProductsAction());
//       console.log("Prueba 3");

//       prodRef.current = {
//         name: "",
//         stock: "",
//         price: "",
//         type: "",
//         material: "",
//         description: "",
//       };
//     } catch (error) {
//       dispatch(
//         setErrors({ type: "EDIT_PRODUCTS", error: error?.response?.data })
//       );
//     }
//   };

//   const handleRestoreProduct = (event, id) => {
//     event.preventDefault();
//     dispatch(restoreProduct(id)).then(() => {
//       dispatch(getProductsAction());
//       dispatch(getProductsAction(deleted));
//     });
//     setUpdated(!updated);
//   };

//   const handleDeleteProduct = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

//   return (
//     <div>
//       {visibleProducts && (
//         <TableComponent
//           productos={productos}
//           prodRef={prodRef}
//           visibleCountProducts={visibleCountProducts}
//           handleDeleteProduct={handleDeleteProduct}
//           handleEditProduct={handleEditProduct}
//         />
//       )}
//     </div>
//   );
// }
