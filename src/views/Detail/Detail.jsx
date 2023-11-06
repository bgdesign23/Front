import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../../Redux/actions";
import styles from "../Detail/Detail.module.css";
import { useLocalStorage } from "../../localStorage/localStorage";
import toast, { Toaster } from "react-hot-toast";
import logoWhatsapp from "../Detail/whatsapp (1).png";
import Swal from "sweetalert2";

const Detail = () => {
  const [thing, setThing] = useLocalStorage("cart", []); //localStorage hook
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const copy = useSelector((state) => state.products_Copy);
  const detailProduct = useSelector((state) => state.products_Details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const colores = [...new Set(copy.map((prod) => prod.color))];
  const materiales = [...new Set(copy.map((mat) => mat.material))];

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  //monta el producto
  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(cleanDetail());
  }, []);

  const back = () => {
    window.history.back();
  };

  // console.log(thing);

  /* const handle_addToCart = () => {
    if (user || localStorage.getItem("token")) return addToCart();
    else
      Swal.fire({
        title: "Usuario no registrado",
        text: "Inicia sesión para agregar productos al carrito",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Iniciar sesión",
        denyButtonText: "Cancelar",
        confirmButtonColor: "#394754",
        denyButtonColor: "#394754",
        background: "#3b3838",
        color: "#ffffff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/form/login");
        }
      });
  }; */

  const addToCart = () => {
    const existingProduct = thing.findIndex(
      (product) => product.id === detailProduct.id
    );

    if (existingProduct !== -1) {
      thing[existingProduct].color = selectedColor;
      thing[existingProduct].material = selectedMaterial;
      thing[existingProduct].amount += 1;
      setThing([...thing]);
    } else {
      const updatedProduct = {
        ...detailProduct,
        color: selectedColor,
        material: selectedMaterial,
        amount: 1,
      };
      thing.push(updatedProduct);
    }
    setThing([...thing]);

    toast.success("se agrego al carrito de compras");
    console.log("Productos: ", thing);
  };

  return (
    <div className={styles.todo}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={detailProduct?.image}
            alt={detailProduct?.name}
          />
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.name}>{detailProduct?.name}</h1>
          <h2 className={styles.description} style={{ textAlign: "left" }}>
            {detailProduct?.description}
          </h2>
          <div className={styles.filas}>
            <h3 className={styles.type}>Ambiente: {detailProduct?.type}</h3>
            <h3>Color: {detailProduct?.color}</h3>
            <h3>Material: {detailProduct?.material}</h3>

            {/* <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
            <option className={styles.filas} value="">Color</option> 
              {colores.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
            <option className={styles.filas} value="">Material</option> 
              {materiales.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select> */}

            <h6 className={styles.stock}>{detailProduct?.stock}</h6>
          </div>
          <h4 className={styles.price}>${detailProduct?.price},00</h4>
          <div className={styles.actions}>
            <button onClick={addToCart} className={styles.button}>
              Agregar al Carrito
            </button>
            <a
              href={`https://wa.me/2477516585/?text=Hola,%20quisiera%20tener%20más%20información%20sobre%20el%20producto`}
              target="_blank"
              className={styles.whatsappLink} rel="noreferrer"
            >
              <img src={logoWhatsapp} alt="" style={{ width: "66px" }} />
            </a>
          </div>
        </div>
        <Toaster
          position="buttom-right"
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#191919",
              background: "#ffff",
            },
          }}
        />
      </div>
      <button className={styles.backButton} onClick={back}>
        Back
      </button>
    </div>
  );
};

export default Detail;
